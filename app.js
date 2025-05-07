const plantList = document.getElementById("plant-list");
const saludo = document.getElementById("saludo");
const loginScreen = document.getElementById("login-screen");
const appContent = document.getElementById("app-content");
const searchInput = document.getElementById("search");

function iniciarSesion() {
  const username = document.getElementById("username-input").value.trim();
  if (username !== "") {
    saludo.textContent = `¡Hola, ${username}!`;
    loginScreen.style.display = "none";
    appContent.style.display = "block";
    mostrarPlantas(lista);
  }
}

function cerrarSesion() {
  loginScreen.style.display = "block";
  appContent.style.display = "none";
  document.getElementById("username-input").value = "";
  plantList.innerHTML = "";
  searchInput.value = "";
}

function buscarPorSintoma() {
  const filtro = searchInput.value.toLowerCase().trim();
  const resultados = lista.filter((p) =>
    p.name.toLowerCase().includes(filtro) ||
    p.uses.toLowerCase().includes(filtro) ||
    p.from.toLowerCase().includes(filtro) ||
    p.type.toLowerCase().includes(filtro)
  );
  mostrarPlantas(resultados);
}

function filterByType(tipo) {
  const resultados = tipo === "all" ? lista : lista.filter((p) => p.type === tipo);
  mostrarPlantas(resultados);
}

