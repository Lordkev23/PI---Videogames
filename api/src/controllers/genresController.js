require('dotenv').config();
const {Genres} = require("../db");
const {API_KEY} = process.env;

const axios = require('axios');

const getGenres = async(req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genresEach = genresApi.data.results.map(element => element.name)
    genresEach.forEach(element => {
        Genres.findOrCreate({
            where: {name: element}
        })
    });
    const allGenres = await Genres.findAll();
    res.send(allGenres);
};


module.exports = { getGenres };