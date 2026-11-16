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


}

module.exports = partidaController;