import axios from 'axios';

//connection between front and back
export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogamesRoutes');
        console.log(json.data)
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
            
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/genresRoutes');
        // console.log(json.data)
        const filerGenres = json.data.map(element => element.name)
        console.log(filerGenres)
        return dispatch({
            type: 'FILTER_PER_GENRE',
            payload: filerGenres
            
        })
    }
}

export function filterVideogamesPerGenre(payload){
    return{
        type:'FILTER_VIDEOGAME_PER_GENRE',
        payload
    }
}


export function filterVideogamesPerStatus(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
       
}