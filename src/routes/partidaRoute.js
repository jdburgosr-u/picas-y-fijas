const express = require('express');
const path = require('node:path');
const router = express.Router();
const partidaController = require('../controllers/partidaController');

router.get('/:id', partidaController.mostrarPartida);
router.put('/:id', partidaController.unirsePartida);
router.get('/', partidaController.getPartidas);
router.post('/', partidaController.createPartidas);
router.post('/:id/jugar', partidaController.jugar);
module.exports = router;