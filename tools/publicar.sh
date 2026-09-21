#!/bin/bash
# =============================================================================
#  Publica los cambios en la web.
#
#  USO:   bash tools/publicar.sh "lo que has cambiado"
#
#  Antes de subir, le pone una marca de versión al CSS y al JavaScript
#  (?v=a1b2c3d4). Sin esto, GitHub Pages le dice al navegador que se guarde
#  los archivos 10 minutos, y los cambios tardan en verse.
#  La marca se calcula del contenido: si no cambia nada, no cambia la marca.
# =============================================================================

set -euo pipefail
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$RAIZ"

MENSAJE="${1:-actualizo la web}"

# Marca calculada a partir del contenido real de los archivos
HASH=$(cat css/styles.css js/content.js js/main.js | shasum | cut -c1-8)

python3 - "$HASH" <<'PY'
import re, sys, pathlib
h = sys.argv[1]
p = pathlib.Path("index.html")
s = p.read_text()
for archivo in ["css/styles.css", "js/content.js", "js/main.js"]:
    s = re.sub(re.escape(archivo) + r'(\?v=[a-f0-9]+)?', f"{archivo}?v={h}", s)
p.write_text(s)
print(f"  versión estampada: {h}")
PY

if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "  no hay nada que subir"
  exit 0
fi

git add -A
git commit -q -m "$MENSAJE"
git push -q origin main

echo "  subido. En menos de un minuto está en:"
echo "  https://danibarranqueroo.github.io/para-ti/"
