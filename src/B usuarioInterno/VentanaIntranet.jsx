import pelicula from '../assets/pelicula.svg'
import sede from '../assets/sede.svg'
import funciones from '../assets/funciones.svg'
import ajustes from '../assets/ajustes.svg'
import usuariosInternos from '../assets/modulo_usuario_icono.svg'
import { useNavigate } from 'react-router-dom';
const VentanaIntranet = () => {
    const navigate = useNavigate();

    const moverseHaciaVentanaPeliculas = () => {
        navigate(`/intranet/peliculas`)
    }

    const moverseHaciaVentanaSedesYSalas = () => {
        navigate(`/intranet/sedesysalas`)
    }

    const moverseHaciaFunciones = () => {
        navigate(`/intranet/funciones`)
    }
    
    const moverseHaciaUsuarios = () => {
    }
    
    const moverseHaciaAjustesGenerales = () => {
        navigate(`/intranet/ajustes`)
    }

    return (
        <div className="m-3">
            <div className="row">
                <h1 className="display-5 text-center"><strong>Bienvenido a la vista interna de CineAgile</strong></h1>
                <div className="d-flex p-3 justify-content-center gap-4 flex-wrap">


                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaVentanaPeliculas}>
                        <img src={pelicula} alt="" style={{ width: '90px' }} />
                        <h2 className="">Películas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaVentanaSedesYSalas}>
                        <img src={sede} alt="" style={{ width: '90px', height: "auto" }} />
                        <h2 className="text-start">Sedes, salas<br></br>y butacas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaFunciones}>
                        <img src={funciones} alt="" style={{ width: '90px' }} />
                        <h2 className="">Funciones</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaAjustesGenerales}>
                        <img src={ajustes} alt="" style={{ width: '90px' }} />
                        <h2 className="">Ajustes<br/>Generales</h2>
                    </button>

                </div>
            </div>
        </div>
    );
}
export default VentanaIntranet;