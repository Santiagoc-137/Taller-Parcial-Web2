const express = require('express');
const router = express.Router();

let peliculas = [];

router.post('/', (req, res) => {
    const { id, nombre, sinopsis, clasificacion, genero, idioma } = req.body;

    if (!id || !nombre || !sinopsis || !clasificacion || !genero || !idioma) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevaPelicula = {
        id,
        nombre,
        sinopsis,
        clasificacion,
        genero,
        idioma
    };

    peliculas.push(nuevaPelicula);

    res.json({
        message: 'Película agregada',
        data: nuevaPelicula
    });
});

router.get('/', (req, res) => {
    res.json(peliculas);
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);

    if (!pelicula) {
        return res.status(404).json({ message: 'Película no encontrada' });
    }

    const camposActualizables = ['nombre', 'sinopsis', 'clasificacion', 'genero', 'idioma'];

    camposActualizables.forEach(campo => {
        if (req.body[campo] !== undefined) {
            pelicula[campo] = req.body[campo];
        }
    });

    res.json({
        message: 'Película actualizada',
        data: pelicula
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const peliculaIndex = peliculas.findIndex(p => p.id === id);

    if (peliculaIndex === -1) {
        return res.status(404).json({ message: 'Película no encontrada' });
    }

    const peliculaEliminada = peliculas.splice(peliculaIndex, 1);

    res.json({
        message: 'Película eliminada',
        data: peliculaEliminada
    });
});



module.exports = router;
