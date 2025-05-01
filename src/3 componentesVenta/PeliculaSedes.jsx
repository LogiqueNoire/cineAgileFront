import { useLocation } from "react-router";
import MostrarSedesHorarios from "./MostrarSedesHorarios";

const PeliculaSedes = () => {
    const location = useLocation();
    const { consultaIdPelicula, nombrePelicula, imagenPeli } = location.state || {};
    console.log(consultaIdPelicula)

    return (<>
        <div className="d-flex justify-content-center align-items-center p-4 bg-light mb-4">
            <div className='infoPelicula me-4'>
                <h2 className='mb-4'>Funciones para película {nombrePelicula}</h2>
                <div>
                    <h5 className="mx-3">Fecha:</h5>
                    <input type="date" className="mx-3" />
                </div>
            </div>
            <img src={imagenPeli} alt="imagen Peli" />
        </div>

        <MostrarSedesHorarios estado={ location.state } />
    </>);
};

export default PeliculaSedes