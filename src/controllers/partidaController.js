const partidaModel = require('../models/partidaModel');
const { jugadores } = require('../../memoria.js');

class partidaController {
    
    static mostrarPartida(req, res) {
        const id = Number(req.params.id);
        const partida = partidaModel.getPartida(id);
        if (!partida) return res.status(404).json({ success: false, message: 'La partida no existe.' });

        return res.json({
             success: true,
            data: partida 
        });
    }
    static getPartidas(req, res) {
                const partidas = partidaModel.getPartidas();
                res.json({
                    succes: true,
                    message: 'Partidas obtenidas correctamente',
                    data: partidas,
                    count: partidas.length,
                });
    }

    static createPartidas(req, res) {
        const {creadorId, num} = req.body ?? {};


        const partida = partidaModel.crearPartida(creadorId, num);
        res.json({
            success: true,
            message: 'Partida creada correctamente',
            data: partidaModel.getPartida(partida.id),
        });
    }

    static unirsePartida(req, res) {
        const id = Number(req.params.id);
        const partida = partidaModel.buscarPartida(id);

        const { jugadorId, nombre, num } = req.body ?? {};
        const jugador = jugadores.get(jugadorId);

        if (!jugador) return res.status(401).json({ 
            success: false, 
            message: 'Primero inicia sesión.' 
        });

        if (partida.estado !== 'sin_completar') {
            return res.status(409).json({ success: false, message: 'La partida ya tiene dos jugadores.' });
        }


        partidaModel.unirsePartida(partida, jugadorId, num);
        return res.json({ success: true, data: partidaModel.getPartida(partida.id) });
    }

    static jugar(req, res) {
        const partida = partidaModel.buscarPartida(Number(req.params.id));
        if (!partida) return res.status(404).json({ success: false, message: 'La partida no existe.' });

        const { jugadorId, num } = req.body ?? {};

        if (jugadorId !== partida.creadorId && jugadorId !== partida.segundoId) {
            return res.status(403).json({ success: false, message: 'No perteneces a esta partida.' });
        }
        if (partida.estado !== 'en_juego') {
            return res.status(409).json({ success: false, message: 'La partida no está en juego.' });
        }
        if (partida.turno !== jugadorId) {
            return res.status(409).json({ success: false, message: 'No es tu turno.' });
        }


        const resultado = partidaModel.jugar(partida, jugadorId, num);
        return res.json({
            success: true,
            data: {
                ...resultado,
                partida: partidaModel.getPartida(partida.id),
            },
        });
        
    }
}

module.exports = partidaController;