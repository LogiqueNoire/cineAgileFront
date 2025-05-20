import './ScreeningButton.css';
import { useNavigate } from 'react-router-dom';

const ScreeningButton = ({ funcion, pelicula }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/pelicula/${pelicula.idPelicula}/${funcion.idFuncion}`, { state: { consultaSedesPorPelicula: ejemplo } });
        navigate(`/compra`, { state: { funcion, pelicula } })
        console.log(pelicula)
    };

    return (
        
        <div className='w-auto'>
            <button className="btn btn-outline-primary" onClick={handleClick} key={funcion.idFuncion} type='button'>{funcion.fechaHoraInicio.slice(11, 16)}</button>
        </div>
    );
}

export default ScreeningButton;