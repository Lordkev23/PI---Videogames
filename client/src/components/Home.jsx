
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, filterVideogamesPerStatus, filterCreated, getGenres, filterVideogamesPerGenre } from "../actions";
import Card from "./Card";
import Paginated from "./Paginated";
import styled from "styled-components";

const H1styled = styled.h1`
display: flex;
justify-content: center;
color: #386eb1;
font-style: oblique;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
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
    // useEffect(() => {
    //     dispatch(getVideogames())
    // }, [dispatch])

    function handleClick(event){
        event.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterStatus(event){
        dispatch(filterVideogamesPerStatus(event.target.value))
    }

    // function handleFilterCreated(event){
    //     dispatch(filterCreated(event.target.value))
    // }

     
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const genreses = useSelector(state => state.genres)

    const handleFilterGenres = (event) =>
        dispatch(filterVideogamesPerGenre(event.target.value))
   

    return(
        <div>
            <Link to = '/videogames'>Create Videogame</Link>
            <H1styled>The Videogames are Coming...</H1styled>
            <BotonColor onClick={event => handleClick(event)}>Reload All Videogames</BotonColor>
            <div>

                <select onChange = {event => handleFilterStatus(event)}>
                    <option value = 'All'>All</option>
                    <option value = 'genres'>Genre</option>
                    <option value = 'Existing'>Existing</option>
                    <option value = 'created'>Created</option>
                </select>

                <select onClick={handleFilterGenres}>
                    <option value='null'>Genre</option>
                    {genreses&&genreses.map((i,key)=> 
                        <option value={i} key={key}>{i}</option>)}

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
                                <Card
                                    name={element.name} 
                                    genres={element.genres} 
                                    image={element.background_image} />
                            </Link>
                        </div>)
                )
            }
            {/* {console.log(currentVideogames)} */}

            </div>
        </div>
        
    )

}