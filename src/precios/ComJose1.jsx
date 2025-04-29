import React from "react";
const ComJose1 = ({ nombre, texto, precio }) => {
    return (

        <div className="nombre">
            <strong>{nombre}</strong>
            <div className="texto">
                <h3>{texto}</h3>
                <div className="precio">
                    <h3>{precio} </h3>
                </div>
            </div>
        </div>
    );
}
export default ComJose1;