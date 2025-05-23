import pelicula from '../assets/pelicula.svg'
import sede from '../assets/sede.svg'
import { useNavigate } from 'react-router-dom';
const VentanaInterior = () => {
    const navigate = useNavigate();

    const moverseHaciaAddfilm = () => {
        navigate(`/intranet/addfilm`)
    }

    const moverseHaciaAddSede = () => {
        navigate(`/intranet/addsede`)
    }

    return (
        <div className="m-3">
            <div className="row">
                <h1 className="display-5 text-center">Módulo interno de operaciones para CineAgile</h1>
                <div className="d-flex p-3 justify-content-center gap-4">

                    <button className="btn btn-primary d-flex gap-1" onClick={moverseHaciaAddfilm}>
                        <img src={pelicula} alt="" style={{ height: '35px' }} />
                        <h2 className="">Películas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-1" onClick={moverseHaciaAddSede}>
                        <img src={sede} alt="" style={{ height: '35px' }} />
                        <h2 className="">Sedes</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-1">
                        <img src={sede} alt="" style={{ height: '35px' }} />
                        <h2 className="">Funciones</h2>
                    </button>

                </div>
            </div>
        </div>
    );
}
export default VentanaInterior;