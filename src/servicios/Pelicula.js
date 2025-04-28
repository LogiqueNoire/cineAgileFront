import axios from 'axios'

class Pelicula {

    static async mostrarPeliculasEstreno() {
        const peliculas = await axios.get(`http://localhost:8080/pelicula/estreno`)
        return peliculas.data
    }

}

export default Pelicula;