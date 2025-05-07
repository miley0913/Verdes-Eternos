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
  }
];

window.onload = () => {
  mostrarPlantas(lista);
};
