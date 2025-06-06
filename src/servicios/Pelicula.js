import axios from 'axios'
import { url } from '../configuracion/backend'
import Cookies from 'js-cookie';

class Pelicula {
    
    static async mostrarPelicula(idPelicula) {
        const peliculas = await axios.get(`${url}/pelicula/${idPelicula}`)
        return peliculas.data
    }

    static async mostrarPeliculasEnCartelera() {
        console.log("aqui")
        const peliculas = await axios.get(`${url}/pelicula/encartelera`)
        console.log("peliculas", peliculas.data)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas() {
        const peliculas = await axios.get(`${url}/pelicula/proximamente`)
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

}

export default Pelicula;