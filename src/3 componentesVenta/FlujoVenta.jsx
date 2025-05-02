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

    return (
        <div className="d-flex">
            <div className="d-flex justify-content-center">
                <ComJose3 idPelicula={idPelicula} nombrePelicula={nombrePelicula} imagenPeli={imagenPeli} catePeli={funcion.categoria} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio} salaPeli={funcion.sala} />
            </div>
            <VentaContextProvider>
                <div className="d-block m-4 align-self-center">

                    {pasosCompra[0]}

                    <button onClick={() => { navigate(-1) }} >Volver</button>
                    <button onClick={()=> { navigate(`/precios`,
                     { state: { consultaIdPelicula: idPelicula, nombrePelicula: nombrePelicula,
                         imagenPeli: imageUrl, contextData: contextData
                         } });
                        }}>Siguiente</button>
                </div>
            </VentaContextProvider>
        </div>)
}

export default FlujoVenta;