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
      kicker: "26 de septiembre",
      titulo: "Hoy cumples\nun cuarto de siglo",
      cuerpo: [
        "Hoy se celebra que cumples 25 años. Que tienes ya un cuarto de siglo.",
        "Para tu familia seguro que parece que fue ayer cuando naciste. Y para mí parece que fue ayer cuando vi por primera vez esa sonrisa tan bonita.",
        "Así que hoy, por un rato, esto no va de nosotros. Va de ti. De los veinticinco años que llevas siendo tú, casi todos sin mí."
      ]
    },

    {
      tipo: "texto",
      kicker: "Mucho antes de mí",
      titulo: "La niña\nque fuiste",
      cuerpo: [
        "Sé que fuiste una niña muy feliz. Con tus muñecas, con tu colección de Monster High, todo el día rodeada de unos tíos que siempre te chinchaban pero que te querían como a nadie en el mundo.",
        "Una madre que siempre ha querido que seas la más feliz del mundo. Y unos abuelos que harían cualquier cosa por ti.",
        "También sé que has pasado momentos duros, y que no todo es siempre felicidad. Pero es justo eso lo que te ha llevado a ser la mujer tan increíble que eres hoy."
      ]
    },

    {
      tipo: "fotos",
      estilo: "polaroid",
      fotos: ["img/nina-1.jpg", "img/nina-2.jpg", "img/nina-3.jpg", "img/nina-4.jpg"],
      pie: "Tu madre guarda estas fotos como si fueran suyas.\nY en parte lo son."
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
      kicker: "Del pueblo a Granada",
      titulo: "En quién te\nibas convirtiendo",
      cuerpo: [
        "Poco a poco fuiste creciendo. Haciendo amigas, alguna que otra trastada por el pueblo. Hasta que llegó el momento de dar el paso e irte a Granada a estudiar.",
        "Solo tú sabes la cantidad de autobuses que has cogido. El esfuerzo de estar allí día a día, las horas estudiando, los llantos y las alegrías.",
        "Pero lo más importante es que todo el mundo que te conoce está súper orgulloso de ti. Yo el que más. Porque siempre has dado más de lo que podías. Porque aunque te costara, seguías intentándolo. Y porque lo has logrado.",
        "Soy un afortunado de haber podido vivir parte de ese camino a tu lado."
      ],
      foto: "img/graduacion.jpg",
      pieFoto: "Grado en Economía. Promoción 2019–2023.\nTodos esos autobuses llevaban aquí."
    },

    {
      tipo: "lista",
      kicker: "Aunque no te lo diga",
      titulo: "Lo que admiro\nde ti",
      intro: "Hay un montón de cosas que admiro de ti, y que ojalá ser como tú.",
      items: [
        "Esa valentía de decir lo que piensas en todo momento",
        "Esa capacidad de seguir adelante pese a los dolores y el sufrimiento",
        "Todo lo que haces por los demás sin pedir nunca nada a cambio",
        "Que te has construido tu sitio tú sola, sin que nadie te lo regalara",
        "Que no te conformas con lo primero que te dicen",
        "Lo bien que sostienes a la gente que quieres cuando se les cae todo"
      ]
    },

    {
      tipo: "lista",
      kicker: "Y además",
      titulo: "Lo graciosa\nque eres",
      intro: "Me encanta esa risa que te sale cuando ya no puedes más.",
      items: [
        "Esa risa que sé que para alguna gente parecerá un cerdo en un matadero, pero que a mí me encanta",
        "Cómo tú sola ya te estás riendo de un vídeo antes de enseñármelo",
        "Esas tonterías y esas bromas en los mejores momentos",
        "Cómo eres capaz de estar atenta al más mínimo chisme de quien sea, para cotillearlo luego",
        "Las caras que intentas poner cuando algo te da risa pero quieres estar seria"
      ],
      foto: "img/riendose.jpg",
      pieFoto: "Esa risa preciosa."
    },

    {
      tipo: "foto",
      src: "img/ella-1.jpg",
      pie: "Tú. Sin más."
    },

    /* ===================================================================
       SEGUNDO ACTO — NOSOTROS
       =================================================================== */

    {
      tipo: "texto",
      kicker: "Cómo empezó",
      titulo: "Un tweet tuyo\ny yo de pesado",
      cuerpo: [
        "Y todo esto empezó por un tweet tuyo y por ser yo un pesado. Quién lo diría.",
        "No hace falta contar la misma historia mil veces. Si fuera una coincidencia romántica de la vida, algo divertido, puede que sí. Pero simplemente fuimos dos personas destinadas a conectar y a estar juntas para siempre.",
        "Un chispazo que desde el momento uno en el que hablamos ya se notaba.",
        "No hubo señales ni casualidades que contar. Hubo dos personas hablando a deshora y la sensación rarísima de estar llegando tarde a algo que ya era nuestro."
      ]
    },

    {
      tipo: "texto",
      kicker: "Y entonces",
      titulo: "«Por qué no quedo\ncon el pesao este»",
      cuerpo: [
        "Luego vino ese día en el que, ya que estabas en Granada, dijiste: y por qué no quedo con el pesao este.",
        "Y ahí iba yo, súper nervioso, a encontrarte tan guapa. Con esa sonrisa. Con esa mirada.",
        "Todo para que luego me pidieras un bizum y te rieras de que me llamo Jose Daniel."
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
      src: "img/nosotros-inicio.jpg",
      pie: "Así de guapos éramos al principio."
    },

    {
      tipo: "texto",
      kicker: "Y mientras tanto",
      titulo: "Lo que me\nhas cambiado",
      cuerpo: [
        "Antes de todo esto nunca me hubiera imaginado que una persona podría cambiarme tanto la vida.",
        "Me has hecho mejor en todo. Sobre todo a saber peinarme: solo hay que ver fotos de cuando nos conocimos.",
        "A escuchar más. Sigo intentándolo, aunque esté sordo.",
        "Y a aprender de mis errores. Aunque vuelva a caer en alguno, te prometo que cada vez aprendo más y soy mejor."
      ]
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
      ],
      cierre: "Y la que me hizo sentir que el amor es paz, es tranquilidad, es hogar y es felicidad.",
      foto: "img/gata.jpg",
      pieFoto: "Y ella, que también te eligió."
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
        { texto: "Portugal",     nota: "aunque tuve una pesadilla que espero no repetir nunca" },
        { texto: "Fuerteventura", nota: "esos caminos estrechos con el coche y esas playas únicas" },
        { texto: "Ámsterdam",    nota: "paseando por unos canales preciosos con la persona más preciosa del mundo a mi lado" },
        { texto: "Madrid",       nota: "ya sea para un concierto inolvidable o para algún partido de fútbol" },
        { texto: "Barcelona",    nota: "por circunstancias de la vida, pero al final siempre juntos" },
        { texto: "Benidorm",     nota: "nada más que viendo guiris" },
        { texto: "Murcia",       nota: "¿existe?" },
        { texto: "Almería",      nota: "con ese miedo que pasé en el control de la policía" },
        { texto: "Irlanda",      nota: "donde no vimos llover mucho, pero sí encontramos unos paisajes únicos" }
      ]
    },

    {
      tipo: "fotos",
      kicker: "El álbum",
      titulo: "Trocitos",
      fotos: ["img/viaje-1.jpg", "img/viaje-2.jpg", "img/viaje-3.jpg", "img/viaje-4.jpg"],
      pie: "Cada una es un sitio distinto.\nY en todas pone lo mismo."
    },

    {
      tipo: "pantalla",
      kicker: "03:14 de la madrugada",
      titulo: "¿Por qué será que\nhoy no me puedo dormir?",
      src: "img/minecraft.png",
      alt: "Pantalla de Minecraft: esperando a que otros se vayan a dormir",
      pie: "Parece que me ocurre igual que en el juego: hasta que no dormimos los dos, no puedo dormir."
    },

    {
      tipo: "foto",
      src: "img/durmiendo.jpg",
      pie: "Lo dicho. En un tren cualquiera, a media tarde,\nen cuanto te dormiste tú."
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
      items: ["Empezar otra vez", "Confiar otra vez", "Soñar otra vez"],
      cierre: "Nadie te cuenta que lo difícil no es enamorarse. Es volver a hacerlo de la misma persona. Otra vez, y otra, y otra."
    },

    {
      tipo: "lista",
      kicker: "Y sin embargo",
      titulo: "No te digo\nte quiero, pero…",
      intro: "Sé que puede que haya días en los que no te diga «te quiero» tanto como realmente lo siento.",
      items: [
        "Pero siempre me acuerdo de tus historias, de cómo te gusta el café, de tus gustos a la hora de comer y de que no soportas oír a la gente masticar",
        "No te digo te quiero, pero sé cuál es tu lado de la cama, y si veo algo que te gusta pienso en ti",
        "No te digo te quiero, pero en cada canción de una historia bonita imagino que somos tú y yo"
      ],
      cierre: "Y puede que ese sea mi problema: que quiero quedarme contigo para toda la vida y no soy capaz de expresarlo correctamente.",
      foto: "img/ella-2.jpg"
    },

    {
      tipo: "foto",
      src: "img/beso.jpg",
      pie: "Y en cada versión de la realidad, esto."
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
      src: "img/nosotros-ahora.jpg",
      pie: "Cinco años después, seguimos haciéndonos fotos\nen el ascensor antes de salir."
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
        { texto: "La casa nueva",      src: "img/futuro-casa.jpg" },
        { texto: "El próximo viaje",   src: "img/futuro-viaje.jpg" },
        { texto: "La boda",            src: "img/futuro-boda.jpg" },
        { texto: "Un bebé",            src: "img/futuro-bebe.jpg" },
        { texto: "Nosotros, viejitos", src: "img/futuro-viejitos.jpg" }
      ],
      pie: "Todavía no han pasado. Pero ya me las imagino así."
    },

    {
      tipo: "texto",
      kicker: "Y si te quedas con una cosa",
      titulo: "Los dos estamos\nenamorados de ti",
      cuerpo: [
        "Solo quiero que sepas que los dos estamos enamorados de ti.",
        "Yo, que te amo con todo mi corazón. Y ese niño pequeño que tiene todo lo que siempre había soñado."
      ],
      foto: "img/dani-nino.jpg",
      estilo: "polaroid",
      pieFoto: "Ese de ahí"
    },

    {
      tipo: "sobre",
      kicker: "Y por último",
      titulo: "Te he escrito\nuna carta",
      sello: "Ábreme",
      parrafos: [
        "«PENDIENTE — la carta. Es lo único que queda. Escríbela de una sentada, sin corregirte, como si se la estuvieras diciendo a la cara.»",
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
