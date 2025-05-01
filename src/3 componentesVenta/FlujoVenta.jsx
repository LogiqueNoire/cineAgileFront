import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContextProvider } from './VentaContextProvider'

const FlujoVenta = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion } = location.state

    const pasosCompra = [
        <ButacaSelect funcion={ funcion } />
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