import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContextProvider } from './VentaContextProvider'
import ComJose3 from '../4 precios/ComJose3'
import { VentanaPrecios } from '../4 precios/VentanaPrecios'
import { useState } from "react";

const FlujoVenta = () => {
    const [indice, setIndice] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion, pelicula } = location.state
    console.log(funcion)
    console.log(pelicula)

    const pasosCompra = [
        <ButacaSelect funcion={funcion} />,
        <VentanaPrecios />
    ]

    const navigatePrecios = () => {
    navigate(`/funcion/precios`,
        {
            state: {
                pelicula: pelicula, funcion: funcion
            }
        });
};
    

    return (
        <div className="d-flex my-4 py-4 border border-2">
            <VentaContextProvider>
                <div className="d-flex justify-content-center px-4 border-end">
                    <ComJose3 pelicula={pelicula} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio} salaPeli={funcion.codigoSala} />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                    {pasosCompra[indice]}
                    <div>
                        <button onClick={() => { navigate(-1) }} >Volver</button>
                        <button onClick={() => {setIndice(indice+1)} }>Siguiente</button>
                    </div>
                </div>
            </VentaContextProvider>
        </div>)
}

export default FlujoVenta;

