import { useContext, useMemo } from 'react';
import './ButacaMap.css'

import { VentaContext } from './VentaContextProvider';

const ButacaMap = ({ butacas }) => {
    const { butacaContext } = useContext(VentaContext)
    const contexto = useContext(VentaContext);

    const estaEnSeleccionados = (pos) => {

        return butacaContext.seleccionadas.some(el => el.f === pos.f && el.c === pos.c)
    }

    const inputOnChange = (el) => {
        const pos = { f: +el.target.dataset.fila, c: +el.target.dataset.columna }
        contexto.pruebaInicialContext.setPruebaInicial(1);
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
            let libre = !butaca ? 'butaca-no-existe' : butaca.ocupado ? 'butaca-ocupado' : 'butaca-libre';
            let discapacitado = butaca && butaca.discap ? 'butaca-discapacitado' : ''

            fila.push(<td key={key}>
                <input
                    className={`butaca-celda ${libre} ${discapacitado}`}
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
        <div className='d-flex flex-column justify-align-center butaca-map'>
            <h1>Pantalla</h1>
            <div className='butaca-container'>
                <table className="butaca-table">
                    <tbody>
                        {tablaFilas}
                    </tbody>
                </table>
            </div>
            <div className='border border-dark butaca-leyenda p-2'>
                <h4 className="text-center mb-2">Leyenda</h4>
                <table className="butaca-table d-flex justify-content-center">
                    <tbody>
                        <tr className=''>
                            <td className=''>
                                <input type="checkbox" className="butaca-celda butaca-libre" readOnly onClick={(e) => e.preventDefault()} />
                            </td>
                            <td className=''>
                                <h4 className="butaca-label mx-2">Libre</h4>
                            </td>
                            <td className=''>
                                <input type="checkbox" className="butaca-celda butaca-discapacitado" readOnly onClick={(e) => e.preventDefault()} />
                            </td>
                            <td className=''>
                                <h4 className="butaca-label mx-2">Discapacitado</h4>
                            </td>
                        </tr>
                        <tr className=''>
                            <td>
                                <input type="checkbox" className="butaca-celda butaca-ocupado" readOnly onClick={(e) => e.preventDefault()} />
                            </td>
                            <td>
                                <h4 className="butaca-label mx-2">Ocupado</h4>
                            </td>
                            <td>
                                <input type="checkbox" className="butaca-celda butaca-libre" readOnly checked onClick={(e) => e.preventDefault()} />
                            </td>
                            <td>
                                <h4 className="butaca-label mx-2">Seleccionado</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
};

export default ButacaMap;