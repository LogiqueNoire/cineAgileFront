import axios from 'axios'
import { url } from '@/configuracion/backend'
import Fecha from './Fecha'

class Funcion {
    static async mostrarSedesFuncionesPorPelicula(idPelicula, fecha) {
        const funciones = await axios(`${url}/api/venta/v1/funciones/${idPelicula}?fecha=${fecha}`)
        
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

    static async mostrarButacasDeFuncion(idFuncion) {
        const butacas = await axios.get(`${url}/api/venta/v1/funciones/${idFuncion}/butacas`)
        return butacas.data
    }

    static async cantidadButacasDisponibles(idFuncion) {
        const cantidad = await axios.get(`${url}/api/venta/v1/funciones/${idFuncion}/butacas/disponibles`)
        return cantidad.data
    }
    
    static async estaDisponible(idFuncion) {
        const cantidad = await axios.get(`${url}/api/venta/v1/funciones/${idFuncion}/disponibilidad`)
        return cantidad.data
    }

    static async mostrarPreciosdeFuncion(idFuncion, persona) {
        const precios = await axios.get(`${url}/api/venta/v1/funciones/precios?idFuncion=${idFuncion}&persona=${persona}`)  ///precios?idFuncion=225855&persona=22
        return precios.data
    }
}

export default Funcion;