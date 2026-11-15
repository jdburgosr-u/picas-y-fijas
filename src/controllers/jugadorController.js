const jugadorModel = require('../models/jugadorModel');

class jugadorController {
    
    static crearJugador(req, res) {
            const {nombre} = req.body;
            const jugador = jugadorModel.crearJugador(nombre);
            res.status(201).json({
                success: true,
                message: 'Jugador creado correctamente',
                data: jugador
            });
    }
}

module.exports = jugadorController;