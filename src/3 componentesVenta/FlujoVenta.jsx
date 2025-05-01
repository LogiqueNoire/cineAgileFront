import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContextProvider } from './VentaContextProvider'
import ComJose3 from '../4 precios/ComJose3'

const FlujoVenta = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion } = location.state

    const pasosCompra = [
        <ButacaSelect funcion={ funcion } />
    ]

    return (<>
        <VentaContextProvider>

            <div className="compra-info">
                <ComJose3 />
            </div>

            <div className="compra-step">
                { pasosCompra[0] }        
            </div>

            <button onClick={ () => { navigate(-1) } } >Volver</button>
            <button>Siguiente</button>
        </VentaContextProvider>
    </>)
}

export default FlujoVenta;