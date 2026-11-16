export async function solicitarDatos(ruta, metodo = "GET", datos) {
  const opciones = { method: metodo, cache: "no-store" };
  if (datos !== undefined) {
    opciones.headers = { "Content-Type": "application/json" };
    opciones.body = JSON.stringify(datos);
  }
  const respuesta = await fetch(ruta, opciones);
  const resultado = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const error = new Error(
      resultado?.message ?? "No pudimos completar la solicitud."
    );
    error.status = respuesta.status;
    throw error;
  }
  if (!resultado) throw new Error("No pudimos leer la respuesta del servidor.");
  return resultado;
}
