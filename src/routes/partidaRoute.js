const express = require('express');
const path = require('node:path');
const router = express.Router();
const partidaController = require('../controllers/partidaController');

router.get('/:id', partidaController.mostrarPartida);
router.get('/', partidaController.getPartidas);
router.post('/', partidaController.createPartidas);
module.exports = router;