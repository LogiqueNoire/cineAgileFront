import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContextProvider } from './VentaContextProvider'
import ComJose3 from '../4 precios/ComJose3'

const FlujoVenta = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion, idPelicula, nombrePelicula, imagenPeli } = location.state

    console.log("Funcion", funcion)
    console.log("Pelicula", idPelicula)
    console.log("Nombre pelicula", nombrePelicula)
    console.log("Imagen pelicula", imagenPeli)

    const pasosCompra = [
        <ButacaSelect funcion={funcion} />
    ]

    return (<>
        <VentaContextProvider>
            { pasosCompra[0] }        

            <button onClick={ () => { navigate(-1) } } >Volver</button>
            <button>Siguiente</button>
        </VentaContextProvider>
    </>)
}

export default FlujoVenta;