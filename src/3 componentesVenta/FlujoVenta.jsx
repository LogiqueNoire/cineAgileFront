import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContextProvider } from './VentaContextProvider'
import ComJose3 from '../4 precios/ComJose3'

const FlujoVenta = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion, pelicula } = location.state

    const pasosCompra = [
        <ButacaSelect funcion={funcion} />
    ]

    return (
        <div className="d-flex my-4 py-4 border border-2">
            <VentaContextProvider>
                <div className="d-flex justify-content-center px-4 border-end">
                    <ComJose3 pelicula={pelicula} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio} salaPeli={funcion.codigoSala} />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                    { pasosCompra[0] }
                    <div>
                        <button onClick={() => { navigate(-1) }} >Volver</button>
                        <button >Siguiente</button>
                    </div>
                </div>
            </VentaContextProvider>
        </div>)
}

export default FlujoVenta;

/*onClick={() => {
                        navigate(`/precios`,
                            {
                                state: {
                                    idPelicula: idPelicula, nombrePelicula: nombrePelicula,
                                    imagenPeli: imagenPeli, funcion: funcion
                                }
                            });
                    }} */