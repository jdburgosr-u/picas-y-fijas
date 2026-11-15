const { randomInt } = require('node:crypto');
const { jugadores, partidas } = require('../../memoria.js');

class partidaModel {
    static buscarPartida(id) {
     return partidas.get(id);
    }
  static getPartidas() {
    return Array.from(partidas.values(), (partida) => partidaModel.getPartida(partida.id));
  }
  static crearPartida(creadorId, num) {
    const id = partidas.size + 1;
    const numero = num;
    const partida = {
            id,
            creadorId,
            numero: num,
            segundoId: null,
            segundoNumero: null,
            turno: null,
            ganador: null,
            estado: 'sin_completar',
        };
    partidas.set(id, partida);
    return partida;
  }
    static getPartida(id) {
        const partida = partidas.get(id);
        if (!partida) return null;

        return {
            id: partida.id,
            creadorId: partida.creadorId,
            creador: jugadores.get(partida.creadorId)?.nombre ?? '-',
            segundo: jugadores.get(partida.segundoId)?.nombre ?? '-',
            estado: partida.estado,
            turno: jugadores.get(partida.turno)?.nombre ?? '-',
            ganador: jugadores.get(partida.ganador)?.nombre ?? '-',
        };
    }

}

module.exports = partidaModel;