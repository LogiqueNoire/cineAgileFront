import { useState, createContext } from "react" 

const VentaContext = createContext({})

const VentaContextProvider = ({ children }) => {
    const [ butacasSeleccionadas, setButacasSeleccionadas ] = useState([])

    const contextData = {
        butacaContext: {
            seleccionadas: butacasSeleccionadas,
            setSeleccionadas: setButacasSeleccionadas
        }
    }

    return (
        <VentaContext.Provider value={ contextData }>
            
            { children }
        </VentaContext.Provider>
    )
}

export { VentaContextProvider, VentaContext }