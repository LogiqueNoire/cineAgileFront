import { useState, createContext } from "react" 

const VentaContext = createContext({})

const VentaContextProvider = ({ children }) => {
    const [ butacasSeleccionadas, setButacasSeleccionadas ] = useState([])
    const [ entradasSeleccionadas, setEntradasSeleccionadas ] = useState(0)

    const contextData = {
        butacaContext: {
            seleccionadas: butacasSeleccionadas,
            setSeleccionadas: setButacasSeleccionadas,
            entradasSeleccionadas: entradasSeleccionadas,
            setEntradasSeleccionadas: setEntradasSeleccionadas
        }
    }

    return (
        <VentaContext.Provider value={ contextData }>
            
            { children }
        </VentaContext.Provider>
    )
}

export { VentaContextProvider, VentaContext }