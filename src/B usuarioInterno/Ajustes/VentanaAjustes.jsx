import CambiarContra from "./CambiarContra";
import Generos from "./Generos";
const VentanaAjustes = () => {

    return (
        <div className="py-2">
            <div className="container-fluid col-10 bg-white border border-3 mb-3 py-5 shadow rounded rounded-4">
                <div className="display-5 text-center">Ajustes Generales</div>
            </div>

            <CambiarContra />

            <Generos />
        </div>
    )
}

export default VentanaAjustes;