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
