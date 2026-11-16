export function leerNumero(campo) {
  const numero = campo.value;
  campo.removeAttribute("aria-invalid");
  if (!/^[0-9]{4}$/.test(numero) || new Set(numero).size !== 4) {
    campo.setAttribute("aria-invalid", "true");
    campo.focus();
    throw new Error(
      "Escribe cuatro dígitos diferentes. Puedes comenzar con cero."
    );
  }
  return numero;
}

export function numeroIntentado(historial, numero) {
  return historial.some((intento) => intento.num === numero);
}
