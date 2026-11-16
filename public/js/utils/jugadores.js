import { mostrarTexto } from "./elementos.js";

export function leerJugador() {
  try {
    const jugador = JSON.parse(sessionStorage.getItem("jugador"));
    return Number.isSafeInteger(jugador?.id) && jugador.id > 0 ? jugador : null;
  } catch {
    return null;
  }
}

export function guardarJugador(jugador) {
  sessionStorage.setItem("jugador", JSON.stringify(jugador));
}

export function mostrarJugador(jugador) {
  mostrarTexto("nombre-jugador", jugador.nombre);
  mostrarTexto("avatar", jugador.nombre.charAt(0).toUpperCase());
}
