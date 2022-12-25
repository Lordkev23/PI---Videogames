
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../actions";
import Card from "./Card";
import Paginated from "./Paginated";


export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfTheLastVideogame = currentPage * videogamesPerPage
    const indexOfTheFirstVideogame = indexOfTheLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfTheFirstVideogame, indexOfTheLastVideogame)

    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    // console.log(allVideogames)
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <Link to = '/videogames'>Create Videogame</Link>
            <h1>The Videogame is Coming</h1>
            <button onClick={event => {handleClick(event)}}>Reload All Videogames</button>
            <div>

                <select>
                    <option value = 'All'>All</option>
                    <option value = 'Genre'>Genre</option>
                    <option value = 'Existing'>Existing</option>
                    <option value = 'Created'>Created</option>
                </select>

                <select>
                    <option value = 'Up'>Up</option>
                    <option value = 'Down'>Down</option>
                    <option value = 'Rating'>Rating</option>
                </select>

            <Paginated
                videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginated={paginated}
            />

            {currentVideogames && currentVideogames.map(element => 
                        (<div key={element.id}>
                            <Link to={'/home/'}>
                                <Card name={element.name} genres={element.genres} image={element.background_image} />
                            </Link>
                        </div>)
                )
            }
            {/* {console.log(currentVideogames)} */}

            </div>
        </div>
        
    )

}