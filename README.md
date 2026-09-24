# Para Andrea 🤍

Web de cumpleaños. Se ve deslizando hacia abajo, pensada para iPhone.

---

## Lo único que tienes que saber

**Todo el texto está en `js/content.js`.** Ábrelo con cualquier editor, cambia lo
que hay entre comillas, guarda, y publica. Nada más.

Los textos entre «corchetes angulares» son huecos para rellenar.

---

## Ver la web en tu ordenador

```sh
cd ~/Desktop/projects/lovewebpage
python3 -m http.server 8000
```

Abre <http://localhost:8000>. Para parar el servidor: `Ctrl + C`.

## Verla en tu iPhone antes de enviársela

Con el servidor de arriba encendido y el móvil en la misma WiFi:

```sh
ipconfig getifaddr en0        # te da la IP de tu Mac, ej. 192.168.1.42
```

Abre en el iPhone `http://192.168.1.42:8000` (con tu IP).
**Esta es la prueba que cuenta** — el simulador no vale.

---

## Las 23 fotos y dónde va cada una

Guárdalas en `img/originales/` **con estos nombres exactos** y ejecuta
`bash tools/optimizar-fotos.sh`. El script respeta el nombre, así que cada una
cae sola en su sitio. El formato da igual (HEIC del iPhone incluido).

| Archivo | Dónde sale |
|---|---|
| `portada.jpg` | Fondo de la portada (opcional) |
| `nina-1` … `nina-4.jpg` | Su infancia, en marco de foto antigua |
| `graduacion.jpg` | Dentro del capítulo de la universidad |
| `riendose.jpg` | Dentro de «Lo graciosa que eres» |
| `ella-1.jpg` | Una de ella sola, cerrando el primer acto |
| `nosotros-inicio.jpg` | Vuestros principios, tras el mapa del cielo |
| `gata.jpg` | Dentro de «Fuiste mi primera vez en muchas cosas» |
| `viaje-1` … `viaje-4.jpg` | El mosaico «Trocitos», tras los nueve sitios |
| `durmiendo.jpg` | Justo después del Minecraft |
| `beso.jpg` | Justo antes del tatuaje |
| `ella-2.jpg` | Antes de «Amarte toda una vida» |
| `futuro-casa`, `futuro-viaje`, `futuro-boda`, `futuro-bebe`, `futuro-viejitos.jpg` | Los cinco momentos del futuro |
| `dani-nino.jpg` | Con «ese niño pequeño», en marco antiguo |

Las que falten no rompen nada: la foto se queda como un hueco discreto y los
marcos del futuro vuelven a salir vacíos con su interrogante.

## Añadir fotos

1. Copia las fotos al Finder en `img/originales/` (da igual si son HEIC del iPhone).
2. Ejecuta:
   ```sh
   bash tools/optimizar-fotos.sh
   ```
3. Te imprime los nombres ya listos. Cópialos en `js/content.js`.

El script las convierte a JPG, las reduce de tamaño y **les borra la ubicación GPS**
(las fotos del iPhone llevan dentro dónde se hicieron, y el repositorio es público).

## La pantalla de entrada (el corazón)

Al abrir el enlace no ve la historia: ve su nombre, un corazón latiendo y
"toca el corazón". Al tocarlo, una barra de carga **le toma el pelo** antes de
dejarla pasar. Los mensajes se cambian en `js/content.js`, en `entrada.mensajes`:

```js
{ hasta: 62,  texto: "cargando…" },
{ hasta: 41,  texto: "Otra vez" },        // ← la barra RETROCEDE, esa es la broma
{ hasta: 78,  texto: "Un poquito más" },
{ hasta: 100, texto: "¡La última vez!" }
```

`hasta` es a qué porcentaje llega la barra. Puedes poner los que quieras.

## El sobre

