#!/bin/bash
# =============================================================================
#  Abre la web en WebKit (el motor de Safari) y comprueba cosas que solo se
#  ven ejecutándola de verdad: que nada oculto ocupe sitio, y que los botones
#  que ella tiene que tocar reciban el toque.
#
#  USO:  bash tools/comprobar.sh
# =============================================================================
set -euo pipefail
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$RAIZ"
JS=$(tr '\n' ' ' < tools/comprobar.js)
swift tools/capturar.swift index.html /tmp/comprobar-descarte.png 390 844 1.5 "$JS" 0.3 2>&1 \
  | grep -v "warning:\|Deprecated\|capturado" \
  | sed 's/^JS → //'
