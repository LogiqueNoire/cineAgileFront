import React from "react";

const ComponenteVerde = ({ nombre, texto, precio }) => {
    return (
        <div classname="d-flex verde">
            <div className="nombre me-3 row w-25">
                <h3>{nombre}</h3>
                <div className="texto">
                    <h3>{texto}</h3>
                    <div className="precio">
                        <h3>{precio} </h3>
                    </div>
                </div>
            </div>

            <div className="asd d-flex">
                <img src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="boton mas" height="50px"></img>
                <h3> 5 </h3>
                <img src="https://cdn-icons-png.flaticon.com/512/66/66889.png" alt="boton menos" height="50px"></img>
            </div>
        </div>
    );
}
export default ComponenteVerde;