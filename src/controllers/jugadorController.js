const jugadorModel = require("../models/jugadorModel");

class jugadorController {
  static crearJugador(req, res) {
    try {
      const { nombre } = req.body;
      const jugador = jugadorModel.crearJugador(nombre);
      res.status(201).json({
        success: true,
        message: "Jugador creado correctamente",
        data: jugador,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear el jugador",
        error: error.message,
      });
    }
  }
}

module.exports = jugadorController;
