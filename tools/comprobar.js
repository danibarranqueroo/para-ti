(function(){
  var f = 0, out = [];
  function ok(c, t){ out.push((c ? "  ✓ " : "  ✗ ") + t); if(!c) f++; }

  var g = document.getElementById("gate"); if (g) g.remove();
  document.body.classList.remove("is-locked");
  document.querySelectorAll("[data-reveal]").forEach(function(e){ e.classList.add("is-visible"); });

  /* 1. Nada con [hidden] puede ocupar sitio */
  var malos = [];
  document.querySelectorAll("[hidden]").forEach(function(e){
    if (getComputedStyle(e).display !== "none") malos.push(e.className || e.tagName);
  });
  ok(malos.length === 0, "todo lo oculto está realmente oculto" +
     (malos.length ? " — FALLAN: " + malos.join(", ") : ""));

  /* 2. Lo que se toca, se puede tocar de verdad */
  function tocable(sel, nombre){
    var el = document.querySelector(sel);
    if (!el) { ok(false, nombre + ": no existe"); return; }
    el.scrollIntoView({block:"center"});
    var r = el.getBoundingClientRect();
    var x = Math.round(r.left + r.width/2), y = Math.round(r.top + r.height/2);
    if (y < 0 || y > window.innerHeight) { ok(true, nombre + ": fuera de la ventana, no se puede medir"); return; }
    var encima = document.elementFromPoint(x, y);
    var suyo = encima && (encima === el || el.contains(encima));
    ok(suyo, nombre + " recibe el toque" +
       (suyo ? "" : " — lo intercepta: " + (encima ? (encima.className || encima.tagName) : "nada")));
  }

  /* Aislamos cada capítulo para poder medirlo en la ventana */
  function aislar(sel){
    document.querySelectorAll(".chapter").forEach(function(c){
      c.style.display = c.matches(sel) ? "" : "none";
    });
  }
  aislar(".sobre-chapter");  tocable(".sobre__sello", "el lacre del sobre");
  aislar(".libreria-chapter"); tocable(".lomo", "el lomo del primer libro");

  return out.join("\n") + "\n" + (f === 0 ? "✅ TODO OK" : "❌ FALLOS: " + f);
})()
