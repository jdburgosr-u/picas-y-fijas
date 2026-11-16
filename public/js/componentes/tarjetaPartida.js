import { crearPlantilla } from "../utils/elementos.js";
import { numeroPartida, nombreEstado } from "../utils/formatoPartidas.js";

const plantillaTarjeta = crearPlantilla(`
  <li class="match-card">
    <div class="match-card-top">
      <span class="game-number"></span>
      <span class="badge"></span>
    </div>
    <h2></h2>
    <p class="match-caption"></p>
    <div class="match-actions">
      <button class="button secondary" type="button">Entrar</button>
    </div>
  </li>
`);

export function crearTarjetaPartida(partida, entrarPartida) {
  const tarjeta = plantillaTarjeta.cloneNode(true);
  tarjeta.querySelector(".game-number").textContent = numeroPartida(partida.id);
  const etiquetaEstado = tarjeta.querySelector(".badge");
  etiquetaEstado.textContent = nombreEstado(partida.estado);
  etiquetaEstado.dataset.state = partida.estado;
  const titulo = tarjeta.querySelector("h2");
  titulo.textContent = partida.nombre || numeroPartida(partida.id);
  titulo.title = titulo.textContent;
  tarjeta.querySelector(".match-caption").textContent =
    "Creada por " + partida.creador;
  tarjeta.querySelector("button").onclick = () => entrarPartida(partida);
  return tarjeta;
}
