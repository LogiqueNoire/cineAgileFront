import axios from 'axios'
import { url } from '../configuracion/backend'
import { format } from 'date-fns'
import Fecha from './Fecha'

class Funcion {
    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/api/v1/funciones/${idPelicula}?fecha=${fecha}`)
        
        if (funciones.data) {
            funciones.data.forEach(el => {
                this.funcionesUTC_A_local(el.funciones);
            })
        }

        return funciones.data
    }

    static funcionesUTC_A_local(funciones) {
        funciones.forEach(func => {
            func.fechaHoraFin = Fecha.tiempoStringUTC_A_TiempoLocalString(func.fechaHoraFin);
            func.fechaHoraInicio = Fecha.tiempoStringUTC_A_TiempoLocalString(func.fechaHoraInicio);
        })
    }

    static async mostrarButacasDeFuncion(funcion) {
        const butacas = await axios.get(`${url}/api/v1/funciones/${funcion}/butacas`)
        return butacas.data
    }

    static async mostrarPreciosdeFuncion(idFuncion, persona) {
        const precios = await axios.get(`${url}/api/v1/funciones/precios?idFuncion=${idFuncion}&persona=${persona}`)  ///precios?idFuncion=225855&persona=22
        return precios.data
    }

    static async cantidadButacasDisponibles(funcion) {
        const cantidad = await axios.get(`${url}/api/v1/funciones/cantidad-butacas-disponibles?idFuncion=${funcion}`)
        return cantidad.data
    }

    static async estaDisponible(funcion) {
        const cantidad = await axios.get(`${url}/api/v1/funciones/${funcion}/disponibilidad`)
        return cantidad.data
    }
}

export default Funcion;