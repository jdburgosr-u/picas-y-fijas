export function obtenerElemento(id) {
  return document.getElementById(id);
}

export function mostrarTexto(id, contenido) {
  const elemento = obtenerElemento(id);
  const texto = String(contenido);
  if (elemento.textContent !== texto) elemento.textContent = texto;
}

export function crearPlantilla(html) {
  const plantilla = document.createElement("template");
  plantilla.innerHTML = html;
  return plantilla.content.firstElementChild;
}
