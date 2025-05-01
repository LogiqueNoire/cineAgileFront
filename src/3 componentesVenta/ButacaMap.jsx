import { useMemo } from 'react';
import './ButacaMap.css'

const ButacaMap = ({ butacas }) => {
    const butacaRows = useMemo(() => {
        let max_row, max_col
        let resul = butacas.reduce((acc, el) => {
            max_row = Object.keys(acc).length === 0 ? el.fila : ( max_row > el.fila ? max_row : el.fila )
            max_col = Object.keys(acc).length === 0 ? el.columna : ( max_col > el.columna ? max_col : el.columna )
    
            acc[el.fila] = { ...acc[el.fila], [el.columna]: { id: el.id, discap: el.discapacitado, ocupado: el.ocupado } }
            return acc
        }, { })
    
        console.log(resul, max_row, max_col)
    
        let tablaFilas = []
        let i = 0
        let j = 0
        for (; i < max_row; i++) {
            let fila = []
    
            for (; j < max_col; j++) {
                let butaca = resul[i][j]
                let key = `${i}-${j}`
    
                if (!butaca) {
                    fila.push(<td key={ key }><input type='checkbox' disabled={true}/></td>)
                    continue
                }
    
                fila.push(<td key={ key }><input type='checkbox' /></td>)
            }
    
            j = 0
            tablaFilas.push(<tr key={`${i}-${j}`}>{ fila }</tr>)
        }

        return tablaFilas
    }, [ butacas ])

    return (<>
        <table className="butaca-map">
            <tbody>
                { butacaRows }
            </tbody>
        </table>
    </>)
};

export default ButacaMap;