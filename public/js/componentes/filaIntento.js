import { crearPlantilla } from "../utils/elementos.js";

const plantillaFila = crearPlantilla(`
  <tr>
    <td class="attempt-index"></td>
    <td class="attempt-number"></td>
    <td><span class="score fixed"></span></td>
    <td><span class="score misplaced"></span></td>
  </tr>
`);

export function crearFilaIntento(intento, indice) {
  const fila = plantillaFila.cloneNode(true);
  fila.classList.toggle("is-winning", intento.fijas === 4);
  fila.querySelector(".attempt-index").textContent = String(
    indice + 1
  ).padStart(2, "0");
  fila.querySelector(".attempt-number").textContent = intento.num;
  fila.querySelector(".fixed").textContent = intento.fijas;
  fila.querySelector(".misplaced").textContent = intento.picas;
  return fila;
}
