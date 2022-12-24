require('dotenv').config();
const { Videogame, Genres } = require("../db");
const {API_KEY} = process.env;

const axios = require('axios');

const getVideogameId = async(req, res) => {
    const id = req.params.id;
    const videogamesAll = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const data = videogamesAll.data;
    if (id && id.includes("-")) {
        let videogameByDb = await Videogame.findOne({
          where: {
            id: id,
          },
          include:
            { model: Genres, through: { attributes: [] } },
            // { model: Platform, through: { attributes: [] } },
        
        });
    if (!videogameByDb) throw new Error("Error, Videogame not found");

    videogameByDb = JSON.stringify(videogameByDb);
    videogameByDb = JSON.parse(videogameByDb);

    videogameByDb.genres = videogameByDb.genres.map((gen) => gen.name);
    videogameByDb.platforms = videogameByDb.platforms.map((pl) => pl.name);

    return videogameByDb;
  }

    if(id){
        const game = {
            id: data.id,
            name: data.name,
            description: data.description,
            release_date: data.released,
            rating: data.rating,
            image: data.background_image,
            genres: data.genres.map((gen) => gen.name),
            platforms: data.parent_platforms.map((pl) => pl.platform.name),
          };
        
        res.status(200).send(game)
    }
}

module.exports = { getVideogameId };