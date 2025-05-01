import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';
import Funcion from '../servicios/Funcion';

import { useState, useEffect, useContext } from 'react';

const SeleccionButaca = ({ funcion }) => {
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

    return (<>
        <h1>Selecciona tus butacas!</h1>
        { error && <h2>Error!</h2> }
        { !loading && <ButacaMap butacas={ data } /> }
    </>)
};

export default SeleccionButaca;