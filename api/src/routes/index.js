const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');

const genresRouter = require("./genresRoutes");
const videogameRouter = require("./videogameRoutes");
const videogamesRouter = require("./videogamesRoutes");

//  const Videogame = require('../models/Videogame');
//  const Genres = require('../models/Genres');

const {Videogame, Genres} = require("../db")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.use("/genresRoutes", genresRouter);
router.use("/videogamesRoutes", videogamesRouter);
router.use("/videogameRoutes", videogameRouter);

module.exports = router;
