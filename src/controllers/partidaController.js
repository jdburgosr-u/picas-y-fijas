const partidaModel = require("../models/partidaModel");
const { jugadores } = require("../../memoria.js");
const validarNumero = require("../utils/validarNumero");

class partidaController {
  static mostrarPartida(req, res) {
    const id = Number(req.params.id);
    const partida = partidaModel.getPartida(id, Number(req.query.jugadorId));
    if (!partida)
      return res
        .status(404)
        .json({ success: false, message: "La partida no existe." });

    return res.json({
      success: true,
      data: partida,
    });
  }

  static getPartidas(req, res) {
    try {
      const partidas = partidaModel.getPartidas();
      res.json({
        succes: true,
        message: "Partidas obtenidas correctamente",
        data: partidas,
        count: partidas.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener las partidas",
        error: error.message,
      });
    }
  }

  static createPartidas(req, res) {
    const { creadorId, num, nombre } = req.body ?? {};
    if (!jugadores.has(creadorId)) {
      return res
        .status(401)
        .json({ success: false, message: "Primero registra el jugador." });
    }
    if (
      nombre !== undefined &&
      (typeof nombre !== "string" ||
        !nombre.trim() ||
        nombre.trim().length > 60)
    ) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la partida debe tener entre 1 y 60 caracteres.",
      });
    }

    const { numero, error } = validarNumero(num);
    if (error) return res.status(400).json({ success: false, message: error });

    const partida = partidaModel.crearPartida(
      creadorId,
      numero,
      nombre?.trim()
    );
    res.json({
      success: true,
      message: "Partida creada correctamente",
      data: partidaModel.getPartida(partida.id, creadorId),
    });
  }

  static unirsePartida(req, res) {
    const id = Number(req.params.id);
    const partida = partidaModel.buscarPartida(id);
    if (!partida)
      return res
        .status(404)
        .json({ success: false, message: "La partida no existe." });

    const { jugadorId, nombre, num } = req.body ?? {};
    const jugador = jugadores.get(jugadorId);

    if (!jugador)
      return res.status(401).json({
        success: false,
        message: "Primero inicia sesión.",
      });

    if (jugadorId === partida.creadorId) {
      return res.status(409).json({
        success: false,
        message: "No puedes unirte a tu propia partida.",
      });
    }

    if (partida.estado !== "sin_completar") {
      return res.status(409).json({
        success: false,
        message: "La partida ya tiene dos jugadores.",
      });
    }

    const { numero, error } = validarNumero(num);
    if (error) return res.status(400).json({ success: false, message: error });

    partidaModel.unirsePartida(partida, jugadorId, numero);
    return res.json({
      success: true,
      data: partidaModel.getPartida(partida.id, jugadorId),
    });
  }

  static jugar(req, res) {
    const partida = partidaModel.buscarPartida(Number(req.params.id));
    if (!partida)
      return res
        .status(404)
        .json({ success: false, message: "La partida no existe." });

    const { jugadorId, num } = req.body ?? {};

    if (jugadorId !== partida.creadorId && jugadorId !== partida.segundoId) {
      return res
        .status(403)
        .json({ success: false, message: "No perteneces a esta partida." });
    }
    if (partida.estado !== "en_juego") {
      return res
        .status(409)
        .json({ success: false, message: "La partida no está en juego." });
    }
    if (partida.turno !== jugadorId) {
      return res
        .status(409)
        .json({ success: false, message: "No es tu turno." });
    }

    const { numero, error } = validarNumero(num);
    if (error) return res.status(400).json({ success: false, message: error });

    if (partidaModel.yaIntentado(partida, jugadorId, numero)) {
      return res.status(409).json({
        success: false,
        message:
          "Ya intentaste ese número en esta partida. Prueba uno diferente.",
      });
    }
    const resultado = partidaModel.jugar(partida, jugadorId, numero);
    return res.json({
      success: true,
      data: {
        ...resultado,
        partida: partidaModel.getPartida(partida.id, jugadorId),
      },
    });
  }
}

module.exports = partidaController;