El capítulo de tipo `sobre` sale cerrado, con un lacre rojo. Ella lo toca, la
solapa se abre y la carta sale deslizándose. En `js/content.js` controlas lo que
pone el lacre (`sello`), los párrafos y la frase destacada del final (`cierre`).

## Cambiar el estilo

Una palabra en `js/content.js`:

```js
tema: "noche",   // fondo oscuro, cinematográfico
tema: "papel",   // fondo crema tipo carta
```

## Lo que se imprime en papel

Todo está en **un solo archivo**, `imprimir.html`: la tarjeta del QR y los dos
vales. Está junto para que un texto no acabe en dos sitios distintos y se
contradigan (ya pasó una vez).

Para regenerar el PDF después de cambiar algo:

```sh
bash tools/generar-pdf.sh
```

Genera `regalos-para-imprimir.pdf`: un A4 exacto con las tres piezas en cuartos
de 105 × 148,5 mm (A6), listo para que lo corten y plastifiquen. Las
tipografías van incrustadas y el dibujo de cada vale es SVG, así que imprime
nítido a cualquier tamaño.

**Qué pedir en la papelería:** impresión en color a sangre (sin márgenes) en
A4, o en A3 recortado a A4. Que corten por las dos líneas centrales — hay
marcas en los bordes — y que plastifiquen las tres piezas. La cuarta esquina
va vacía.

## Añadir música

1. Guarda la canción en `audio/` (`.m4a` o `.mp3`).
2. En `js/content.js`: `musica: "audio/cancion.m4a"`.

Aparecerá un botón ♪ discreto abajo a la derecha. **No sonará sola**: iOS no lo
permite hasta que ella toque el botón. Si nunca lo toca, la web funciona igual.

---

## Comprobar que todo se puede tocar

```sh
bash tools/comprobar.sh
```

Abre la web en el motor de Safari y comprueba que nada oculto ocupe sitio y que
el lacre del sobre y los libros reciban el toque. Merece la pena pasarlo antes
de publicar: una vez una capa invisible dejó toda la web sin poder pulsarse.

## Publicar los cambios

```sh
git add -A && git commit -m "actualizo contenido" && git push
```

En menos de un minuto está actualizado en la URL pública.

---

## Cómo está montado

| Archivo | Qué es |
|---|---|
| `js/content.js` | **Todo el contenido.** Lo tuyo. |
| `index.html` | Esqueleto. Casi nunca hay que tocarlo. |
| `css/styles.css` | Colores, tipografías, animaciones. |
| `js/main.js` | El motor que pinta los capítulos. |
| `imprimir.html` | La hoja A4 con el QR y los dos vales. |
| `tools/` | Scripts de fotos y de QR. |

### Tipos de capítulo disponibles

`portada` · `texto` · `foto` · `fotos` (mosaico) · `cita` · `contador` ·
`lista` · `cielo` (mapa de estrellas) · `carta` (texto normal) ·
`sobre` (la que se abre) · `libreria` (los regalos) · `final`

### La librería

Cada libro del estante es un regalo. Ella toca un lomo, el libro se abre por la
mitad y dentro está escrito el regalo. En `content.js`:

```js
{ lomo: "No perder la página", que: "Un separador de libros" }
```

`lomo` es lo que se lee en el canto del libro **antes** de abrirlo: no debe
desvelar el regalo. `que` es lo que aparece dentro. Puedes añadir `nota` para
una línea en cursiva, y `color` si quieres elegir el color del libro.

También existe el tipo `regalos`, que enseña lo mismo como vales de ticket, por
si algún día prefieres esa versión.

### El capítulo del cielo

Lleva el mapa de estrellas de Granada del 8 de febrero de 2021. El capítulo se
funde a negro porque el fondo de esa imagen es negro puro: si no, se vería el
cuadrado recortado contra el fondo de la web. El texto lo escribe la web, no va
dentro de la imagen, así que puedes cambiarlo en `content.js` sin rehacer nada.

Se pueden repetir y reordenar libremente: el orden del archivo es el orden en
que ella los verá.
