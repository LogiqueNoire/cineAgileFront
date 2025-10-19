import { useState, createContext } from "react" 
import { useLocation } from "react-router-dom"

const VentaContext = createContext({})

const VentaContextProvider = ({ children }) => {
    const location = useLocation()
    const { funcion } = location.state

    const [ butacasSeleccionadas, setButacasSeleccionadas ] = useState([])
    const [ entradasSeleccionadas, setEntradasSeleccionadas ] = useState(0)
    const [ generalesSeleccionadas, setGeneralesSeleccionadas ] = useState(0)
    const [ niñosSeleccionadas, setNiñosSeleccionadas ] = useState(0)
    const [ conadisSeleccionadas, setConadisSeleccionadas ] = useState(0)
    const [ mayoresSeleccionadas, setMayoresSeleccionadas ] = useState(0)
    const [ total, setTotal ] = useState(0)
    const [ pruebaInicial, setPruebaInicial ] = useState(0)
    const [ tiempo, setTiempo ] = useState(new Date(2000, 0, 0, 0, 4, 59, 0));

    const contextData = {
        general: {
            funcion,
            tiempo,
            setTiempo
        },
        butacaContext: {
            seleccionadas: butacasSeleccionadas,
            setSeleccionadas: setButacasSeleccionadas,
        },
        entradasContext: {
            entradasSeleccionadas: entradasSeleccionadas,
            setEntradasSeleccionadas: setEntradasSeleccionadas,
            generalesSeleccionadas: generalesSeleccionadas,
            setGeneralesSeleccionadas: setGeneralesSeleccionadas,
            niñosSeleccionadas: niñosSeleccionadas,
            setNiñosSeleccionadas: setNiñosSeleccionadas,
            conadisSeleccionadas: conadisSeleccionadas,
            setConadisSeleccionadas: setConadisSeleccionadas,
            mayoresSeleccionadas: mayoresSeleccionadas,
            setMayoresSeleccionadas: setMayoresSeleccionadas
        },
        totalContext: {
            total: total,
            setTotal: setTotal
        },
        pruebaInicialContext: {
            pruebaInicial: pruebaInicial,
            setPruebaInicial: setPruebaInicial
        }
    }

    return (
        <VentaContext.Provider value={ contextData }>
            
            { children }
        </VentaContext.Provider>
    )
}

export { VentaContextProvider, VentaContext }