import { createContext } from "react"
import { format } from 'date-fns'
import { useState } from "react"

export const FuncionesContext = createContext()

export const FuncionesContextProvider = ({ children }) => {

    const [valoresBusqueda, setValoresBusqueda] = useState({
        sedesTodas: [],
        sedesActivas: [],
        sedeElegida: '',
        peliculasSede: [],
        salasSede: [],
        fechaElegida: format(new Date(), "yyyy-MM-dd"),
        selectPelicula: '',
        selectSala: '',
        filtro: ''
    });

    const [funcion, setFuncion] = useState({
        funcionElegida: '',
        codigoFuncion: '',
        nuevaFecha: '', // Formato YYYY-MM-DD
        nuevaHoraInicio: '',
        nuevaSalaId: '',
        nuevaPeliculaId: '',
        nuevaSedeId: '',
        nuevaDimension: '',
        nuevoPrecioBase: 0
    });

    const [listaFunciones, setListaFunciones] = useState([]);

    const [listaPeliculas, setListaPeliculas] = useState([])

    const [salasNuevaSede, setSalasNuevaSede] = useState([])

    return (
        <FuncionesContext.Provider
            value={{
                valoresBusqueda, setValoresBusqueda,
                funcion, setFuncion,
                listaFunciones, setListaFunciones,
                listaPeliculas, setListaPeliculas,
                salasNuevaSede, setSalasNuevaSede
            }}>
            {children}
        </FuncionesContext.Provider>
    )

}