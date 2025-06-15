import axios from 'axios'
import { url } from '../configuracion/backend'
import { format } from 'date-fns'
import Fecha from './Fecha'

class Funcion {
    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/funcion/pelicula/${idPelicula}?fecha=${fecha}`)
        
        if (funciones.data) {
            funciones.data.map(el => {
                el.funciones.map(func => {
                    func.fechaHoraFin = Fecha.tiempoStringUTC_A_TiempoLocalString(func.fechaHoraFin);
                    func.fechaHoraInicio = Fecha.tiempoStringUTC_A_TiempoLocalString(func.fechaHoraInicio);
                    // console.log(el.nombreSede, func);
                })
            })
        }

        return funciones.data
    }

    static async mostrarButacasDeFuncion(idFuncion) {
        const butacas = await axios.get(`${url}/funcion/butacas/${idFuncion}`)
        return butacas.data
    }

    static async mostrarPreciosdeFuncion(idFuncion, persona) {
        const precios = await axios.get(`${url}/funcion/precios?idFuncion=${idFuncion}&persona=${persona}`)  ///precios?idFuncion=225855&persona=22
        return precios.data
    }

    static async cantidadButacasDisponibles(idFuncion) {
        const cantidad = await axios.get(`${url}/funcion/cantidadButacasDisponibles?idFuncion=${idFuncion}`)
        return cantidad.data
    }
}

export default Funcion;