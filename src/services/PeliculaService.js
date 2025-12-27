import axios from 'axios'
import { env, url } from '@/configuracion/backend'
import Cookies from 'js-cookie';

class PeliculaService {
    
    static async mostrarPelicula(idPelicula) {
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/${idPelicula}`)
        return peliculas.data
    }

    static async mostrarPeliculasEnCartelera(fechaReal) {
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/encartelera?fecha=${fechaReal}`)
        env === "dev" && console.log("peliculas", peliculas.data)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas(fechaReal) {
        const peliculas = await axios.get(`${url}/api/venta/v1/peliculas/proximamente?fecha=${fechaReal}`)
        return peliculas.data
    }

    static async mostrarPeliculasPorSede(sedeElegida) {
        const peliculas = await axios.get(`${url}/api/intranet/v1/peliculas`,
            {
                params: { idSede: sedeElegida },
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

    static async editarPelicula(pelicula) {
        const peliculas = await axios.patch(`${url}/api/intranet/v1/peliculas`,
            pelicula,
            {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

}

export default PeliculaService;