import { useLocation } from "react-router";
import MostrarSedesHorarios from "./MostrarSedesHorarios";
import { format } from 'date-fns'

const PeliculaSedes = () => {
    const location = useLocation();
    const { consultaIdPelicula, nombrePelicula, imagenPeli } = location.state || {};
    console.log(consultaIdPelicula)
    
    // Formatear la fecha en formato 'yyyy-MM-ddTHH:mm'
    const now = new Date().toISOString().slice(0, 19);
    let fechaFormateada = format(now, `yyyy-MM-dd.HH:mm`).replace('.', 'T')
    const [fecha, setfecha] = useState(fechaFormateada+'T00:00:00');

    function alCambiar() {
        (e)=>setfecha(e.target.value)
        console.log('fechaformateada', fechaFormateada);
    }

    return (<>
        <div className="d-flex justify-content-center align-items-center p-4 bg-light mb-4">
            <div className='infoPelicula me-4'>
                <h2 className='mb-4'>Funciones para película {nombrePelicula}</h2>
                <div>
                    <h5 className="mx-3">Fecha:</h5>
                    <input type="date" className="mx-3" min={fechaFormateada} value={fecha}
                     onChange={
                        alCambiar();
                     }/>
                </div>
            </div>
            <img src={imagenPeli} alt="imagen Peli" />
        </div>

        <MostrarSedesHorarios estado={location.state} fechaFormateada={fechaFormateada} />
    </>);
};

export default PeliculaSedes