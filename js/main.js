/* =========================================================================
   Motor de la web. Normalmente no hace falta tocar nada de aquí:
   todo el contenido vive en js/content.js
   ========================================================================= */
(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Versión ----------
     GitHub Pages pide al navegador que se guarde los archivos 10 minutos.
     Para que un cambio se vea al instante, tools/publicar.sh le pone una
     marca a cada archivo (?v=abc1234). Aquí la leemos de nuestra propia
     etiqueta <script> y se la ponemos también a fotos y música, para que
     nunca se quede nada viejo. */
  var VER = (function () {
    var sc = document.querySelector('script[src*="main.js"]');
    var m = sc && sc.src.match(/[?&]v=([^&]+)/);
    return m ? m[1] : "";
  })();

  function conVersion(src) {
    if (!VER || !src || /^(https?:)?\/\//.test(src)) return src;
    return src + (src.indexOf("?") < 0 ? "?" : "&") + "v=" + VER;
  }

  /* ---------- Utilidades ---------- */

  // Escapa HTML y convierte los saltos de línea en <br>
  function txt(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/\n/g, "<br>");
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // Marca de foto: si el archivo aún no existe, deja un hueco elegante
  // en vez del icono roto del navegador.
  function photoFrame(src, aspect, estilo) {
    var frame = el(
      '<div class="photo__frame' + (estilo ? " photo__frame--" + txt(estilo) : "") +
      '" data-label="foto pendiente">' +
        '<img src="' + txt(conVersion(src)) + '" alt="" loading="lazy" decoding="async">' +
      "</div>"
    );
    var img = frame.querySelector("img");
    img.addEventListener("error", function () {
      frame.classList.add("is-placeholder");
    });
    // Reserva el espacio hasta conocer las medidas reales: evita que el
    // texto pegue saltos cuando la foto termina de cargar.
    if (aspect) frame.style.aspectRatio = aspect;
    img.addEventListener("load", function () {
      frame.style.aspectRatio = "";
    });
    return frame;
  }

  // Una foto dentro de un capítulo de texto o de lista
  function fotoDentro(c) {
    if (!c.foto) return null;
    var fig = el('<figure class="photo photo--dentro" data-reveal></figure>');
    fig.appendChild(photoFrame(c.foto, "4 / 5", c.estilo));
    if (c.pieFoto) fig.appendChild(el('<figcaption class="photo__caption">' + txt(c.pieFoto) + "</figcaption>"));
    return fig;
  }

  function section(cls) {
    return el('<section class="chapter ' + cls + '"><div class="chapter__inner"></div></section>');
  }

  /* ---------- Constructores de cada tipo de bloque ---------- */

  var BLOQUES = {

    portada: function (c) {
      var s = section("cover");
      s.querySelector(".chapter__inner").className = "chapter__inner cover__inner";
      var inner = s.querySelector(".cover__inner");

      if (c.fondo) {
        var bg = el('<div class="cover__bg"></div>');
        // Solo la ponemos si la imagen existe de verdad
        var probe = new Image();
        probe.onload = function () { bg.style.backgroundImage = 'url("' + conVersion(c.fondo) + '")'; };
        probe.src = conVersion(c.fondo);
        s.insertBefore(bg, s.firstChild);
      }

      if (c.kicker)    inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      inner.appendChild(el('<h1 class="title" data-reveal>' + txt(c.titulo) + "</h1>"));
      if (c.subtitulo) inner.appendChild(el('<p class="body" style="max-width:30ch;margin-inline:auto" data-reveal>' + txt(c.subtitulo) + "</p>"));

      var hint = el(
        '<div class="cover__hint" id="coverHint" data-reveal>' +
          txt(c.hint || "desliza") +
          '<span class="cover__arrow"></span>' +
        "</div>"
      );
      inner.appendChild(hint);
      return s;
    },

    texto: function (c) {
      var s = section("text");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      (c.cuerpo || []).forEach(function (p) {
        inner.appendChild(el('<p class="body" data-reveal>' + txt(p) + "</p>"));
      });
      var f = fotoDentro(c);
      if (f) inner.appendChild(f);
      return s;
    },

    foto: function (c) {
      var s = section("photo-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      var fig = el('<figure class="photo" data-reveal></figure>');
      fig.appendChild(photoFrame(c.src, "4 / 5", c.estilo));
      if (c.pie) fig.appendChild(el('<figcaption class="photo__caption">' + txt(c.pie) + "</figcaption>"));
      inner.appendChild(fig);
      return s;
    },

    fotos: function (c) {
      var s = section("photos-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      var grid = el('<div class="mosaic"></div>');
      (c.fotos || []).forEach(function (src) {
        var wrap = el('<div data-reveal></div>');
        wrap.appendChild(photoFrame(src, "1 / 1", c.estilo));
        grid.appendChild(wrap);
      });
      if (c.pie) grid.appendChild(el('<p class="photo__caption mosaic__caption" data-reveal>' + txt(c.pie) + "</p>"));
      inner.appendChild(grid);
      return s;
    },

    cita: function (c) {
      var s = section("quote");
      var inner = s.querySelector(".chapter__inner");
      if (c.inicial) {
        inner.appendChild(el('<p class="inicial" data-reveal>' + txt(c.inicial) + "</p>"));
      } else {
        inner.appendChild(el('<hr class="rule" data-reveal>'));
      }
      var bq = el('<blockquote class="quote__text" data-reveal>' + txt(c.texto) + "</blockquote>");
      if (c.autor) bq.appendChild(el('<cite class="quote__author">' + txt(c.autor) + "</cite>"));
      inner.appendChild(bq);
      return s;
    },

    contador: function (c) {
      var s = section("counter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      var unidades = [["dias", "días"], ["horas", "horas"], ["min", "minutos"], ["seg", "segundos"]];
      var grid = el('<div class="counter__grid" data-reveal data-desde="' +
                    txt(c.desde || HISTORIA.fechaInicio) + '"></div>');
      unidades.forEach(function (u) {
        grid.appendChild(el(
          '<div class="counter__cell">' +
            '<span class="counter__num" data-unit="' + u[0] + '">0</span>' +
            '<span class="counter__label">' + u[1] + "</span>" +
          "</div>"
        ));
      });
      inner.appendChild(grid);
      if (c.pie) inner.appendChild(el('<p class="counter__foot" data-reveal>' + txt(c.pie) + "</p>"));
      return s;
    },

    lista: function (c) {
      var s = section("list-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      if (c.intro)  inner.appendChild(el('<p class="body" data-reveal>' + txt(c.intro) + "</p>"));
      var ul = el('<ul class="list"></ul>');
      (c.items || []).forEach(function (item) {
        var texto = typeof item === "string" ? item : item.texto;
        var nota  = typeof item === "string" ? "" : item.nota;
        ul.appendChild(el(
          "<li data-reveal>" + txt(texto) +
          (nota ? '<span class="list__note">' + txt(nota) + "</span>" : "") +
          "</li>"
        ));
      });
      inner.appendChild(ul);
      if (c.cierre) inner.appendChild(el('<p class="list__cierre" data-reveal>' + txt(c.cierre) + "</p>"));
      var fl = fotoDentro(c);
      if (fl) inner.appendChild(fl);
      return s;
    },

    carta: function (c) {
      var s = section("letter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      (c.parrafos || []).forEach(function (p) {
        inner.appendChild(el('<p class="body" data-reveal>' + txt(p) + "</p>"));
      });
      return s;
    },

    cielo: function (c) {
      var s = section("cielo-chapter chapter--negro");
      var inner = s.querySelector(".chapter__inner");
      var cielo = el('<div class="cielo"></div>');

      if (c.kicker) cielo.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) cielo.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      // Sin marco ni bordes: el negro de la imagen se funde con el del capítulo
      var disco = el(
        '<img class="cielo__disco" src="' + txt(conVersion(c.src)) + '" alt="' +
        txt(c.alt || "Mapa de las estrellas de esa noche") +
        '" loading="lazy" decoding="async" width="815" height="815" data-reveal>'
      );
      cielo.appendChild(disco);

      if (c.pie) cielo.appendChild(el('<p class="cielo__pie" data-reveal>' + txt(c.pie) + "</p>"));
      inner.appendChild(cielo);
      return s;
    },

    // Una captura de pantalla sobre negro (el pantallazo de Minecraft)
    pantalla: function (c) {
      var s = section("pantalla-chapter chapter--negro");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      inner.appendChild(el(
        '<img class="pantalla__img" src="' + txt(conVersion(c.src)) + '" alt="' +
        txt(c.alt || "") + '" loading="lazy" decoding="async" data-reveal>'
      ));
      if (c.pie) inner.appendChild(el('<p class="pantalla__pie" data-reveal>' + txt(c.pie) + "</p>"));
      return s;
    },

    // Marcos vacíos: las fotos que todavía no existen
    futuro: function (c) {
      var s = section("futuro-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      var rejilla = el('<div class="futuro"></div>');
      (c.momentos || []).forEach(function (m) {
        var item = el('<figure class="futuro__item" data-reveal></figure>');
        if (m.src) {
          // El día que exista la foto, basta con ponerla aquí
          var marco = el('<div class="futuro__marco futuro__marco--lleno"></div>');
          var im = el('<img src="' + txt(conVersion(m.src)) +
                      '" alt="" loading="lazy" decoding="async">');
          // Si la imagen todavía no existe, el marco vuelve a quedarse vacío
          im.addEventListener("error", function () {
            marco.classList.remove("futuro__marco--lleno");
            marco.appendChild(el("<span>?</span>"));
            im.remove();
          });
          marco.appendChild(im);
          item.appendChild(marco);
        } else {
          item.appendChild(el('<div class="futuro__marco"><span>?</span></div>'));
        }
        item.appendChild(el('<figcaption>' + txt(m.texto) + "</figcaption>"));
        rejilla.appendChild(item);
      });
      inner.appendChild(rejilla);
      if (c.pie) inner.appendChild(el('<p class="futuro__pie" data-reveal>' + txt(c.pie) + "</p>"));
      return s;
    },

    // Los regalos, como vales
    regalos: function (c) {
      var s = section("regalos-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      (c.regalos || []).forEach(function (r) {
        var vale = el('<div class="vale" data-reveal></div>');
        vale.appendChild(el('<span class="vale__sello">Vale por</span>'));
        vale.appendChild(el('<p class="vale__que">' + txt(r.que) + "</p>"));
        if (r.nota) vale.appendChild(el('<p class="vale__nota">' + txt(r.nota) + "</p>"));
        inner.appendChild(vale);
      });
      if (c.pie) inner.appendChild(el('<p class="regalos__pie" data-reveal>' + txt(c.pie) + "</p>"));
      return s;
    },

    // Una estantería: cada libro es un regalo. Al tocarlo se abre por la mitad.
    libreria: function (c) {
      var s = section("libreria-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      var COLORES = ["#8E4A3C", "#3F5B4C", "#2F4858", "#6B4A78", "#8A6B2F", "#7A3B4A"];
      var ALTOS   = [176, 162, 184, 168, 179, 165];

      var libreria = el('<div class="libreria" data-reveal></div>');
      var estante  = el('<div class="estante"></div>');

      // La capa donde se abre el libro. Va colgada del body para que nada
      // de la página la recorte.
      var capa = el(
        '<div class="tomo-capa" role="dialog" aria-modal="true" aria-label="Regalo" hidden>' +
          '<button class="tomo-capa__cerrar" type="button" aria-label="Cerrar">&times;</button>' +
          '<div class="tomo">' +
            '<div class="tomo__interior">' +
              '<p class="tomo__que"></p>' +
              '<p class="tomo__nota"></p>' +
            "</div>" +
            '<div class="tomo__tapa tomo__tapa--izq"></div>' +
            '<div class="tomo__tapa tomo__tapa--der"></div>' +
          "</div>" +
        "</div>"
      );
      document.body.appendChild(capa);

      var tomo   = capa.querySelector(".tomo");
      var elQue  = capa.querySelector(".tomo__que");
      var elNota = capa.querySelector(".tomo__nota");
      var cerrar = capa.querySelector(".tomo-capa__cerrar");
      var ultimo = null;

      function abrir(libro, lomo) {
        ultimo = lomo;
        elQue.textContent  = libro.que || "";
        elNota.textContent = libro.nota || "";
        elNota.hidden = !libro.nota;
        tomo.style.setProperty("--c", libro.color);
        tomo.classList.remove("is-abierto");
        capa.hidden = false;
        // Un respiro para que se vea cerrado antes de abrirse
        requestAnimationFrame(function () {
          capa.classList.add("is-visible");
          setTimeout(function () { tomo.classList.add("is-abierto"); }, REDUCED ? 0 : 220);
        });
        cerrar.focus();
      }

      function cerrarCapa() {
        tomo.classList.remove("is-abierto");
        capa.classList.remove("is-visible");
        setTimeout(function () { capa.hidden = true; }, 420);
        if (ultimo) ultimo.focus();
      }

      cerrar.addEventListener("click", cerrarCapa);
      capa.addEventListener("click", function (e) {
        if (e.target === capa) cerrarCapa();      // tocar fuera del libro
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !capa.hidden) cerrarCapa();
      });

      (c.libros || []).forEach(function (libro, i) {
        libro.color = libro.color || COLORES[i % COLORES.length];
        var lomo = el(
          '<button class="lomo" type="button">' +
            '<span class="lomo__titulo">' + txt(libro.lomo || (i + 1)) + "</span>" +
          "</button>"
        );
        lomo.style.setProperty("--c", libro.color);
        lomo.style.setProperty("--h", (libro.alto || ALTOS[i % ALTOS.length]) + "px");
        lomo.addEventListener("click", function () { abrir(libro, lomo); });
        estante.appendChild(lomo);
      });

      libreria.appendChild(estante);
      libreria.appendChild(el('<div class="estante__tabla"></div>'));
      libreria.appendChild(el('<p class="libreria__pista">' +
                              txt(c.instruccion || "toca un libro") + "</p>"));
      inner.appendChild(libreria);
      return s;
    },

    sobre: function (c) {
      var s = section("sobre-chapter");
      var inner = s.querySelector(".chapter__inner");
      if (c.kicker) inner.appendChild(el('<p class="kicker" data-reveal>' + txt(c.kicker) + "</p>"));
      if (c.titulo) inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));

      var sobre = el('<div class="sobre" data-reveal></div>');

      // La carta va ANTES del sobre: así crece hacia arriba y su borde
      // inferior queda escondido detrás, como si saliera de dentro.
      var carta = el('<div class="sobre__carta"><div class="sobre__papel"><div class="sobre__texto"></div></div></div>');
      var texto = carta.querySelector(".sobre__texto");
      (c.parrafos || []).forEach(function (par) {
        texto.appendChild(el("<p>" + txt(par) + "</p>"));
      });
      if (c.cierre) texto.appendChild(el('<p class="sobre__cierre">' + txt(c.cierre) + "</p>"));
      sobre.appendChild(carta);

      // Las piezas del sobre, en orden de profundidad
      var cuerpo = el('<div class="sobre__sobre"></div>');
      cuerpo.appendChild(el('<div class="sobre__base"></div>'));
      cuerpo.appendChild(el('<div class="sobre__izq"></div>'));
      cuerpo.appendChild(el('<div class="sobre__der"></div>'));
      cuerpo.appendChild(el('<div class="sobre__abajo"></div>'));
      cuerpo.appendChild(el('<div class="sobre__solapa"></div>'));

      var sello = el(
        '<button class="sobre__sello" type="button" aria-expanded="false">' +
          txt(c.sello || "Ábreme") +
        "</button>"
      );
      cuerpo.appendChild(sello);
      sobre.appendChild(cuerpo);

      var pista = el('<p class="sobre__pista">toca el lacre</p>');
      sobre.appendChild(pista);

      sello.addEventListener("click", function () {
        sobre.classList.add("is-open");
        sello.setAttribute("aria-expanded", "true");
      });

      inner.appendChild(sobre);
      return s;
    },

    final: function (c) {
      var s = section("final");
      s.id = "final";
      var inner = s.querySelector(".chapter__inner");
      inner.appendChild(el('<h2 class="title" data-reveal>' + txt(c.titulo) + "</h2>"));
      if (c.firma) inner.appendChild(el('<p class="final__sign" data-reveal>' + txt(c.firma) + "</p>"));
      return s;
    }
  };

  /* ---------- Render ---------- */

  var main = document.getElementById("historia");

  if (typeof HISTORIA === "undefined") {
    main.innerHTML = '<section class="chapter"><p class="body">No se ha podido cargar el contenido.</p></section>';
    return;
  }

  document.title = "Para " + (HISTORIA.apodo || HISTORIA.nombre || "ti");
  document.documentElement.setAttribute("data-tema", HISTORIA.tema || "noche");

  HISTORIA.capitulos.forEach(function (c) {
    var build = BLOQUES[c.tipo];
    if (!build) return;                 // tipo desconocido: se salta sin romper nada
    main.appendChild(build(c));
  });

  /* ---------- Apariciones al deslizar ---------- */

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
      setTimeout(function () { entry.target.classList.add("is-settled"); }, 1400);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

  // Cada bloque de un capítulo entra un pelín después que el anterior
  Array.prototype.forEach.call(main.querySelectorAll(".chapter"), function (chapter) {
    Array.prototype.forEach.call(chapter.querySelectorAll("[data-reveal]"), function (node, i) {
      node.style.setProperty("--delay", Math.min(i * 0.11, 0.9) + "s");
      observer.observe(node);
    });
  });

  /* ---------- Barra de progreso + pista de la portada ---------- */

  var bar = document.querySelector("#progress span");
  var hint = document.getElementById("coverHint");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct.toFixed(2) + "%";
      if (hint) hint.classList.toggle("is-hidden", window.scrollY > 60);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Contador en vivo ---------- */

  var relojes = document.querySelectorAll(".counter__grid");

  if (relojes.length) {
    var nf = new Intl.NumberFormat("es-ES");
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };

    var tick = function () {
      Array.prototype.forEach.call(relojes, function (reloj) {
        var inicio = new Date(reloj.dataset.desde).getTime();
        if (isNaN(inicio)) return;
        var ms = Date.now() - inicio;
        if (ms < 0) ms = 0;
        var seg = Math.floor(ms / 1000);
        var valores = {
          dias:  nf.format(Math.floor(seg / 86400)),
          horas: pad(Math.floor(seg / 3600) % 24),
          min:   pad(Math.floor(seg / 60) % 60),
          seg:   pad(seg % 60)
        };
        Array.prototype.forEach.call(reloj.querySelectorAll("[data-unit]"), function (c) {
          c.textContent = valores[c.dataset.unit];
        });
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Música (opcional) ---------- */

  var audio = document.getElementById("audio");
  var btn   = document.getElementById("musicToggle");
  var arrancarMusica = null;        // lo usará también el corazón de la entrada

  if (HISTORIA.musica) {
    audio.src = conVersion(HISTORIA.musica);
    btn.hidden = false;

    // Si el archivo no existe o el formato no se puede reproducir, escondemos
    // el botón: mejor que ella toque y no pase nada.
    audio.addEventListener("error", function () { btn.hidden = true; });

    var fade = null;
    var fadeTo = function (target, done) {
      clearInterval(fade);
      fade = setInterval(function () {
        var diff = target - audio.volume;
        if (Math.abs(diff) < 0.04) {
          audio.volume = target;
          clearInterval(fade);
          if (done) done();
          return;
        }
        audio.volume = Math.min(1, Math.max(0, audio.volume + diff * 0.15));
      }, 40);
    };

    // iOS solo permite arrancar el sonido dentro de un gesto del usuario:
    // por eso esto siempre se llama desde un click, nunca solo.
    arrancarMusica = function () {
      if (!audio.paused) return;
      audio.volume = 0;
      var p = audio.play();
      if (p && p.catch) p.catch(function () { btn.hidden = true; });
      btn.setAttribute("aria-pressed", "true");
      btn.setAttribute("aria-label", "Silenciar música");
      fadeTo(0.55);
    };

    btn.addEventListener("click", function () {
      if (audio.paused) {
        arrancarMusica();
      } else {
        fadeTo(0, function () { audio.pause(); });
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Reproducir música");
      }
    });
  }

  /* ---------- Pantalla de entrada: el corazón ---------- */

  var gate = document.getElementById("gate");

  if (gate) {
    var cfg      = HISTORIA.entrada || {};
    var mensajes = cfg.mensajes && cfg.mensajes.length
                 ? cfg.mensajes
                 : [{ hasta: 100, texto: "cargando…" }];

    document.getElementById("gateName").textContent = HISTORIA.apodo || HISTORIA.nombre || "";
    document.getElementById("gateHint").textContent = cfg.instruccion || "toca el corazón";

    var gMsg   = document.getElementById("gateMsg");
    var gBar   = document.querySelector("#gateBar span");
    var gHeart = document.getElementById("gateHeart");

    var abrir = function () {
      gate.classList.add("is-gone");
      document.body.classList.remove("is-locked");
      window.scrollTo(0, 0);
      setTimeout(function () { gate.remove(); }, 900);
    };

    var paso = function (i) {
      if (i >= mensajes.length) {
        setTimeout(abrir, 600);
        return;
      }
      gMsg.textContent = mensajes[i].texto;
      gBar.style.width = mensajes[i].hasta + "%";
      setTimeout(function () { paso(i + 1); }, REDUCED ? 260 : 820);
    };

    gHeart.addEventListener("click", function () {
      if (gate.classList.contains("is-loading")) return;
      gate.classList.add("is-loading");
      if (arrancarMusica) arrancarMusica();   // el gesto que iOS exige
      paso(0);
    });
  }

  /* ---------- Lluvia de corazones al llegar al final ---------- */

  var finalSection = document.getElementById("final");

  if (finalSection && !REDUCED) {
    var lanzado = false;
    var vigia = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !lanzado) {
        lanzado = true;
        vigia.disconnect();
        corazones();
      }
    }, { threshold: 0.45 });
    vigia.observe(finalSection);
  }

  function corazones() {
    var canvas = document.createElement("canvas");
    canvas.id = "hearts";
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H;

    function size() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener("resize", size, { passive: true });

    var COLORES = ["#E8B4A0", "#F5EDE6", "#D98C8C", "#C9A0C4"];
    var piezas = [];
    for (var i = 0; i < 46; i++) {
      piezas.push({
        x: Math.random() * W,
        y: -20 - Math.random() * H * 0.8,
        s: 7 + Math.random() * 11,
        vy: 26 + Math.random() * 42,          // px por segundo
        sway: 12 + Math.random() * 26,
        phase: Math.random() * Math.PI * 2,
        rot: (Math.random() - 0.5) * 0.9,
        color: COLORES[(Math.random() * COLORES.length) | 0]
      });
    }

    function heart(x, y, s, rot, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(s / 16, s / 16);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(0, 1, -2, -4, -7, -4);
      ctx.bezierCurveTo(-15, -4, -15, 6, -15, 6);
      ctx.bezierCurveTo(-15, 12, -8, 18, 0, 23);
      ctx.bezierCurveTo(8, 18, 15, 12, 15, 6);
      ctx.bezierCurveTo(15, 6, 15, -4, 7, -4);
      ctx.bezierCurveTo(2, -4, 0, 1, 0, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    var DURACION = 6500;                    // se para solo: no calienta el móvil
    var t0 = performance.now();
    var anterior = t0;

    function frame(now) {
      var dt = Math.min((now - anterior) / 1000, 0.05);
      anterior = now;
      var vida = now - t0;

      ctx.clearRect(0, 0, W, H);

      // Se desvanece en el último segundo y medio
      var alpha = vida > DURACION - 1500
        ? Math.max(0, (DURACION - vida) / 1500)
        : 1;

      for (var i = 0; i < piezas.length; i++) {
        var p = piezas[i];
        p.y += p.vy * dt;
        p.phase += dt * 1.6;
        var x = p.x + Math.sin(p.phase) * p.sway;
        if (p.y > H + 30) { p.y = -30; p.x = Math.random() * W; }
        heart(x, p.y, p.s, p.rot + Math.sin(p.phase) * 0.25, p.color, alpha * 0.9);
      }

      if (vida < DURACION) {
        requestAnimationFrame(frame);
      } else {
        window.removeEventListener("resize", size);
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

})();
