import React from "react";

export default function Card({ image, name, genres }){
    const genresShow = genres.length && genres.join(", ");
    return(
        <div>
            <h3>{name}</h3>
            
            <h4>{genresShow}</h4>
            
            <img src={image} alt={name} width="200px" height="200px"/>
        </div>
    )
}