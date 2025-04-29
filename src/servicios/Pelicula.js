import axios from 'axios'
import { url } from '../configuracion/backend'

class Pelicula {
    
    static async mostrarPelicula(idPelicula) {
        const peliculas = await axios.get(`${url}/pelicula/${idPelicula}`)
        return peliculas.data
    }

    static async mostrarPeliculasEstreno() {
        const peliculas = await axios.get(`${url}/pelicula/estreno`)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas() {
        const peliculas = await axios.get(`${url}/pelicula/proximamente`)
        return peliculas.data
    }

}

export default Pelicula;