const express = require('express');
const router = express.Router();
let clientes = [];
router.use(express.json());

router.post('/', (req, res) => {
    const { id, nombre, apellido, telefono } = req.body;
    
    if (!id || !nombre || !apellido || !telefono) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevoCliente = {
        id,
        nombre,
        apellido,
        telefono
    };

    clientes.push(nuevoCliente);

    res.json({
        message: 'Cliente agregado',
        data: nuevoCliente
    });
});

router.get('/', (req, res) => {
    res.json(clientes);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, apellido, telefono } = req.body;

    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    if (nombre !== undefined) cliente.nombre = nombre;
    if (apellido !== undefined) cliente.apellido = apellido;
    if (telefono !== undefined) cliente.telefono = telefono;

    res.json({
        message: 'Cliente actualizado',
        data: cliente
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex === -1) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const clienteEliminado = clientes.splice(clienteIndex, 1);

    res.json({
        message: 'Cliente eliminado',
        data: clienteEliminado
    });
});

module.exports = router;
