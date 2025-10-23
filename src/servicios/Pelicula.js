import axios from 'axios'
import { url } from '../configuracion/backend'
import Cookies from 'js-cookie';

class Pelicula {
    
    static async mostrarPelicula(idPelicula) {
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/${idPelicula}`)
        return peliculas.data
    }

    static async mostrarPeliculasEnCartelera(fechaReal) {
        console.log("aqui")
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/encartelera?fecha=${fechaReal}`)
        console.log("peliculas", peliculas.data)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas(fechaReal) {
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/proximamente?fecha=${fechaReal}`)
        return peliculas.data
    }

    static async mostrarPeliculasPorSede(sedeElegida) {
        const peliculas = await axios.get(`${url}/api/venta/v1/intranet/peliculas`,
            {
                params: { idSede: sedeElegida },
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

    static async editarPelicula(pelicula) {
        const peliculas = await axios.patch(`${url}/api/venta/v1/intranet/peliculas`,
            pelicula,
            {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

}

export default Pelicula;