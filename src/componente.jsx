import React from "react";

const Componente = ({title, texto}) => {
    return (
        <div className="container">
            <h1>{title}</h1>
            <p>{texto}</p>
        </div>
    );
}

export default Componente;