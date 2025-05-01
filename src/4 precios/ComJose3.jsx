import React from "react";


 const ComJose3 = ({nombrePeli, catePeli, sedePeli,fechaPeli,salaPeli}) => {

    return (
        <div className="Rojo">
            <div className=" d-flex justify-content-center"> 
            <img  className=""src="https://i.pinimg.com/736x/8d/60/e9/8d60e928c17f67d67683bd5262000a5c.jpg" alt="imagen" height="200px" ></img>
            </div>
            <h1 className="text-center  m-4"style={{ color: 'blue' }}>{nombrePeli}</h1> 
            <h2 className="text-center  m-3">{catePeli}</h2>
            <h3 className="text-center  m-3">{sedePeli}</h3>
            <h3 className="text-center  m-3">{fechaPeli}</h3>
            <h3 className="text-center  m-3">{salaPeli}</h3>
        </div>

    ); 
} 
export default ComJose3
