import Entrada from "../servicios/Entrada"
import Encriptador from "../servicios/Encriptador"


const EntradaSearch = (codigo) => {
    Encriptador.desencriptar(codigo)

    Entrada.buscarEntrada()

    return (
        <div>
            
        </div>
    )
}

export default EntradaSearch;