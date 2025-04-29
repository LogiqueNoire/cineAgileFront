import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';

import { useState, useEffect } from 'react';

const SeleccionButaca = () => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        SalaButaca.getButacas(1).then(data => {
            setData(data)
            setLoading(false)
        })

    }, [])

    return (<>
        { !loading && <ButacaMap butacas={ data } /> }
    </>)
};

export default SeleccionButaca;