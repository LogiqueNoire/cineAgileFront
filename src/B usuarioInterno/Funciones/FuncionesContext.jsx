import { createContext } from "react"
import { format } from 'date-fns'
import { useState } from "react"

export const FuncionesContext = createContext()

export const FuncionesContextProvider = ({ children }) => {

    const [valoresBusqueda, setValoresBusqueda] = useState({
        sedes: [],
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
        nuevaPeliculaId: ''
    });

    const [listaFunciones, setListaFunciones] = useState([]);



    return (
        <FuncionesContext.Provider value={{ valoresBusqueda, setValoresBusqueda, funcion, setFuncion, listaFunciones, setListaFunciones }}>
            {children}
        </FuncionesContext.Provider>
    )

}