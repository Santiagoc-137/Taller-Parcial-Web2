const express = require('express');
const router = express.Router();

let empleados = [];

router.post('/', (req, res) => {
    const { id, nombre, apellido, metodo_pago } = req.body;

    if (!id || !nombre || !apellido || !metodo_pago) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevoEmpleado = {
        id,
        nombre,
        apellido,
        metodo_pago
    };

    empleados.push(nuevoEmpleado);

    res.json({
        message: 'Empleado agregado',
        data: nuevoEmpleado
    });
});

router.get('/', (req, res) => {
    res.json(empleados);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const empleado = empleados.find(e => e.id === id);

    if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    ['nombre', 'apellido', 'metodo_pago'].forEach(campo => {
        if (req.body[campo] !== undefined) {
            empleado[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Empleado actualizado',
        data: empleado
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const empleadoIndex = empleados.findIndex(e => e.id === id);

    if (empleadoIndex === -1) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    const empleadoEliminado = empleados.splice(empleadoIndex, 1);

    res.json({
        message: 'Empleado eliminado',
        data: empleadoEliminado
    });
});

module.exports = router;
