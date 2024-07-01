const express = require('express');
const router = express.Router();

let puestos = [];

router.post('/', (req, res) => {
    const { id, id_fila, tipo_puesto } = req.body;

    if (!id || !id_fila || !tipo_puesto) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevoPuesto = {
        id,
        id_fila,
        tipo_puesto
    };

    puestos.push(nuevoPuesto);

    res.json({
        message: 'Puesto agregado',
        data: nuevoPuesto
    });
});

router.get('/', (req, res) => {
    res.json(puestos);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const puesto = puestos.find(p => p.id === id);

    if (!puesto) {
        return res.status(404).json({ message: 'Puesto no encontrado' });
    }

    ['id_fila', 'tipo_puesto'].forEach(campo => {
        if (req.body[campo] !== undefined) {
            puesto[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Puesto actualizado',
        data: puesto
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const puestoIndex = puestos.findIndex(p => p.id === id);

    if (puestoIndex === -1) {
        return res.status(404).json({ message: 'Puesto no encontrado' });
    }

    const puestoEliminado = puestos.splice(puestoIndex, 1);

    res.json({
        message: 'Puesto eliminado',
        data: puestoEliminado
    });
});

module.exports = router;
