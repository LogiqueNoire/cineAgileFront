import { useState } from "react";

import "./OrganizadorButacas.css";
import SalaButaca from "../../servicios/SalaButaca";

const SeccionBotones = ({ onClick, row, col }) => {
    return (
        <div className="boton-sec" data-row={row} data-col={col}>
            { false &&
                <>
                    <button tabIndex={-1} className="boton-sec-substract" onClick={onClick}>-</button>
                    <button tabIndex={-1} className="boton-sec-add" onClick={onClick}>+</button>
                </>
            }
        </div>
    );
}

const EditorButacas = ({ cambios, setCambios, butacasExistentes }) => {
    const [ butacas ] = useState((() => {
        if (butacasExistentes && butacasExistentes.length == 0)
            return [];

        const [ max_row, max_col ] = SalaButaca.convButacasAMatriz(butacasExistentes);
        const but = new Array(max_row + 1).fill().map(el => new Array(max_col + 1).fill(null));

        butacasExistentes.forEach(el => {
            but[el.fila][el.columna] = { 
                tipo: el.discapacitado ? "discapacitado" : "activo",
                activo: el.activo,
                id: el.id
             };
        })

        return but;
    })());

    if (butacas.length == 0) {
        return (
            <div className="fs-4 text-center">
                Nada que mostrar.
            </div>
        )
    }

    const btonOnClick = (evt) => {
        evt.preventDefault();
    }

    const inputOnChange = (evt) => {
        const row = +evt.target.dataset.row;
        const col = +evt.target.dataset.col;
        const id = +evt.target.dataset.id;
        
        if (butacas[row][col]) {
            if (cambios.find(el => el.id == id)) {
                setCambios(cambios.filter(el => el.id != id ));
            }
            else {
                setCambios([ ...cambios, { row, col, id, accion: butacas[row][col].activo ? "desactivar" : "activar" } ]);
            }
        }
    }

    const maxCols = butacas[0].length;
    const maxRows = butacas.length;

    const filas = [];

    const numerosCol = [ <td></td>, <td></td> ];
    for (let i = 0; i < maxCols; i++)
        numerosCol.push(<td key={"xi" + i}><div className="d-flex justify-content-center">{i + 1}</div></td>)

    const thead = [ <td></td> ];
    for (let i = 0; i < maxCols; i++) 
        thead.push(<td key={"i" + i}><SeccionBotones onClick={btonOnClick} col={i} /></td>)
    thead.push(<td key={"i" + maxCols}><SeccionBotones onClick={btonOnClick} col={maxCols} /></td>)
 
    for (let i = 0; i < maxRows; i++) {
        const columnas = [];
        
        columnas.push(<>
            <td key="--x--_">
                <div className="px-2">{ String.fromCharCode('A'.charCodeAt(0) + i) }</div>
            </td>
        
            <td key="--x--">
                <SeccionBotones onClick={btonOnClick} row={i} />
            </td>
        </>)

        for (let j = 0; j < maxCols; j++) {
            let celda = butacas[i][j];
            let key = `${i}-${j}`

            const enCambio = cambios.find(el => el.row == i && el.col == j);
            const enCambioClase = `${enCambio ? ("cambiar-a-" +  (celda && !celda.activo ? "activo" : "inactivo") ) : "" }`

            let td = (
                <td key={key}>
                    <div className="celda">
                        <input 
                            className={`${enCambioClase} ${celda && !celda.activo ? "celda-desactivada" : ""}`}
                            type="checkbox" 
                            data-estado={celda ? celda.tipo : "none"} 
                            checked={celda ? true : false}
                            onChange={inputOnChange} 
                            data-row={i}
                            data-col={j}
                            data-id={celda ? celda.id : ''}
                        />
                    </div>
                </td>
            )

            columnas.push(td);
        }

        filas.push(<tr key={i}>{columnas}</tr>);
    }

    filas.push(<tr key="---">
        <td></td>
        <td>
            <SeccionBotones onClick={btonOnClick} row={maxRows} />
        </td>
    </tr>)

    const extraerCambios = () => {
        const cambiosProcesados = cambios.map(el => ({
            idButaca: el.id, accion: butacas[el.row][el.col].activo ? "desactivar" : "activar"
        }))
        setCambios(cambiosProcesados);
    }

    return (
        <div>
            <div className="mb-5">
                Instrucciones:
                <ul>
                    <li>Clic en una celda inactiva para activarla.</li>
                    <li>Clic en una celda activa para desactivarla.</li>
                </ul>
            </div>

            <table className="org-tabla mb-4">
                <thead>
                    <tr>{numerosCol}</tr>
                    <tr>{thead}</tr>
                </thead>
                <tbody>
                    { filas }
                </tbody>
            </table>

            <div className='border border-dark p-2'>
                <h4 className="text-center mb-4">Leyenda</h4>
                <table className="d-flex justify-content-center">
                    <tbody>
                        <tr className=''>
                            <td>
                                <div className="celda">
                                    <input type="checkbox" data-estado="none" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Vacío</h4>
                            </td>
                            <td>
                                <div className="celda">
                                    <input type="checkbox" checked={true} data-estado="discapacitado" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Discapacitado</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="celda">
                                    <input type="checkbox" checked={true} data-estado="activo" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Butaca normal</h4>
                            </td>
                            <td>
                                <div className="celda">
                                    <input className="celda-desactivada" type="checkbox" checked={true} data-estado="activo" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Celda desactivada</h4>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="celda">
                                    <input className="cambiar-a-activo celda-desactivada" type="checkbox" checked={true} data-estado="activo" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Activando</h4>
                            </td>
                            <td>
                                <div className="celda">
                                    <input className="cambiar-a-inactivo celda-desactivada" type="checkbox" checked={true} data-estado="activo" readOnly onClick={(e) => e.preventDefault()} />
                                </div>
                            </td>
                            <td>
                                <h4 className="mx-2">Desactivando</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default EditorButacas;