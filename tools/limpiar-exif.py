#!/usr/bin/env python3
"""Quita los metadatos (APPn: EXIF, GPS, miniatura, perfiles) de un JPEG.

Las fotos del iPhone llevan dentro la ubicación exacta donde se hicieron.
Como el repositorio es público, se borran antes de publicar.
Conserva intactos los datos de imagen; solo elimina los segmentos APP1-APP15.
"""
import sys

def limpiar(ruta):
    with open(ruta, "rb") as f:
        datos = f.read()

    if datos[:2] != b"\xff\xd8":          # no es un JPEG: se deja como está
        return False

    salida = bytearray(b"\xff\xd8")
    i = 2
    quitados = 0

    while i < len(datos) - 1:
        if datos[i] != 0xFF:
            break
        marcador = datos[i + 1]

        # Inicio del escaneo: a partir de aquí es imagen pura, se copia entera
        if marcador == 0xDA:
            salida += datos[i:]
            break

        if marcador in (0xD8, 0x01) or 0xD0 <= marcador <= 0xD7:
            salida += datos[i:i + 2]
            i += 2
            continue

        if i + 4 > len(datos):
            break
        longitud = int.from_bytes(datos[i + 2:i + 4], "big")
        segmento = datos[i:i + 2 + longitud]

        if 0xE1 <= marcador <= 0xEF:       # APP1..APP15 -> fuera
            quitados += len(segmento)
        else:
            salida += segmento

        i += 2 + longitud

    with open(ruta, "wb") as f:
        f.write(salida)
    return quitados


if __name__ == "__main__":
    total = 0
    for ruta in sys.argv[1:]:
        try:
            n = limpiar(ruta)
            if n:
                total += n
        except Exception as e:
            print(f"  aviso: no se pudo limpiar {ruta}: {e}", file=sys.stderr)
    if total:
        print(f"  metadatos eliminados: {total} bytes" if total < 1024 else f"  metadatos eliminados: {total // 1024} KB")
