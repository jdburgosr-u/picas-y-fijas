const express = require('express');



const juego = express();

juego.use(express.json());
const path = require('node:path');
juego.use(express.static(path.join(__dirname, '../public')));

juego.get('/', (req, res) => {
    res.json({
        message: 'API funcionando',
        version: '1.0.0',
        endpoint: {
            'POST /login': 'Registrar jugador',
            'POST /juego': 'Crear partida',
            'PUT /juego/:id': 'Unirse a una partida',
            'POST /juego/:id/jugar': 'Jugar',
            'GET /juego/:id': 'Ver estado de una partida',
            'GET /juego': 'Listar partidas',
        },
    });
});

const partidaRoute = require('./routes/partidaRoute');
juego.use('/juego', partidaRoute);

const jugadorRoute = require('./routes/jugadorRoute');
juego.use('/login', jugadorRoute);


const PORT = process.env.PORT || 3000;
juego.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});