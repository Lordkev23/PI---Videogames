import { useState } from "react";
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

export default function SearchBar(props) {
   console.log(props)
   
   const [searchVideogame, setSearchVideogame] = useState('')
   
   function handleChange(evento){
    setSearchVideogame(evento.target.value);
   }
   
  

   return (
      <Search>
         <Input type="search" value={searchVideogame} onChange={handleChange}/>
         <Boton onClick={() => props.onSearch(searchVideogame)}>Agregar</Boton> 
       
      </Search>
   );
}