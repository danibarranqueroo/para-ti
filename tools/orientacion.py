#!/usr/bin/env python3
"""Lee la etiqueta de orientación EXIF de un JPEG y dice cuánto hay que girarlo.

Las fotos del iPhone se guardan con los píxeles como salieron del sensor más
una etiqueta que dice "gírame". Al borrar los metadatos (por la ubicación GPS)
esa etiqueta desaparece y la foto se queda tumbada: por eso hay que rotar los
píxeles antes de limpiar.

Imprime los grados a rotar (0, 90, 180 o 270) y si hay que espejar.
"""
import struct, sys

def orientacion(ruta):
    with open(ruta, "rb") as f:
        d = f.read(256 * 1024)
    if d[:2] != b"\xff\xd8":
        return 1
    i = 2
    while i < len(d) - 4:
        if d[i] != 0xFF:
            break
        marcador = d[i + 1]
        if marcador == 0xDA:
            break
        longitud = int.from_bytes(d[i + 2:i + 4], "big")
        if marcador == 0xE1 and d[i + 4:i + 10] == b"Exif\x00\x00":
            tiff = i + 10
            orden = d[tiff:tiff + 2]
            if orden not in (b"II", b"MM"):
                return 1
            e = "<" if orden == b"II" else ">"
            off = struct.unpack(e + "I", d[tiff + 4:tiff + 8])[0]
            ifd = tiff + off
            n = struct.unpack(e + "H", d[ifd:ifd + 2])[0]
            for k in range(n):
                ent = ifd + 2 + k * 12
                tag = struct.unpack(e + "H", d[ent:ent + 2])[0]
                if tag == 0x0112:                       # Orientation
                    return struct.unpack(e + "H", d[ent + 8:ent + 10])[0]
            return 1
        i += 2 + longitud
    return 1

# Qué hacer con cada valor de la etiqueta
GIRO = {1: (0, False), 2: (0, True), 3: (180, False), 4: (180, True),
        5: (90, True), 6: (90, False), 7: (270, True), 8: (270, False)}

if __name__ == "__main__":
    o = orientacion(sys.argv[1])
    grados, espejo = GIRO.get(o, (0, False))
    print(f"{grados} {1 if espejo else 0}")
