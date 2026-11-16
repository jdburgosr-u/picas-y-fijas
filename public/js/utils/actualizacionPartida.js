import { solicitarDatos } from "./peticiones.js";

// Controla las consultas periódicas y descarta respuestas anteriores a una jugada.
export function configurarActualizacionPartida(
  ruta,
  recibirPartida,
  mostrarError
) {
  let temporizador;
  let numeroConsulta = 0;
  let pausado = false;
  let paginaAbierta = true;

  async function actualizar() {
    if (pausado || !paginaAbierta) return;
    clearTimeout(temporizador);
    const consultaActual = ++numeroConsulta;
    const esActual = () => consultaActual === numeroConsulta && paginaAbierta;
    let reintentar = true;
    try {
      const respuesta = await solicitarDatos(ruta);
      if (!esActual()) return;
      recibirPartida(respuesta.data);
      reintentar = respuesta.data.estado !== "terminado";
    } catch (error) {
      if (!esActual()) return;
      reintentar = error.status !== 404;
      mostrarError(error);
    } finally {
      if (esActual() && reintentar) temporizador = setTimeout(actualizar, 2000);
    }
  }

  function invalidarConsulta() {
    numeroConsulta++;
    clearTimeout(temporizador);
  }

  function pausar() {
    pausado = true;
    invalidarConsulta();
  }

  function reanudar() {
    pausado = false;
    return actualizar();
  }

  window.addEventListener("pagehide", () => {
    paginaAbierta = false;
    invalidarConsulta();
  });
  window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) {
      paginaAbierta = true;
      actualizar();
    }
  });

  return { actualizar, pausar, reanudar };
}
