import { useContext, useMemo } from 'react';
import './ButacaMap.css'

import { VentaContext } from './VentaContextProvider';

const ButacaMap = ({ butacas }) => {
    const { butacaContext } = useContext(VentaContext)

    const estaEnSeleccionados = (pos) => {
        return butacaContext.seleccionadas.some(el => el.f === pos.f && el.c === pos.c)
    }

    const inputOnChange = (el) => {
        const pos = { f: +el.target.dataset.fila, c: +el.target.dataset.columna }

        if (!estaEnSeleccionados(pos)) {
            butacaContext.setSeleccionadas([...butacaContext.seleccionadas, pos])
        } else {
            const nuevosElementos = butacaContext.seleccionadas.filter(el => el.f !== pos.f || el.c !== pos.c)
            butacaContext.setSeleccionadas(nuevosElementos)
        }
    }

    let max_row, max_col
    let resul = butacas.reduce((acc, el) => {
        max_row = Object.keys(acc).length === 0 ? el.fila : (max_row > el.fila ? max_row : el.fila)
        max_col = Object.keys(acc).length === 0 ? el.columna : (max_col > el.columna ? max_col : el.columna)

        acc[el.fila] = { ...acc[el.fila], [el.columna]: { id: el.id, discap: el.discapacitado, ocupado: el.ocupado } }
        return acc
    }, {})

    let tablaFilas = []
    let i = 0
    let j = 0
    for (; i < max_row; i++) {
        let fila = []

        for (; j < max_col; j++) {
            let butaca = resul[i][j]
            let key = `${i}-${j}`
            let disabled = !butaca || butaca.ocupado ? true : false
            let checked = (butaca && butaca.ocupado) || estaEnSeleccionados({ f: i, c: j })

            fila.push(<td key={key}>
                <input
                    data-fila={butaca ? i : 'x'}
                    data-columna={butaca ? j : 'x'}
                    type='checkbox'
                    disabled={disabled}
                    checked={checked}
                    onChange={inputOnChange}
                />
            </td>)
        }

        j = 0
        tablaFilas.push(<tr key={`${i}-${j}`}>{fila}</tr>)
    }

    return (
        <div className='d-block'>
            <table className="butaca-map">
                <tbody>
                    {tablaFilas}
                </tbody>
            </table>

            <p>Seleccionadas: {JSON.stringify(butacaContext.seleccionadas)}</p>
        </div>)
};

export default ButacaMap;