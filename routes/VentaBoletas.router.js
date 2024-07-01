const express = require('express');
const router = express.Router();

let ventas = [];

router.post('/', (req, res) => {
    const { id, id_cliente, id_empleado } = req.body;

    if (!id || !id_cliente || !id_empleado) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevaVenta = {
        id,
        id_cliente,
        id_empleado
    };

    ventas.push(nuevaVenta);

    res.json({
        message: 'Venta agregada',
        data: nuevaVenta
    });
});

router.get('/', (req, res) => {
    res.json(ventas);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const venta = ventas.find(v => v.id === id);

    if (!venta) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    ['id_cliente', 'id_empleado'].forEach(campo => {
        if (req.body[campo] !== undefined) {
            venta[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Venta actualizada',
        data: venta
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ventaIndex = ventas.findIndex(v => v.id === id);

    if (ventaIndex === -1) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const ventaEliminada = ventas.splice(ventaIndex, 1);

    res.json({
        message: 'Venta eliminada',
        data: ventaEliminada
    });
});

module.exports = router;
