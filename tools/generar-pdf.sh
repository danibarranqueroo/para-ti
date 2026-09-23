#!/bin/bash
# =============================================================================
#  Genera el PDF para la papelería a partir de imprimir.html
#
#  USO:  bash tools/generar-pdf.sh
#
#  La hoja es un A4 exacto (595,28 × 841,89 puntos) con las tres piezas en
#  cuartos de 105 × 148,5 mm. El 0,75 del CSS convierte los píxeles del
#  navegador (96 ppp) a puntos de PDF (72 ppp): sin eso la hoja saldría de
#  280 × 396 mm en vez de A4.
# =============================================================================
set -euo pipefail
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$RAIZ"
swift tools/pdf.swift imprimir.html regalos-para-imprimir.pdf 595.276 841.89 3.0 2>&1 \
  | grep -v "warning:\|Deprecated"
python3 - <<'PY'
import re, pathlib
d = pathlib.Path("regalos-para-imprimir.pdf").read_bytes()
v = [float(n) for n in re.findall(rb'/MediaBox\s*\[([^\]]*)\]', d)[0].split()]
w, h = v[2]-v[0], v[3]-v[1]
ok = abs(w/72*25.4 - 210) < 1 and abs(h/72*25.4 - 297) < 1
print("  página: %.0f x %.0f pt = %.0f x %.0f mm  %s" %
      (w, h, w/72*25.4, h/72*25.4, "· A4 correcto" if ok else "· ¡NO es A4!"))
print("  tipografías incrustadas:", len(re.findall(rb'/FontFile\d?', d)))
PY
