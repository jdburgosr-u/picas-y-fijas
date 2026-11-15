const{jugadores} = require('../../memoria.js');

class jugadorModel {
    static crearJugador(nombre) {
        const id = jugadores.size + 1;
        const jugador = {id,nombre};
        jugadores.set(id, jugador);
        return jugador;
    }
}

module.exports = jugadorModel;