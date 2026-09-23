/* =========================================================================
   ⭐ ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR ⭐

   Todo el texto, las fechas y las fotos de la web están aquí.
   Cambia lo que quieras entre las comillas y guarda. Nada más.

   Los textos entre «corchetes angulares» son huecos que solo tú puedes
   rellenar: fechas, sitios, motes, cosas vuestras. Sustitúyelos.

   REGLAS RÁPIDAS
   - Si una frase lleva comillas dobles dentro, escríbelas así: \"
   - Para borrar un capítulo entero, bórralo desde su { hasta su },
   - Para añadir uno, copia otro parecido y cámbialo.
   ========================================================================= */

const HISTORIA = {

  /* --- Datos base ------------------------------------------------------ */
  nombre: "Andrea",
  apodo: "Mi Amorcito",

  // Cuándo empezasteis. Si recuerdas la hora, cámbiala (formato 24h).
  fechaInicio: "2021-02-08T00:00:00",

  // Su fecha de nacimiento. Pon el año y aparecerá un contador con los días
  // que lleva en el mundo. Si lo dejas así, ese capítulo no cuenta nada.
  fechaNacimiento: "2001-09-26T00:00:00",

  // Dos estilos disponibles. Cambia la palabra y ya está:
  //   "noche" → fondo oscuro, cinematográfico (el de ahora)
  //   "papel" → fondo crema tipo carta, como el vídeo que viste
  tema: "noche",

  // La pantalla de entrada: ella toca el corazón y la barra le toma el pelo
  // antes de dejarla pasar. Cambia los mensajes por los que quieras.
  entrada: {
    instruccion: "toca el corazón",
    mensajes: [
      { hasta: 62,  texto: "cargando…" },
      { hasta: 41,  texto: "Otra vez" },
      { hasta: 78,  texto: "Un poquito más" },
      { hasta: 100, texto: "¡La última vez!" }
    ]
  },

  // Canción de fondo. Deja "" (vacío) si no quieres música.
  // Si pones una, guarda el archivo en la carpeta audio/
  musica: "",

  /* --- La historia, capítulo a capítulo -------------------------------- */
  capitulos: [

    /* ===================================================================
       PRIMER ACTO — ELLA
       Antes de hablar de nosotros, hablamos de ella. Esto es lo que hace
       que la web sea de su cumpleaños y no de nuestro aniversario.
       =================================================================== */

    {
      tipo: "portada",
      fondo: "img/portada.jpg",
      kicker: "26 de septiembre",
      titulo: "Feliz cumpleaños,\nMi Amorcito",
      subtitulo: "Te he hecho una cosa. Ponte cómoda.",
      hint: "desliza"
    },

    {
      tipo: "texto",
      kicker: "Antes de nada",
      titulo: "Hoy no va\nde nosotros",
      cuerpo: [
        "«PENDIENTE — el capítulo que lo cambia todo. Dile que hoy no va de vuestra historia: va de ella. Que se celebra que existe, no que os encontrasteis. Dos o tres frases bastan.»"
      ]
    },

    {
      tipo: "texto",
      kicker: "Mucho antes de mí",
      titulo: "La niña que\nfuiste",
      cuerpo: [
        "«PENDIENTE — lo que te cuente su madre. Cómo era de pequeña, qué hacía, qué decía, de qué se reía. Cuanto más concreto y más tonto, mejor.»"
      ]
    },

    {
      tipo: "fotos",
      estilo: "polaroid",
      fotos: ["img/nina-1.jpg", "img/nina-2.jpg", "img/nina-3.jpg", "img/nina-4.jpg"],
      pie: "«PENDIENTE — pídele a su madre 4 fotos de ella de pequeña.»"
    },

    {
      tipo: "contador",
      kicker: "Desde entonces",
      titulo: "Llevas en el mundo",
      desde: "2001-09-26T00:00:00",
      pie: "y menos mal"
    },

    {
      tipo: "texto",
      kicker: "La universidad",
      titulo: "En quién te\nibas convirtiendo",
      cuerpo: [
        "«PENDIENTE — sus años de carrera: qué estudió, cómo se lo curró, quién era entonces, de qué se enorgullece. Esto es suyo, tú no aparezcas.»"
      ]
    },

    {
      tipo: "lista",
      kicker: "Lo que veo",
      titulo: "Lo que admiro\nde ti",
      items: [
        "«PENDIENTE — y aquí la regla difícil: que ninguna frase te incluya a ti.»",
        "«No vale \"me haces mejor\". Vale \"eres incapaz de dejar a nadie atrás\".»",
        "«Lo valiente que eres cuando…»",
        "«Lo bien que se te da…»",
        "«La cabezonería con la que…»",
        "«Lo que haces por los tuyos sin que nadie te lo pida»"
      ]
    },

    {
      tipo: "lista",
      kicker: "Y además",
      titulo: "Lo graciosa\nque eres",
      items: [
        "«PENDIENTE — cosas concretas: frases que dice, caras que pone, cómo se ríe.»",
        "«Lo que dice siempre cuando…»",
        "«Cómo se ríe de sus propios chistes antes de contarlos»"
      ]
    },

    {
      tipo: "foto",
      src: "img/ella.jpg",
      pie: "«PENDIENTE — una foto de ella sola, que le guste a ella.»"
    },

    /* ===================================================================
       SEGUNDO ACTO — NOSOTROS
       Aquí sí: el 8 de febrero, los viajes, el tatuaje.
       =================================================================== */

    {
      tipo: "texto",
      kicker: "Y entonces",
      titulo: "Cómo era esto\nantes de ti",
      cuerpo: [
        "«PENDIENTE — cómo era tu vida antes del 8 de febrero de 2021. No hace falta que sea triste, solo más pequeña.»"
      ]
    },

    {
      tipo: "texto",
      kicker: "8 de febrero de 2021",
      titulo: "El día que\nempezó todo",
      cuerpo: [
        "«PENDIENTE — ese día con detalle. Dónde estabais, qué hora era, qué llevaba puesto, qué dijo ella, qué pensaste tú.»"
      ]
    },

    {
      tipo: "cielo",
      kicker: "Granada · 8 de febrero de 2021",
      titulo: "Bajo estas estrellas\nempezó todo",
      src: "img/cielo.png",
      alt: "Mapa del cielo sobre Granada la noche del 8 de febrero de 2021",
      pie: "Así estaba el cielo esa noche, justo encima de nosotros."
    },

    {
      tipo: "foto",
      src: "img/01.jpg",
      pie: "«PENDIENTE — pie de foto.»"
    },

    {
      tipo: "lista",
      kicker: "Contigo, todo por primera vez",
      titulo: "Fuiste mi primera vez\nen muchas cosas",
      items: [
        "Mi primera persona favorita",
        "Mi primer «ya llegaste a casa»",
        "Mi primer «¿cómo te fue en el trabajo?»",
        "Mi primer «¿cómo está nuestra gatilla?»",
        "Mi primera paz en medio del caos",
        "Mi primer lugar seguro"
      ]
    },

    {
      tipo: "cita",
      texto: "Y la que me hizo sentir que el amor es paz, es tranquilidad, es hogar y es felicidad."
    },

    {
      tipo: "contador",
      kicker: "Y mientras tanto",
      titulo: "Llevamos juntos",
      pie: "desde el 8 de febrero de 2021 · y sumando"
    },

    {
      tipo: "lista",
      kicker: "Nueve sitios",
      titulo: "Dónde hemos\nsido felices",
      items: [
        "Portugal", "Canarias", "Ámsterdam", "Madrid", "Barcelona",
        "Benidorm", "Murcia", "Almería", "Irlanda"
      ]
    },

    {
      tipo: "fotos",
      kicker: "El álbum",
      titulo: "Trocitos",
      fotos: ["img/02.jpg", "img/03.jpg", "img/04.jpg", "img/05.jpg"],
      pie: "«PENDIENTE — una frase que resuma todas estas fotos juntas.»"
    },

    {
      tipo: "pantalla",
      kicker: "03:14 de la madrugada",
      titulo: "¿Por qué será que\nhoy no me puedo dormir?",
      src: "img/minecraft.png",
      alt: "Pantalla de Minecraft: esperando a que otros se vayan a dormir",
      pie: "«MÍA, cámbiala si quieres: en Minecraft la noche no pasa hasta que todos se duermen. Resulta que en mi cama funciona igual.»"
    },

    {
      tipo: "texto",
      kicker: "La verdad",
      titulo: "Todos los errores,\ncontigo",
      cuerpo: [
        "No sé cuántas disculpas tendremos que pedir para llegar a viejos juntos.",
        "Pero sí sé que quiero que todos los errores sean contigo. Aprender juntos. Y no tener que volver a amar a nadie más."
      ]
    },

    {
      tipo: "lista",
      kicker: "Y aun así",
      titulo: "Empezar\notra vez",
      items: ["Empezar otra vez", "Confiar otra vez", "Soñar otra vez"]
    },

    {
      tipo: "texto",
      cuerpo: [
        "«MÍA, cámbiala si quieres: nadie te cuenta que lo difícil no es enamorarse. Es volver a hacerlo de la misma persona. Otra vez, y otra, y otra.»"
      ]
    },

    {
      tipo: "cita",
      inicial: "A",
      texto: "Te elegiría siempre a ti. En cada vida, en cien mundos, en cada versión de la realidad.\n\nPorque aunque lleve tu inicial tatuada, es en mi corazón donde estás tatuada tú. Y es ahí donde vas a quedarte para siempre.\n\nPorque te elegiría una y mil veces."
    },

    /* ===================================================================
       TERCER ACTO — LO QUE VIENE
       =================================================================== */

    {
      tipo: "foto",
      src: "img/06.jpg",
      pie: "«PENDIENTE — una foto de ahora, de las recientes.»"
    },

    {
      tipo: "texto",
      kicker: "Y a partir de aquí",
      titulo: "Amarte hoy.\nAmarte mañana.\nAmarte toda una vida.",
      cuerpo: []
    },

    {
      tipo: "futuro",
      kicker: "Lo que nos queda",
      titulo: "Las fotos que\ntodavía no hemos hecho",
      momentos: [
        { texto: "La casa nueva" },
        { texto: "El próximo viaje" },
        { texto: "La boda" },
        { texto: "Un bebé" },
        { texto: "Nosotros, viejitos" }
      ],
      pie: "Estos marcos están vacíos a propósito. Los vamos a ir llenando."
    },

    {
      tipo: "sobre",
      kicker: "Y por último",
      titulo: "Te he escrito\nuna carta",
      sello: "Ábreme",
      parrafos: [
        "«PENDIENTE — la carta. Escríbela de una sentada, sin corregirte, como si se la estuvieras diciendo a la cara.»",
        "«Tres o cuatro párrafos van perfectos. Que se lea despacio.»"
      ],
      cierre: "«PENDIENTE — la última frase, la que más pese.»"
    },

    {
      tipo: "libreria",
      kicker: "Ah, y una cosa más",
      titulo: "Tu estantería",
      instruccion: "toca un libro",
      libros: [
        { lomo: "Cuidarte",        que: "Una limpieza facial", nota: "cuando tú digas" },
        { lomo: "Para leer",       que: "Libros",              nota: "en plural, sí" },
        { lomo: "Entre estos dos", que: "Un book nook",        nota: "un mundo diminuto para meter en tu estantería" },
        { lomo: "Que viaje bien",  que: "Una funda para el Kindle" },
        { lomo: "Para ponerte guapa", que: "Ropa",             nota: "la que tú quieras: eliges tú" }
      ]
    },

    {
      tipo: "final",
      titulo: "Feliz cumpleaños,\nMi Amorcito",
      firma: "Te quiero,\nDani"
    }

  ]
};
