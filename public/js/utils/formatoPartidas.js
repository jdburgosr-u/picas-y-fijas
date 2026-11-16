export function numeroPartida(id) {
  return "Partida #" + String(id).padStart(3, "0");
}

export function nombreEstado(estado) {
  const nombres = {
    sin_completar: "Abierta",
    en_juego: "En juego",
    terminado: "Finalizada",
  };
  return nombres[estado] ?? estado;
}
