import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
    getVideogames, 
    filterVideogamesPerGenre,
    videogamesOrigin,
    sortVideogames,
    getGenres, 
    getGamesCreated
} from "../actions";
import Card from "./Card";
import Paginated from "./Paginated";
import CreateVideogame from "./CreateVideogame";
import SearchBar from "./SearchBar";
import styled from "styled-components";

const BotonColor = styled.button`
height: 50px;
width: 120px;
color:white;
background-color: #20be5d;
border-radius: 15%;
font-size: medium;
font-family: 'Times New Roman', Times, serif;
&:hover{
color:white;
background-color: #42f191;
border-radius: 15%;
font-size: large;
font-family: 'Times New Roman', Times, serif;
}
`


export default function Home(){
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.videogames_Global)
    const allGenres = useSelector((state) => state.genres_Global)
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfTheLastVideogame = currentPage * videogamesPerPage
    const indexOfTheFirstVideogame = indexOfTheLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfTheFirstVideogame, indexOfTheLastVideogame)
    const [render, setRender] = useState('')

    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    // console.log(allVideogames)

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    // function handleClick(event){
    //     event.preventDefault();
    //     dispatch(getVideogames());
    // }

     
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])
    const genreses = useSelector(state => state.genres_Global)
    const handleFilterGenres = (event) =>{
        dispatch(filterVideogamesPerGenre(event.target.value)); setCurrentPage(1)
        }
    function handleOriginFilter(event){
        dispatch(videogamesOrigin(event.target.value))
        setCurrentPage(1)
    }

    function handleAll(){
        dispatch(videogamesOrigin('All'))
        dispatch(sortVideogames('asc'))
    }

    function hadleSortVideogames(event){
        event.preventDefault();
        dispatch(sortVideogames(event.target.value))
        setRender(`Order ${event.target.value}`)
    }

    function handleComingVideogamesCreated(event){
        dispatch(getGamesCreated(event.target.value))
        setCurrentPage(1)
    }

    return(
        <div>
            <div>
            
                <div>
                    <SearchBar/>
                </div>

                <div>
                    <BotonColor onClick={event => handleAll(event)}>Load All Videogames</BotonColor>
                </div>

                <div>
                    <Link to = '/videogame'>
                        <button>Create Your Videogame 🎮</button>
                    </Link>
                </div>
                {/* <div>
                    <select onClick={handleFilterGenres}>
                                <option value='null'>Genres 🕹️</option>
                                {genreses&&genreses.map((i,key)=> 
                                        <option value={i} key={key}>{i}</option>)}
                        </select>
                </div> */}

                <div>
                    <select onChange={element => handleFilterGenres(element)}>
                        <option>Genres 🕹️</option>
                        {allGenres.sort().map(element => {
                            return <option value={element}>{element}</option>
                        })}
                    </select>
                </div>

                <div>
                    <select onChange={element => handleComingVideogamesCreated(element)}>
                        <option value='All'>Existing & Added 📤📥</option>
                        <option value='API'>Videogames Existing 🙌🏻</option>
                        <option value='DB'>Videogames Added ➕</option>
                    </select>
                </div>
               
                <div>
                    <select onChange={element => hadleSortVideogames(element)} onBlur={element => hadleSortVideogames(element)}>
                        {/* <option value = 'alfabeticOrder'>Alfabetic Order ⬆️⬇️</option> */}
                        <option value = 'asc'>SORT</option>
                        <option value = 'asc'>forward ⬆️</option>
                        <option value = 'des'>Backeard ⬇️</option>
                        <option value = 'rating'>Rating</option>
                        <option value = 'date'>Date</option>
                    </select>
                </div>

                {/* <div>
                    <select>
                        <option value = 'rating'>Rating 🌟</option>
                        <option value = 'good'>Good👍🏻</option>
                        <option value = 'bad'>Bad👎🏻</option>
                    </select>
                </div> */}
            </div>

                <div>
                    <Paginated
                        videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} currentPage={currentPage} paginated={paginated}
                    />
                </div>

                <div>
                    {currentVideogames && currentVideogames.map(element =>{ 
                        return(
                        <div key={element.id}>
                            <Link to={`/videogame/${element.id}`}>
                                <Card
                                    name={element.name} 
                                    genres={element.genres} 
                                    image={element.image} 
                                    rating={element.rating}
                                    key={element.id}
                                    />
                            </Link>
                        </div>
                        )}
                    )
                    }
                </div>
            {/* {console.log(currentVideogames)} */}
            
        </div>
        
    )

}