function mostrarPlantas(data) {
  plantList.innerHTML = "";
  data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "plant-card";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p><em>${p.scientific}</em></p>
      <p>${p.uses}</p>
      <p>Origen: ${p.from}</p>
      <p>Tipo: ${p.type}</p>
      <p><strong>Preparación:</strong> ${p.preparacion || "Información no disponible."}</p>
      <img src="${p.img}" alt="${p.name}" />
    `;

    const audioBtn = document.createElement("button");
    audioBtn.className = "audio-button";
    audioBtn.innerHTML = `<i class="fa fa-volume-up"></i> Escuchar`;
    audioBtn.onclick = () => speak(
      p.name,
      p.uses,
      p.scientific,
      p.from,
      p.type,
      p.preparacion
    );

    card.appendChild(audioBtn);
    plantList.appendChild(card);
  });
}

function speak(name, uses, scientific, from, type, preparation) {
  let text = `${name}, también conocida como: ${scientific}. `;
  text += `Se utiliza para: ${uses}. `;
  text += `Originaria de: ${from}. Tipo: ${type}. `;
  if (preparation && preparation.trim() !== "") {
    text += `Atención. Método de preparación: ${preparation}.`;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  speechSynthesis.speak(utterance);
}

// Simulación de base de datos (agrega tus plantas aquí)
const lista = [
  {
    name: "Hinojo",
    scientific: "Foeniculum vulgare",
    uses: "Atraer éxito comercial y limpieza financiera",
    from: "Mediterráneo",
    type: "mágica",
    preparacion: "Infusión de semillas",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Foeniculum_vulgare_005.JPG"
  },
  {
    name: "Mandrágora",
    scientific: "Mandragora officinarum",
    uses: "Sueños proféticos y protección poderosa",
    from: "Europa medieval",
    type: "mágica",
    preparacion: "",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Mandragora_autumnalis2.jpg"
  },
  {

   name: "Azahar",

  scientific: "Citrus aurantium",

  from: "Mediterráneo",

  type: "calmante espiritual",

  uses: "Relaja, reconforta y da serenidad emocional profunda.",

  howToUse: "Infusión de flores de azahar o aceites esenciales aromáticos.",

  img: "https://aceitecsb.com/wp-content/uploads/2018/07/flor-de-azahar-717x423.jpg"

},


{

  name: "Amalaki (Grosella India)",

  scientific: "Phyllanthus emblica",

  from: "Himalaya (India y Nepal)",

  type: "medicinal y ancestral",

  uses: "Fuente potente de vitamina C natural. Rejuvenecedor en medicina Ayurveda.",

  howToUse: "Consumir en polvo o jugo natural para fortalecer inmunidad y vitalidad.",

  img: "https://m.media-amazon.com/images/I/61SWM5qGaTL.jpg"

},

{

  name: "Banksia",

  scientific: "Banksia integrifolia",

  from: "Australia",

  type: "energético",

  uses: "Símbolo de renovación en culturas aborígenes. Refuerza la autoestima.",

  howToUse: "Usar en esencias florales para tratamientos emocionales o energía vital.",

  img: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Banksia_coccinea_AD_MB.jpg"

},

{

  name: "Moringa Estrella",

  scientific: "Moringa stenopetala",

  from: "África Oriental (Etiopía, Kenia)",

  type: "medicinal",

  uses: "Antioxidante potente, regula azúcar en sangre y mejora defensas naturales.",

  howToUse: "Consumir hojas frescas en ensaladas o como polvo en batidos verdes.",

  img: "https://m.media-amazon.com/images/I/71bm5mBNPEL.jpg"

},

{

  name: "Cordyceps",

  scientific: "Ophiocordyceps sinensis",

  from: "Himalaya",

  type: "energético y espiritual",

  uses: "Incrementa energía física y resistencia. Usado en rituales tibetanos antiguos.",

  howToUse: "Tomar extracto en polvo o en cápsulas para aumentar vitalidad y enfoque.",

  img: "https://i.herbalreality.com/wp-content/uploads/2022/01/21124416/Ophiocordyceps-sinensis-cordyceps-fungus-nature-moss-scaled.jpg"

},
  {
name: "Pasiflora",

  scientific: "Passiflora incarnata",

  from: "América",

  type: "calmante emocional",

  uses: "Calma nervios, combate insomnio y ayuda en momentos de crisis emocional.",

  howToUse: "Infusión de flores y hojas secas antes de dormir.",

  img: "https://i.blogs.es/cb3035/stephane-juban-f6gia410wbm-unsplash/1366_2000.jpeg"

},

{

      name: "Rosa Damascena",

  scientific: "Rosa damascena",

  from: "Oriente Medio",

  type: "fortaleza emocional",

  uses: "Abre el corazón, reduce duelo emocional y aporta paz interna.",

  howToUse: "Infusión de pétalos o uso de aceite esencial.",

  img: "https://www.lasaponaria.es/img/cms/rosa_damascena_003.jpg"

},

{

  name: "Tilo",

  scientific: "Tilia platyphyllos",

  from: "Europa",

  type: "tranquilidad emocional",

  uses: "Calma agitación, nerviosismo y ayuda a dormir serenamente.",

  howToUse: "Infusión de flores secas antes de dormir.",

  img: "https://www.terzaluna.com/image/catalog/blog/tiglio/tiglio.jpg"

},

{

  name: "Manzanilla",

  scientific: "Matricaria chamomilla",

  from: "Europa y Asia",

  type: "calmante emocional",

  uses: "Relajante ligero, reduce tensión emocional y mejora digestión nerviosa.",

  howToUse: "Infusión clásica de flores secas.",

  img: "https://media.admagazine.com/photos/6486ce9afa2d32627ec10acf/master/pass/manzanilla-para-plantas.jpg"


},

{

   name: "Alfalfa",

  scientific: "Medicago sativa",

  from: "Asia Central",

  type: "nutricional y energético",

  uses: "Fuente rica en vitaminas y minerales, fortalece la sangre y la energía vital.",

  howToUse: "Consumir brotes frescos o hacer infusión de hojas secas.",

  img: "https://inaturalist-open-data.s3.amazonaws.com/photos/435568272/original.jpg"

},

{

  name: "Malva",

  scientific: "Malva sylvestris",

  from: "Europa, norte de África y Asia",

  type: "medicinal",

  uses: "Alivia irritaciones de garganta, inflamaciones internas y heridas externas.",

  howToUse: "Infusión de flores y hojas, o cataplasmas para uso externo.",

  img: "https://www.thecolvinco.com/es/blog/wp-content/uploads/2017/09/tf-ma-1-01-1200x900.jpg"

}, 
  {
    name: "Yohimbe",

  scientific: "Pausinystalia johimbe",

  from: "África occidental",

  type: "energético",

  benefits: ["circulación", "vitalidad"],

  uses: "Tónico ancestral afrodisíaco, mejora la circulación y el rendimiento físico.",

  img: "https://t4.ftcdn.net/jpg/06/32/31/03/360_F_632310314_fcjnUSiu8jgwUjOF0NmNoL0vuRwX5WDn.jpg"

},

{

  name: "Ocotillo",

  scientific: "Fouquieria splendens",

  from: "Desierto del norte de México y EE.UU.",

  type: "ancestral",

  benefits: ["energía femenina", "circulación"],

  uses: "Usado por pueblos nativos como regulador menstrual y para mejorar la energía de las mujeres.",

  img:”https://www.ethnoherbalist.com/wp-content/uploads/2016/02/ocotillo-flower.jpg"

},

{

  name: "Catuaba",

  scientific: "Erythroxylum catuaba",

  from: "Brazil (Amazonas)",

  type: "energético",

  benefits: ["vitalidad", "memoria"],

  uses: "Tónico cerebral y afrodisíaco tradicional brasileño, mejora el ánimo, memoria y energía.",

  img: "https://album.mediaset.es/eimg/2018/02/16/o5QKsmtDzyYjyiJ7Nvay01.jpg?w=1200"

}

  
];

window.onload = () => {
  mostrarPlantas(lista);
};
