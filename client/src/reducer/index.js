
const initialState = {
    videogames : [],
    allVideogames : [],
    genres: []
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames : action.payload
            }

        case 'FILTER_PER_GENRE':
            return{
                ...state,
                genres:action.payload
            }

        case 'FILTER_VIDEOGAME_PER_GENRE':
            const allVideogames2 = state.allVideogames;
            const createFilter = action.payload !== 'null' ? allVideogames2.filter(element => element.genres.includes(action.payload)):state.allVideogames
            return{
                ...state,
                videogames: createFilter
               }
        
                default:
            return state;
    }
}

export default rootReducer;