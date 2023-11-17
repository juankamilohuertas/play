/* entrada del nombre de personaje */
const nombrePersonajeInput = document.querySelector(".nombrePersonaje input");
const btnNombrePersonaje = document.querySelector(".btnNombrePersonaje");
const nombreOut = document.querySelector(".nombreP");
/* botones de seleccion de personaje */
const seleccionPersonajes = document.querySelectorAll(
  ".conte_seleccion_personaje"
)[0].children;
/* colores del cuerpo */
const colorPersonaje = document.querySelector(".colorPersonaje");
/* partes del cuerpo de personaje */
const contePersonaje = document.querySelectorAll(".contePersonaje")[0].children;
const conteJugador = document.querySelector(".contePersonaje");
const cabeza = document.querySelector(".cabeza");
const oreja = document.querySelector(".cabeza span");
const tronco = document.querySelector(".tronco");
const hombro = document.querySelector(".hombro");
const brazo = document.querySelector(".brazo");
const pierna = document.querySelector(".pierna");
/* boton de iniciar juego */
const btnIniciarJuego = document.querySelector(".btnIniciarJuego");

class Jugador {
  constructor(nombre, fisico, color) {
    this.nombre = nombre;
    this.fisico = fisico;
    this.color = color;
  }
  movimientosGravedad() {
    let altitud = 0;
    let latitud = 0;
    window.addEventListener("keydown", (e) => {
      if (e.key == "w") {
        altitud = -window.innerHeight + 150;
        conteJugador.style.transition =
          "all .5s cubic-bezier(1, 1, 0.77, 1.07)";
        conteJugador.style.transform = `translateY(${altitud}px)`;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key == "w") {
        altitud = 0;
        conteJugador.style.transition =
          "all .5s cubic-bezier(1, 1, 0.77, 1.07)";
        conteJugador.style.transform = `translateY(${altitud}px)`;
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "d") {
        latitud = window.innerWidth - 400;
        conteJugador.style.transition = ".3s linear";
        conteJugador.style.left = `${latitud}px`;
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key == "a") {
        latitud = 0;
        conteJugador.style.transition = ".3s linear";
        conteJugador.style.left = `${latitud}px`;
      }
    });
  }
  disparo() {
    window.addEventListener("mousemove", (e) => {
      console.log(e.y);
      hombro.style.transform = `rotate(${e.y}deg)`;
    });
  }
}

/* crear nombre */
btnNombrePersonaje.addEventListener("click", () => {
  nombreOut.textContent = nombrePersonajeInput.value;
  nombrePersonajeInput.value = "";
});

/* seleccion personaje cuadrado o redondo */
seleccionP = (fisico) => {
  if (fisico == "Circulo") {
    for (const i of contePersonaje) {
      i.style.borderRadius = "50%";
    }
    brazo.style.borderRadius = "50%";
    oreja.textContent = "🔘";
  } else {
    for (const i of contePersonaje) {
      i.removeAttribute("style");
    }
    brazo.removeAttribute("style");
    oreja.textContent = "🔳";
  }
};
let stiloP = "Cuadrado";
for (let i = 0; i < seleccionPersonajes.length; i++) {
  seleccionPersonajes[i].addEventListener("click", () => {
    stiloP = seleccionPersonajes[i].innerHTML;
    seleccionP(stiloP);
  });
}

/* seleccionando colores de personaje */
colorPersonaje.innerHTML = `<input type="color">`;
for (let i = 0; i < contePersonaje.length; i++) {
  contePersonaje[i].addEventListener("click", () => {
    const color = colorPersonaje.firstElementChild.value;
    contePersonaje[i].style.backgroundColor = color;
    contePersonaje[i].style.boxShadow = "0 0 5px #0d0";
  });
}

/* IniciarJuego */
btnIniciarJuego.addEventListener("click", () => {
  document
    .querySelector(".contenedorPadre")
    .removeChild(document.querySelector(".conteMenu"));
  btnIniciarJuego.style.display = "none";
  conteJugador.style.bottom = "0";
  conteJugador.style.left = "0";
  conteJugador.style.transition =
    "all .7s cubic-bezier(0.42,-0.08, 0.61, 0.95)";
  llamandoMovJugador();
});
/* ___________________________________________________________________________________________ */

/* SALA DE JUEGO */
/* creando objeto y llamando movimientos */
const llamandoMovJugador = () => {
  const personaje = new Jugador(nombreOut.textContent, stiloP, "color");
  personaje.movimientosGravedad();
  personaje.disparo();
};
