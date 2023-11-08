let paginaActual = 1;
let paginaInicial = 1;
let paginaFinal = 1;

const getData = async (pagina, genero) => {
  let URL = ``;
  if (genero === null) {
    URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
  } else {
    URL = `https://rickandmortyapi.com/api/character?page=${pagina}&gender=${genero}`;
  }
  const response = await fetch(URL);
  const json = await response.json();
  printData(json);
  updateButtons();
};
getData(paginaActual, null);

const personajesTotal = document.getElementById("personajesTotal");
const personajesPaginaActual = document.getElementById(
  "personajesPaginaActual"
);
const personajes = document.getElementById("personajes");

const printData = async (arr) => {
  paginaFinal = arr.info.pages;

  personajesTotal.innerHTML = arr.info.count;
  personajesPaginaActual.innerHTML = arr.results.length;

  paginaInicialPagination.innerHTML = 1;
  paginaFinalPagination.innerHTML = arr.info.pages;
  paginaActualPagination.innerHTML = paginaActual;

  let card = "";
  arr.results.forEach((personaje) => {
    card =
      card +
      `
          <div>
            <div class="card">
                <div class="card-image">
                    <img src=${personaje.image} alt="">
                </div>
                <div class="card-content">
                    <p>Nombre: ${personaje.name}</p>
                    <p>Genero: ${personaje.gender}</p>
                    <p>Especies: ${personaje.species}</p>
                    <p>Estado: ${personaje.status}</p>
                    <p>Origen: ${personaje.origin.name}</p>
                    <p>Locación: ${personaje.location.name}</p>
                </div>
            </div>
        </div>
        `;
  });
  personajes.innerHTML = card;
};

//filtro de genero

const filtroTodos = document.getElementById("filtroTodos");
const filtroMujeres = document.getElementById("filtroMujeres");
const filtroHombres = document.getElementById("filtroHombres");
const filtroSinGenero = document.getElementById("filtroSinGenero");
const filtroDesconocido = document.getElementById("filtroDesconocido");

let filtroActual = null;

filtroTodos.addEventListener("click", () => {
  paginaActual = 1;
  filtroActual = null;
  getData(paginaActual, filtroActual);
});
filtroMujeres.addEventListener("click", () => {
  paginaActual = 1;
  filtroActual = "female";
  getData(paginaActual, filtroActual);
});
filtroHombres.addEventListener("click", () => {
  paginaActual = 1;
  filtroActual = "male";
  getData(paginaActual, filtroActual);
});
filtroSinGenero.addEventListener("click", () => {
  paginaActual = 1;
  filtroActual = "genderless";
  getData(paginaActual, filtroActual);
});
filtroDesconocido.addEventListener("click", () => {
  paginaActual = 1;
  filtroActual = "unknown";
  getData(paginaActual, filtroActual);
});

//paginacion

const botonPrimera = document.getElementById("botonPrimera");
const botonAnterior = document.getElementById("botonAnterior");
const botonSiguiente = document.getElementById("botonSiguiente");
const botonUltima = document.getElementById("botonUltima");

const paginaActualPagination = document.getElementById("paginaActual");
const paginaInicialPagination = document.getElementById("paginaInicial");
const paginaFinalPagination = document.getElementById("paginaFinal");

const updateButtons = () => {
  if (paginaActual === paginaInicial) {
    botonAnterior.disabled = true;
    botonPrimera.disabled = true;
  } else {
    botonAnterior.disabled = false;
    botonPrimera.disabled = false;
  }
  if (paginaActual === paginaFinal) {
    botonSiguiente.disabled = true;
    botonUltima.disabled = true;
  } else {
    botonSiguiente.disabled = false;
    botonUltima.disabled = false;
  }
};

botonSiguiente.addEventListener("click", () => {
  if (paginaActual < paginaFinal) {
    paginaActual += 1;
    getData(paginaActual, filtroActual);
  }
});

botonAnterior.addEventListener("click", () => {
  if (paginaActual > paginaInicial) {
    paginaActual -= 1;
    getData(paginaActual, filtroActual);
  }
});

botonPrimera.addEventListener("click", () => {
  if (paginaActual > paginaInicial) {
    paginaActual = paginaInicial;
    getData(paginaActual, filtroActual);
  }
});

botonUltima.addEventListener("click", () => {
  if (paginaActual < paginaFinal) {
    paginaActual = paginaFinal;
    getData(paginaActual, filtroActual);
  }
});
