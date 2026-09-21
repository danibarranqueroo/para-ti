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
      kicker: "Antes",
      titulo: "Cómo era esto\nantes de ti",
      cuerpo: [
        "«PENDIENTE: una o dos frases sobre cómo era tu vida antes del 8 de febrero de 2021. No hace falta que sea triste, solo más pequeña.»"
      ]
    },

    {
      tipo: "texto",
      kicker: "8 de febrero de 2021",
      titulo: "El día que\nempezó todo",
      cuerpo: [
        "«PENDIENTE: ese día con detalle. Dónde estabais, qué hora era, qué llevaba puesto, qué dijo ella, qué pensaste tú.»"
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
      pie: "«PENDIENTE: pie de foto.»"
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
        "Portugal",
        "Canarias",
        "Ámsterdam",
        "Madrid",
        "Barcelona",
        "Benidorm",
        "Murcia",
        "Almería",
        "Irlanda"
      ]
    },

    {
      tipo: "fotos",
      kicker: "El álbum",
      titulo: "Trocitos",
      fotos: ["img/02.jpg", "img/03.jpg", "img/04.jpg", "img/05.jpg"],
      pie: "«PENDIENTE: una frase que resuma todas estas fotos juntas.»"
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
      items: [
        "Empezar otra vez",
        "Confiar otra vez",
        "Soñar otra vez"
      ]
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

    {
      tipo: "foto",
      src: "img/06.jpg",
      pie: "«PENDIENTE: una foto de ahora, de las recientes.»"
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
        "«PENDIENTE: la carta. Escríbela de una sentada, sin corregirte, como si se la estuvieras diciendo a la cara.»",
        "«Tres o cuatro párrafos van perfectos. Que se lea despacio.»"
      ],
      cierre: "«PENDIENTE: la última frase, la que más pese.»"
    },

    {
      tipo: "libreria",
      kicker: "Ah, y una cosa más",
      titulo: "Tu estantería",
      instruccion: "toca un libro",
      // El texto del lomo NO debe desvelar el regalo: es lo que ella ve
      // antes de abrirlo. El regalo está en "que".
      libros: [
        { lomo: "Cuidarte",            que: "Una limpieza facial", nota: "cuando tú digas" },
        { lomo: "Para leer",           que: "Un libro" },
        { lomo: "No perder la página", que: "Un separador de libros" },
        { lomo: "Para ponerte guapa",  que: "Ropa" }
      ]
    },

    {
      tipo: "final",
      titulo: "Feliz cumpleaños,\nMi Amorcito",
      firma: "Te quiero,\nDani"
    }

  ]
};
