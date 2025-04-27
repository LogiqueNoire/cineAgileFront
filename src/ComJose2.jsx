import React from "react";
import ComJose1 from "./ComJose1";

export const ComJose2 = () => {

return(

    <div className="container ">
         <h3> ENTRADAS GENERALES </h3>
        <ComJose1 nombre="GENERAL 2D" precio ="S/27.00" ></ComJose1>
        <ComJose1 nombre="Mayores 60 2D" precio ="S/25.00" ></ComJose1>
        <ComJose1 nombre="Niños 2D" texto="Para niños de 2 a 11 años" precio ="S/18.00" ></ComJose1>
        <ComJose1 nombre="Conadis 2D" texto="Es obligatorio presentar DNI y carnet Conadis" precio ="S/18.00" ></ComJose1>
    </div>
);
}