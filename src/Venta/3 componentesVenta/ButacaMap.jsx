import './ButacaMap.css'
import SalaButaca from '@/services/SalaButaca';
import iconoPantalla from '@/assets/pantalla.svg'

const ButacaMap = ({ onButacaSelect, isSelectedFunc, butacas }) => {

    const inputOnChange = (el) => {
        if (onButacaSelect) {
            const pos = { id: el.target.dataset.id, f: +el.target.dataset.fila, c: +el.target.dataset.columna }
            onButacaSelect(pos);
        }
    }

    let [max_row, max_col, matriz] = SalaButaca.convButacasAMatriz(butacas);

    let head = [<td></td>]
    for (let i = 0; i <= max_col; i++) {
        head.push(<td><div className='d-flex justify-content-center'>{i + 1}</div></td>)
    }

    let tablaFilas = []
    let i = 0
    let j = 0
    for (; i <= max_row; i++) {
        let fila = []
        fila.push(<td><div className='text-center'>{String.fromCharCode('A'.charCodeAt(0) + i)}</div></td>)

        for (; j <= max_col; j++) {
            let butaca = matriz[i] ? matriz[i][j] : undefined;
            let key = `${i}-${j}`
            let disabled = !butaca || butaca.ocupado ? true : false;
            let checked = (butaca && butaca.ocupado) || (isSelectedFunc && isSelectedFunc({ f: i, c: j }))
            let discapacitado = butaca && butaca.discap ? 'butaca-discapacitado' : ''
            let libre = !butaca ? 'butaca-no-existe' : butaca.ocupado ? 'butaca-ocupado' : 'butaca-libre';

            if (!isSelectedFunc) {
                checked = false;
            }

            fila.push(<td key={key}>
                <div className='butaca-celda-wrapper'>
                    <input
                        className={`butaca-celda ${libre} ${discapacitado}`}
                        data-id={butaca ? butaca.id : 'x'}
                        data-fila={butaca ? i : 'x'}
                        data-columna={butaca ? j : 'x'}
                        type='checkbox'
                        disabled={disabled}
                        checked={checked}
                        onChange={inputOnChange}
                    />
                </div>
            </td>)
        }
        fila.push(<td><div className='text-center'>{String.fromCharCode('A'.charCodeAt(0) + i)}</div></td>)
        j = 0
        tablaFilas.push(<tr key={`${i}-${j}`}>{fila}</tr>)
    }

    return (
        <div className='d-flex flex-column butaca-map col-12'>
            <h2 className="ancizar-sans-regular mb-0 text-center cineagile-blue-500">Mapa de butacas</h2>
            <span className='ancizar-sans-regular mb-0 fs-3 text-primary text-center mt-3'>Pantalla</span>
            <div className='d-flex justify-content-center'>
                <img src={iconoPantalla} alt="" className='width-pantalla'
                    style={{ filter: "brightness(0) saturate(100%) invert(42%) sepia(82%) saturate(5360%) hue-rotate(209deg) brightness(101%) contrast(107%)" }} />
            </div>
            <div className='mx-auto p-1 d-flex justify-content-center overflow-auto' >
                {butacas.length >= 1 ?
                    <div className='fw-bold overflow-auto'  style={{ maxWidth: "82vw" }}>
                        <table className="butaca-table">
                            <thead>
                                <tr>{head}</tr>
                            </thead>
                            <tbody>
                                {tablaFilas}
                            </tbody>
                        </table>
                    </div>
                    : <div className='fw-bold'>No hay nada que mostrar.</div>
                }

            </div>

        </div>)
};

export default ButacaMap;