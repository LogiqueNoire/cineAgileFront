import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';

import { useState, useEffect } from 'react';

const SeleccionButaca = ({ idSala }) => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        SalaButaca.getButacas(idSala).then(data => {
            setData(data)
            setLoading(false)
        })

    }, [ idSala ])

    return (<>
        { !loading && <ButacaMap butacas={ data } /> }
    </>)
};

export default SeleccionButaca;