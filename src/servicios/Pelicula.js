import axios from 'axios'
import { url } from '../configuracion/backend'
import Cookies from 'js-cookie';

class Pelicula {
    
    static async mostrarPelicula(idPelicula) {
        const peliculas = await axios.get(`${url}/pelicula/${idPelicula}`)
        return peliculas.data
    }

    static async mostrarPeliculasEnCartelera(fechaReal) {
        console.log("aqui")
        const peliculas = await axios.get(`${url}/pelicula/encartelera?fecha=${fechaReal}`)
        console.log("peliculas", peliculas.data)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas(fechaReal) {
        const peliculas = await axios.get(`${url}/pelicula/proximamente?fecha=${fechaReal}`)
        return peliculas.data
    }

    static async mostrarPeliculasPorSede(sedeElegida) {
        const peliculas = await axios.get(`${url}/intranet/peliculasPorSede`,
            {
                params: { idSede: sedeElegida },
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

    static async editarPelicula(pelicula) {
        const peliculas = await axios.patch(`${url}/intranet/pelicula`,
            pelicula,
            {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })
        return peliculas.data
    }

}

export default Pelicula;