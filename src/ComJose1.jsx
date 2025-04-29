import React from "react";
 const ComJose1 = ({ nombre, texto, precio  }) => {
    const [cantidad,setCantidad] =useState(0);

    const agregar = () => {
    setCantidad(cantidad + 1);
        };

    const restar = () => {
       if (cantidad > 0) {
        setCantidad(cantidad - 1);
    }
};
return (
    <div>
     <div className="nombre">
        <strong>{nombre}</strong>
            <div className="texto">
                <h3>{texto}</h3>
                <div className="precio">
                        <h3>{precio} </h3>
                </div>
            </div>
     </div>

<button className="botonAgregar d-flex m-2 border-0" onClick={restar}  >
<div className="botonrestar d-flex">
    <img src="https://cdn-icons-png.flaticon.com/512/66/66889.png" alt="boton menos" height="30px"></img>
    </div>
    </button>  

    <h3 className="contador ">{cantidad}</h3>

    <button className="botonQuitar d-flex m-2 border-0" onClick={agregar}>  
    <div className="botonsuma d-flex">
    <img src="https://cdn-icons-png.flaticon.com/512/117/117885.png" alt="boton mas" height="30px" ></img>
    </div>
    </button>
</div>   
);
} 
export default  ComJose1;