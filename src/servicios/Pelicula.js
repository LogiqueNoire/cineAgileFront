import axios from 'axios'

const url = process.env.REACT_APP_BACKEND_API_URL

class Pelicula {

    static async mostrarPeliculasEstreno() {
        const peliculas = await axios.get(`${url}/pelicula/estreno`)
        return peliculas.data
    }
    
    static async mostrarPeliculasProximas() {
        const peliculas = await axios.get(`${url}pelicula/proximamente`)
        return peliculas.data
    }

}

export default Pelicula;