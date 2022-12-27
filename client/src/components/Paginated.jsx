import React from "react";
import styled from "styled-components";

const Botonse = styled.button`
height: 30px;
width: 70px;
color:white;
background-color: red;
border-radius: 12%;
font-size: medium;
&:hover{
color:white;
background-color: #f14646;
border-radius: 12%;
font-size: large;
}
`
const UlChange = styled.ul`
display: inline;
list-style: none;
`
const LiChange = styled.li`
display: inline;
list-style: none;
`

export default function Paginated({videogamesPerPage, allVideogames, paginated}){
    const pageNumber = []

    for(let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumber.push(i+1)
        console.log(pageNumber);
    }
    return(
        <nav >
            <UlChange className="paginated">
                {pageNumber && pageNumber.map((number, index) => (
                    <LiChange  key={index}>
                        <Botonse className="number" onClick={()=>paginated(number)}>{number}</Botonse>
                    </LiChange>
                ))}
            </UlChange>
            
        </nav>
    )
}