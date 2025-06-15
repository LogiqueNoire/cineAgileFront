import './ScreeningButton.css';
import { useNavigate } from 'react-router-dom';
import iconoButaca from '../assets/butacaFill.svg'
import Funcion from '../servicios/Funcion';
import { useEffect, useState } from 'react';

const ScreeningButton = ({ funcion, pelicula }) => {
    const [cantButacasDisponibles, setCantButacasDisponibles] = useState();
    const [mostrarCantidad, setMostrarCantidad] = useState(false)

    const navigate = useNavigate();
    const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/pelicula/${pelicula.idPelicula}/${funcion.idFuncion}`, { state: { consultaSedesPorPelicula: ejemplo } });
        navigate(`/compra`, { state: { funcion, pelicula } })
    };

    const butacasDisponibles = async (idFuncion) => {
        const c = await Funcion.cantidadButacasDisponibles(idFuncion);
        setCantButacasDisponibles(c);

        setMostrarCantidad(true);
        setTimeout(() => {
            setMostrarCantidad(false);
        }, 2000);
    };


    return (

        <div className='w-auto'>
            <button className="btn mybtn-outline-primary"
                onClick={handleClick} key={funcion.idFuncion}
                type='button' style={{ 'borderBottomRightRadius': '0px', 'borderTopRightRadius': '0px', 'borderRight': '0px' }}>{
                    funcion.fechaHoraInicio.slice(11, 16)}
            </button>
            <button className='btn mybtn-outline-primary'
                onClick={() => { butacasDisponibles(funcion.idFuncion) }}
                type='button' style={{ 'position': 'relative', 'borderBottomLeftRadius': '0px', 'borderTopLeftRadius': '0px' }}>
                <img src={iconoButaca} alt="" style={{ 'height': '20px' }} />

                <div className={`cantidad-disponible fade ${mostrarCantidad === true ? 'show' : ''}`}
                    style={{
                        position: 'absolute',
                        top: '-1rem',
                        left: '1.5rem',
                        backgroundColor: 'white',
                        padding: '0 0.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        'backgroundColor': '#01217B',
                        'borderRadius': '14px',
                        color: 'white'
                    }}>
                    <div>{cantButacasDisponibles}</div>
                </div>


            </button>
        </div>
    );
}

export default ScreeningButton;