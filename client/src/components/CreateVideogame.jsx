import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {postVideogame, getVideogames} from "../actions/index";
import styled from "styled-components";
import { useEffect } from "react";
import {getGenres, getPlatforms} from "../actions/index"

const H1styled = styled.h1`
display: flex;
justify-content: center;
color: #386eb1;
font-style: oblique;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Name is required'
    } else if(!input.rating || input.rating < 0 || input.rating > 5){
        errors.rating = 'Rating must be a number between "0" to "5"'
    } else if(input.platforms.length === 0){
        errors.platforms = 'Platform is required'
    }
    return errors
}

export default function CreateVideogame(){
    const dispatch = useDispatch()
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: [],
        image: ' '
    })


    const [errors, setErrors] = useState({})
    let allGenres = useSelector(state => state.genres_Global)
    console.log(allGenres);
    const allPlatforms = useSelector(state => state.platforms_Global)
    allGenres = allGenres.filter(element => element !== 'All')

    // let platformss = useSelector(state => state.platforms_Global)

    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])
    

    function handleOnChange(event){
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        console.log(input);
        setErrors(validate ({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    function handlePlatforms(event){
        console.log('Platform: ', event.target.value)
        setInput({
            ...input,
            platforms: [...input.platforms,
            event.target.value]
        })
    }

    function handleGenres(event){
        setInput({
            ...input,
            genres: [...input.genres,
            event.target.value]
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        if(!input.name){
            return alert('Name is required')
        }
        // if(!/^\d{4}\\d{1,2}\\d{1,2}$/.test(input.released)){
        //     return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D')
        // }
         if(!input.rating){
            return alert('Rating is required')
        }
        //  if(!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) || input.rating <0 || input.rating >5){
        //     return alert('Wrong format for Rating. Should be a number between 0-5')
        // }
        if(input.platforms.length === 0){
            return alert('Platform is required')
        }
        dispatch(postVideogame(input))
        dispatch(getVideogames())
        alert(`Videogame ${input.name} has been added`)
        setInput({
            name: '',
            description: '',
            released: '',
            rating: 0,
            genres: [],
            platforms: [],
            image: ' '
        })
        history.push('/home')
    }
//     const handleSubmit = (event) =>{
//         dispatch(postVideogame(input))
        
//     alert("receta creada correctamente")
//     history.push('/home')
//   }
    //
    return (
        <div>
            <div>
                <H1styled>Add your Own Videogame and watting because it's Coming...</H1styled>
                <form onSubmit={handleSubmit}>
                    

                    <div>
                        <div>
                        <label>Videogame Name:</label>
                        <input onChange={handleOnChange} onBlur={handleOnChange} type='text' name='name' value={input.name}/>
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                        </div>

                        <div>
                            <label>Description:</label>
                            <textarea onChange={handleOnChange} type='text' name='description' value={input.description}/>
                        </div>

                        <div>
                        <label>Released date:</label>
                        <input onChange={handleOnChange} type='text' name='released' value={input.released} placeholder='YYYY-MM-DD'/>
                        </div>

                        <div>
                        <label>Rating:</label>
                        <input onChange={handleOnChange} onBlur={handleOnChange} type='text' name='rating' value={input.rating} placeholder='ex 4.3'/>
                        {errors.rating && (
                            <p>{errors.rating}</p>
                        )}
                        </div>

                        <div>
                        <label>Genres:</label>
                        <select onChange={handleGenres}>
                            {allGenres.sort().map((element, key) => {
                                return <option key={key} value={element}>{element}</option>
                            })}
                        </select>
                        <ul>
                            <li>
                            {input.genres.map((element) => element + ' ,')}
                            </li>
                        </ul>
                        </div>

                        <div>
                        <label>Platforms:</label>
                        <select onChange={handlePlatforms} onBlur={handleOnChange}>
                            {allPlatforms?.map((element, key) => 
                                 <option key={key} value={element}>{element}</option>
                            )}
                        </select>
                        <ul className="ul">
                            <li>
                                {input.platforms.map(element => element + ' ,')}
                            </li>
                        </ul>
                        {errors.platforms && (
                            <p>{errors.platforms}</p>
                        )}
                        </div>
             
                        <label>Image:</label>
                            <input onChange={handleOnChange} value={input.image} name='image'/>
                        

                        <button type="submit">Add Videogame</button>
                        <span>
                            <Link to='/home'>
                                <button>Go back to Home</button>
                            </Link>
                        </span>

                    </div>

                </form>
            </div>

        </div>
        
    )
}

