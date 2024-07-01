const express = require('express');
const router = express.Router();

let detalleVenta = [];

router.post('/', (req, res) => {
    const nuevoDetalle = {
        id_detalle: req.body.id_detalle,
        id_venta: req.body.id_venta,
        id_pelicula: req.body.id_pelicula,
        precio: req.body.precio
    };
    detalleVenta.push(nuevoDetalle);
    res.json({
        message: 'Detalle de venta agregado',
        data: nuevoDetalle
    });
});

router.get('/', (req, res) => {
    res.json(detalleVenta);
});
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const detalle = detalleVenta.find(detalle => detalle.id_detalle === id);
  
  if (!detalle) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado' });
  }

  ['id_detalle', 'id_venta', 'id_pelicula', 'precio'].forEach(campo => {
      if (req.body[campo] !== undefined) {
          detalle[campo] = req.body[campo];
      }
  });

  res.json({
      message: 'Detalle de venta actualizado',
      data: detalle
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const detalleIndex = detalleVenta.findIndex(detalle => detalle.id_detalle === id);

  if (detalleIndex === -1) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado' });
  }

  const detalleEliminado = detalleVenta.splice(detalleIndex, 1);

  res.json({
      message: 'Detalle de venta eliminado',
      data: detalleEliminado
  });
});

module.exports = router;
