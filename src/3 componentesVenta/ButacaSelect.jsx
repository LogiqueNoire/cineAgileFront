import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';
import Funcion from '../servicios/Funcion';
import { VentaContext } from './VentaContextProvider';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionButaca = ({ funcion, prev, next }) => {
    const navigate = useNavigate();
    const context = useContext(VentaContext)
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        Funcion.mostrarButacasDeFuncion(funcion.idFuncion).then(data => {
            const butacas = data.map(el => ({ ...el.butaca, ocupado: el.ocupado }) )
            setData(butacas)
        }).catch(err => {
            setError("Error al cargar")
        }).finally(_ => [
            setLoading(false)
        ])

        return () => {
            setLoading(true)
            setError(null)
        }
    }, [ funcion ])

    const volver = () => {
        navigate(-1);
        prev();
    }

    const siguiente = () => {
        next();
    }

    return (
        <>
            <div className='d-flex'>
                { error && <h2>Error!</h2> }
                { !loading && <ButacaMap butacas={ data } /> }
            </div>
    
            <div className="d-flex justify-content-center gap-4 align-items-center">
                <button className="btn btn-primary" onClick={volver} >Volver</button>
                <button className="btn btn-primary" disabled={context.butacaContext.seleccionadas.length === 0} onClick={siguiente}>Siguiente</button>
            </div>
        </>)
};

export default SeleccionButaca;