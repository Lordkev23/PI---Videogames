import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import getVideogameName from '../actions/index';
import styled from 'styled-components';

const Search = styled.div`
   border-width: 80%;
   text-align: center;
`
const Boton = styled.button`
   background-color: #efb810;
   color: white;
   width: 80px;
   height: 33px;
`
const Input = styled.input`
   padding: 5px;
   width: 200px;
   height: 28px;
   border-width: 100%;
   background-color: #f1d47b;
   color: black;
   border-radius: 5px;
   font-size: 13px;
   margin: 0px 40px 0px 0px;
`

export default function SearchBar() {
    const dispatch = useDispatch()
    const [searchVideogame, setSearchVideogame] = useState('')
   
   function handleInputChange(event){
    event.preventDefault()
    setSearchVideogame(event.target.value);
   }
   
   function handleSubmit(event){
        event.preventDefault()
        dispatch(getVideogameName(searchVideogame))
        setSearchVideogame('')
   }

   return (
      <Search>
         <Input onChange={(event) => handleInputChange(event)} type="text" placeholder="Search by name" value={searchVideogame} />
         <Boton onClick={(event) => handleSubmit(event)} type='submit'>Search</Boton> 
      </Search>
   );
}