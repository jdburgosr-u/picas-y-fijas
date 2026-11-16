// Los números del juego son cadenas: convertir "0123" a Number perdería el cero.
function validarNumero(valor) {
    const numero = typeof valor === 'number' && Number.isInteger(valor) ? String(valor) : valor;
    if (typeof numero !== 'string' || !/^[0-9]{4}$/.test(numero)) {
        return { error: 'Escribe exactamente cuatro dígitos. Puedes comenzar con cero, como 0123.' };
    }
    if (new Set(numero).size !== 4) {
        return { error: 'Los cuatro dígitos deben ser diferentes.' };
    }
    return { numero };
}

module.exports = validarNumero;
