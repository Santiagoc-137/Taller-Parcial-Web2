const express = require('express');
const Peliculas_router = require('./Peliculas.router');
const Salas_router = require('./Salas.router');
const Filas_router = require('./Filas.router');
const Puestos_router = require('./Puestos.router');
const DetalleVenta_router = require('./DetalleVentas.router');
const Venta_router = require('./VentaBoletas.router');
const Empleados_router = require('./Empleados.router');
const Clientes_router = require('./Clientes.router');



function rutas(TallerParcial){
    const router = express.Router();
    TallerParcial.use('/', router)   
    router.use('/Peliculas', Peliculas_router)
    router.use('/Salas', Salas_router)
    router.use('/Filas', Filas_router)
    router.use('/Puestos', Puestos_router)
    router.use('/DetalleVentas', DetalleVenta_router)
    router.use('/VentaBoletas', Venta_router)
    router.use('/Empleados', Empleados_router)
    router.use('/Clientes', Clientes_router)

}

module.exports = rutas
