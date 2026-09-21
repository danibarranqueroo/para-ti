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

  // Canción de fondo. Deja "" (vacío) si no quieres música.
  // Si pones una, guarda el archivo en la carpeta audio/
  musica: "",

  /* --- La historia, capítulo a capítulo -------------------------------- */
  capitulos: [

    {
      tipo: "portada",
      // Si pones aquí una foto vuestra, saldrá de fondo muy tenue.
      fondo: "img/portada.jpg",
      kicker: "26 de septiembre",
      titulo: "Feliz cumpleaños,\nMi Amorcito",
      subtitulo: "Te he hecho una cosa. Ponte cómoda.",
      hint: "desliza"
    },

    {
      tipo: "texto",
      kicker: "Antes",
      titulo: "Cómo era esto antes de ti",
      cuerpo: [
        "«Aquí una o dos frases sobre cómo era tu vida antes del 8 de febrero de 2021. No hace falta que sea triste, solo más pequeña.»",
        "«Algo tipo: todo funcionaba, pero nada me hacía especial ilusión.»"
      ]
    },

    {
      tipo: "texto",
      kicker: "8 de febrero de 2021",
      titulo: "El día que empezó todo",
      cuerpo: [
        "«Cuenta ese día con detalle: dónde estabais, qué hora era, qué llevaba puesto, qué dijo ella, qué pensaste tú.»",
        "«Los detalles concretos son lo que emociona. \"Llevabas el jersey verde y no parabas de reírte\" vale más que \"fue un día precioso\".»"
      ]
    },

    {
      tipo: "foto",
      src: "img/01.jpg",
      pie: "«Pie de foto: qué estabas pensando en ese momento.»"
    },

    {
      tipo: "texto",
      kicker: "Capítulo 3",
      titulo: "La primera vez que\nsupe que eras tú",
      cuerpo: [
        "«El momento exacto en el que dejó de ser algo que empezaba y pasó a ser algo serio. Un gesto suyo, una conversación, un viaje.»"
      ]
    },

    {
      tipo: "cita",
      texto: "«Una frase vuestra. Algo que ella te dijo, o que le dices siempre.»",
      autor: "Andrea"
    },

    {
      tipo: "contador",
      kicker: "Y mientras tanto",
      titulo: "Llevamos juntos",
      pie: "desde el 8 de febrero de 2021 · y sumando"
    },

    {
      tipo: "lista",
      kicker: "Nuestro mapa",
      titulo: "Sitios donde hemos sido felices",
      items: [
        { texto: "«Sitio»", nota: "«el año, o qué pasó allí»" },
        { texto: "«Sitio»", nota: "«el año, o qué pasó allí»" },
        { texto: "«Sitio»", nota: "«el año, o qué pasó allí»" },
        { texto: "«Sitio»", nota: "«el año, o qué pasó allí»" }
      ]
    },

    {
      tipo: "fotos",
      kicker: "El álbum",
      titulo: "Trocitos",
      fotos: ["img/02.jpg", "img/03.jpg", "img/04.jpg", "img/05.jpg"],
      pie: "«Una frase que resuma todas estas fotos juntas.»"
    },

    {
      tipo: "lista",
      kicker: "La verdad",
      titulo: "Cosas que amo de ti",
      items: [
        "«Cómo te ríes cuando…»",
        "«La cara que pones cuando…»",
        "«Que siempre…»",
        "«Lo bien que se te da…»",
        "«Cómo me miras cuando…»",
        "«Que nunca…»",
        "«Lo valiente que fuiste cuando…»",
        "«Que hagas que…»"
      ]
    },

    {
      tipo: "lista",
      kicker: "Solo nuestro",
      titulo: "Tonterías que nadie más entiende",
      items: [
        "«Una frase interna vuestra»",
        "«Un mote»",
        "«Ese chiste que lleváis años repitiendo»"
      ]
    },

    {
      tipo: "foto",
      src: "img/06.jpg",
      pie: "«Otra foto, de las recientes.»"
    },

    {
      tipo: "texto",
      kicker: "Lo que viene",
      titulo: "Todo lo que\nnos queda",
      cuerpo: [
        "«Habla en futuro: los viajes, la casa, los planes, las tonterías que quieres vivir con ella. Esto es lo que hace que una web de cumpleaños no vaya solo de nostalgia.»"
      ]
    },

    {
      tipo: "carta",
      kicker: "Y por último",
      titulo: "Lo que de verdad\nquería decirte",
      parrafos: [
        "«Aquí la carta. Escríbela de una sentada, sin corregirte, como si se la estuvieras diciendo a la cara.»",
        "«Tres o cuatro párrafos van perfectos. Que se lea despacio.»",
        "«Y termina con lo más difícil de decir en persona.»"
      ]
    },

    {
      tipo: "final",
      titulo: "Feliz cumpleaños,\nMi Amorcito",
      firma: "Te quiero,\nDani"
    }

  ]
};
