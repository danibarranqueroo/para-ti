#!/bin/bash
# =============================================================================
#  Prepara las fotos del iPhone para la web.
#
#  USO:
#    1. Copia las fotos (tal cual, en HEIC, JPG, PNG...) a  img/originales/
#    2. Ejecuta:   bash tools/optimizar-fotos.sh
#    3. Te dirá cómo se llama cada una para que la pongas en js/content.js
#
#  Qué hace con cada foto:
#    · convierte de HEIC a JPG  (los HEIC NO se ven en la web)
#    · la reduce a 1500 px como máximo (suficiente para cualquier iPhone)
#    · la comprime al 72% de calidad (se ve igual y pesa 4 veces menos)
#    · le borra la ubicación GPS y demás metadatos
#
#  Opción:  bash tools/optimizar-fotos.sh -n   → las numera 01.jpg, 02.jpg, ...
# =============================================================================

set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORIGEN="$RAIZ/img/originales"
DESTINO="$RAIZ/img"
LADO_MAX=1500
CALIDAD=72

NUMERAR=false
[[ "${1:-}" == "-n" ]] && NUMERAR=true

if [[ ! -d "$ORIGEN" ]]; then
  echo "No existe la carpeta $ORIGEN"
  exit 1
fi

shopt -s nullglob nocaseglob
FOTOS=("$ORIGEN"/*.{heic,heif,jpg,jpeg,png,tif,tiff,webp})
shopt -u nocaseglob

if [[ ${#FOTOS[@]} -eq 0 ]]; then
  echo "No hay fotos en img/originales/"
  echo "Copia ahí las fotos y vuelve a ejecutar esto."
  exit 0
fi

echo ""
echo "Procesando ${#FOTOS[@]} fotos..."
echo ""

GENERADAS=()
INDICE=0

for foto in "${FOTOS[@]}"; do
  INDICE=$((INDICE + 1))

  if $NUMERAR; then
    nombre=$(printf "%02d" "$INDICE")
  else
    base=$(basename "$foto")
    nombre="${base%.*}"
    # minúsculas, espacios y caracteres raros fuera
    nombre=$(echo "$nombre" | tr '[:upper:]' '[:lower:]' | tr ' _' '-' | tr -cd 'a-z0-9-')
    [[ -z "$nombre" ]] && nombre=$(printf "foto-%02d" "$INDICE")
  fi

  salida="$DESTINO/$nombre.jpg"

  sips --setProperty format jpeg \
       --setProperty formatOptions "$CALIDAD" \
       --resampleHeightWidthMax "$LADO_MAX" \
       "$foto" --out "$salida" >/dev/null 2>&1

  # Las fotos del iPhone guardan los píxeles como salieron del sensor más una
  # etiqueta que dice "gírame". Como luego borramos los metadatos (por el GPS),
  # hay que rotar los píxeles de verdad ANTES o la foto se queda tumbada.
  read -r GRADOS ESPEJO <<< "$(python3 "$RAIZ/tools/orientacion.py" "$salida")"
  [[ "$GRADOS" != "0" ]] && sips --rotate "$GRADOS" "$salida" >/dev/null 2>&1
  [[ "$ESPEJO" == "1" ]] && sips --flip horizontal "$salida" >/dev/null 2>&1

  python3 "$RAIZ/tools/limpiar-exif.py" "$salida"

  medidas=$(sips -g pixelWidth -g pixelHeight "$salida" 2>/dev/null \
            | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w"x"h}')
  peso=$(du -h "$salida" | cut -f1 | tr -d ' ')

  printf "  ✓ %-28s %-11s %s\n" "img/$nombre.jpg" "$medidas" "$peso"
  GENERADAS+=("img/$nombre.jpg")
done

echo ""
echo "─────────────────────────────────────────────"
echo "Listo. Para usarlas, en js/content.js pon:"
echo ""
for g in "${GENERADAS[@]}"; do
  echo "    src: \"$g\","
done
echo ""
echo "Y para la portada, la que más te guste:"
echo "    fondo: \"${GENERADAS[0]}\""
echo "─────────────────────────────────────────────"
echo ""
