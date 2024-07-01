const express = require('express');
const router = express.Router();

let salas = [];

router.post('/', (req, res) => {
    const { id, id_pelicula, numero_sala, total_personas } = req.body;

    if (!id || !id_pelicula || !numero_sala || !total_personas) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevaSala = {
        id,
        id_pelicula,
        numero_sala,
        total_personas
    };

    salas.push(nuevaSala);

    res.json({
        message: 'Sala creada',
        data: nuevaSala
    });
});

router.get('/', (req, res) => {
    res.json(salas);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sala = salas.find(s => s.id === id);

    if (!sala) {
        return res.status(404).json({ message: 'Sala no encontrada' });
    }

    ['id_pelicula', 'numero_sala', 'total_personas'].forEach(campo => {
        if (req.body[campo] !== undefined) {
            sala[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Sala actualizada',
        data: sala
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const salaIndex = salas.findIndex(s => s.id === id);

    if (salaIndex === -1) {
        return res.status(404).json({ message: 'Sala no encontrada' });
    }

    const salaEliminada = salas.splice(salaIndex, 1);

    res.json({
        message: 'Sala eliminada',
        data: salaEliminada
    });
});

module.exports = router;
