import './ScreeningButton.css';
import { useNavigate } from 'react-router-dom';
import iconoButaca from '@/assets/operaciones/butacaFill.svg'
import Funcion from '@/services/Funcion';
import { useState } from 'react';

const ScreeningButton = ({ funcion, pelicula }) => {
    const [cantButacasDisponibles, setCantButacasDisponibles] = useState();
    const [mostrarCantidad, setMostrarCantidad] = useState(false)

    const navigate = useNavigate();
    const handleClick = () => {
        // Cambiar la ruta
        //navigate(`/pelicula/${pelicula.idPelicula}/${funcion.idFuncion}`, { state: { consultaSedesPorPelicula: ejemplo } });
        Funcion.estaDisponible(funcion.idFuncion).then(res => {
            navigate(`/compra`, { state: { funcion, pelicula } })
        }).catch(err => {
            console.log(err);
            navigate("/error", { state: { errorInfo: "Función cerrada." } });
        });

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
            <button className="btn mybtn-outline-primary text-decoration-none"
                onClick={handleClick} key={funcion.idFuncion}
                type='button' style={{ 'borderBottomRightRadius': '0px', 'borderTopRightRadius': '0px', 'borderRight': '0px',
                        fontFamily: 'system-ui', fontWeight: '500'}}>
                    {funcion.fechaHoraInicio.slice(11, 16)}
            </button>
            <button className='btn mybtn-outline-primary'
                onClick={() => { butacasDisponibles(funcion.idFuncion) }}
                type='button' style={{ 'position': 'relative', 'borderBottomLeftRadius': '0px', 'borderTopLeftRadius': '0px' }}>
                <img src={iconoButaca} alt="" style={{ 'height': '20px' }} />

                <div className={`cantidad-disponible position-absolute fw-bold text-white px-2 fade ${mostrarCantidad === true ? 'show' : ''}`}
                    style={{
                        top: '-1rem',
                        left: '1.5rem',
                        fontSize: '1rem',
                        'backgroundColor': 'var(--cineagile-blue-600)',
                        'borderRadius': '14px',
                    }}>
                    <div>{cantButacasDisponibles}</div>
                </div>


            </button>
        </div >
    );
}

export default ScreeningButton;