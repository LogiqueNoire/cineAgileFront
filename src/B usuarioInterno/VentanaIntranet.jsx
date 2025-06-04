import pelicula from '../assets/pelicula.svg'
import sede from '../assets/sede.svg'
import funciones from '../assets/funciones.svg'
import { useNavigate } from 'react-router-dom';
const VentanaIntranet = () => {
    const navigate = useNavigate();

    const moverseHaciaVentanaPeliculas = () => {
        navigate(`/intranet/peliculas`)
    }

    const moverseHaciaVentanaSedesYSalas = () => {
        navigate(`/intranet/sedesysalas`)
    }

    return (
        <div className="m-3">
            <div className="row">
                <h1 className="display-5 text-center"><strong>Módulo interno de operaciones para CineAgile</strong></h1>
                <div className="d-flex p-3 justify-content-center gap-4 flex-wrap">

                    <button className="btn btn-primary d-flex gap-1 flex-column align-items-center justify-content-center" onClick={moverseHaciaVentanaPeliculas}>
                        <img src={pelicula} alt="" style={{ width: '90px' }} />
                        <h2 className="">Películas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-1 flex-column align-items-center justify-content-center" onClick={moverseHaciaVentanaSedesYSalas}>
                        <img src={sede} alt="" style={{ width: '90px', height: "auto" }} />
                        <h2 className="">Sedes y salas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-1 flex-column align-items-center justify-content-center">
                        <img src={funciones} alt="" style={{ width: '90px' }} />
                        <h2 className="">Funciones</h2>
                    </button>

                </div>
            </div>
        </div>
    );
}
export default VentanaIntranet;