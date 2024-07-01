const express = require('express');
const rutas = require('./routes')
const TallerParcial = express();
const port = 3000;
TallerParcial.use(express.json());

rutas(TallerParcial);

TallerParcial.listen(port, () => {
    console.log(`El servidor funciona correctamente en http://localhost:${port}`);
})