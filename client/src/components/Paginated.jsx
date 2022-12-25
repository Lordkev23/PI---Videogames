import React from "react";

export default function Paginated({videogamesPerPage, allVideogames, paginated}){
    const pageNumber = []

    for(let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumber.push(i+1)
        console.log(pageNumber);
    }
    return(
        <nav >
            <ul className="paginated">
                {pageNumber && pageNumber.map((number, index) => 
                    <li  key={index}>
                        <button className="number" onClick={()=>paginated(number)}>{number}</button>
                    </li>
                )}
            </ul>
            
        </nav>
    )
}