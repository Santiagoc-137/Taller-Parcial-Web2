const express = require('express');
const router = express.Router();

let filas = [];

router.post('/', (req, res) => {
    const { id, cantidad_sillas, numero_fila } = req.body;

    if (!id || !cantidad_sillas || !numero_fila) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevaFila = {
        id,
        cantidad_sillas,
        numero_fila
    };

    filas.push(nuevaFila);

    res.json({
        message: 'Fila creada',
        data: nuevaFila
    });
});

router.get('/', (req, res) => {
    res.json(filas);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const fila = filas.find(f => f.id === id);

    if (!fila) {
        return res.status(404).json({ message: 'Fila no encontrada' });
    }

    const camposActualizables = ['id', 'cantidad_sillas', 'numero_fila'];

    camposActualizables.forEach(campo => {
        if (req.body[campo] !== undefined) {
            fila[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Fila actualizada',
        data: fila
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filaIndex = filas.findIndex(f => f.id === id);

    if (filaIndex === -1) {
        return res.status(404).json({ message: 'Fila no encontrada' });
    }

    const filaEliminada = filas.splice(filaIndex, 1);

    res.json({
        message: 'Fila eliminada',
        data: filaEliminada
    });
});

module.exports = router;
