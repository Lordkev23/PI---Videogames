
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../actions";
import Card from "./Card";


export default function(){
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames)
    console.log(allVideogames)
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

            {
                allVideogames?.map(element => 
                        (<div key={element.id}>
                            <Link to={'/home/'}>
                                <Card name={element.name} genres={element.genres} image={element.background_image} />
                            </Link>
                        </div>)
                    
                )
            }

            </div>
        </div>
        
    )

}