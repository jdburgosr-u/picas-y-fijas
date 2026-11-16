import { obtenerElemento, mostrarTexto } from "./elementos.js";
import { numeroPartida, nombreEstado } from "./formatoPartidas.js";
import { crearTarjetaPartida } from "../componentes/tarjetaPartida.js";
import { crearFilaIntento } from "../componentes/filaIntento.js";

export function mostrarLista(partidas, entrar) {
  obtenerElemento("lista").replaceChildren(
    ...partidas
      .slice()
      .reverse()
      .map((partida) => crearTarjetaPartida(partida, entrar))
  );
  mostrarTexto("total-partidas", partidas.length);
  obtenerElemento("sin-partidas").hidden = partidas.length > 0;
}

function mostrarParticipante(prefijo, nombre, id, partida, jugador) {
  mostrarTexto(prefijo + "-nombre", id === null ? "Por llegar…" : nombre);
  mostrarTexto(
    prefijo + "-avatar",
    id === null ? "?" : nombre.charAt(0).toUpperCase()
  );
  mostrarTexto(prefijo + "-etiqueta", id === jugador.id ? "TÚ" : "RIVAL");
  const enTurno = id !== null && id === partida.turnoId;
  const tarjeta = obtenerElemento(prefijo + "-tarjeta");
  tarjeta.classList.toggle("is-current", enTurno);
  tarjeta.querySelector(".turn-dot").hidden = !enTurno;
}

function mostrarHistorial(historial) {
  mostrarTexto("cantidad-intentos", historial.length);
  obtenerElemento("sin-intentos").hidden = historial.length > 0;
  obtenerElemento("tabla-historial").hidden = historial.length === 0;
  obtenerElemento("historial").replaceChildren(
    ...historial.map(crearFilaIntento).reverse()
  );
}

export function mostrarPartida(partida, jugador) {
  obtenerElemento("carga").hidden = true;
  obtenerElemento("detalle").hidden = false;
  mostrarTexto("numero-partida", numeroPartida(partida.id));
  mostrarTexto("titulo", partida.nombre || numeroPartida(partida.id));
  const etiquetaEstado = obtenerElemento("estado");
  etiquetaEstado.textContent = nombreEstado(partida.estado);
  etiquetaEstado.dataset.state = partida.estado;
  const esperando = partida.estado === "sin_completar";
  obtenerElemento("historial-panel").hidden = esperando;
  obtenerElemento("detalle").classList.toggle("waiting", esperando);
  obtenerElemento("distribucion-juego").classList.toggle(
    "is-waiting",
    esperando
  );
  mostrarParticipante(
    "creador",
    partida.creador,
    partida.creadorId,
    partida,
    jugador
  );
  mostrarParticipante(
    "segundo",
    partida.segundo,
    partida.segundoId,
    partida,
    jugador
  );

  const miTurno = partida.turnoId === jugador.id;
  obtenerElemento("turno-panel").classList.toggle("is-your-turn", miTurno);
  if (esperando) mostrarTexto("turno", "Esperando al segundo jugador.");
  else if (partida.estado === "terminado")
    mostrarTexto("turno", "Partida finalizada.");
  else
    mostrarTexto(
      "turno",
      miTurno
        ? "Es tu turno, " + jugador.nombre + "."
        : "Turno de " + partida.turno + "."
    );
  obtenerElemento("ganador").hidden = partida.estado !== "terminado";
  mostrarTexto(
    "ganador",
    partida.ganadorId === jugador.id
      ? "¡Ganaste la partida!"
      : "Ganó " + partida.ganador + "."
  );

  mostrarHistorial(partida.historial);
}

export function mostrarConexion(error) {
  const mensaje = !error
    ? "Estado actualizado"
    : error.status === 404
    ? "Partida no disponible"
    : "Sin conexión. Reintentando…";
  mostrarTexto("conexion", mensaje);
  obtenerElemento("conexion").dataset.error = String(Boolean(error));
}
