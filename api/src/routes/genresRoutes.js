const { Router } = require("express");
const router = Router();
const genresControl = require("../controllers/genresController");

const {Videogame, Genres} = require("../db")

router.get('/', genresControl.getGenres);

module.exports = router;
