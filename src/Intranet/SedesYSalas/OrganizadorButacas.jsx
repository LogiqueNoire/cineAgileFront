import { useState } from "react";

import "./OrganizadorButacas.css";

const SeccionBotones = ({ onClick, row, col }) => {
    return (
        <div className="boton-sec" data-row={row} data-col={col}>
            <button tabIndex={-1} className="boton-sec-substract" onClick={onClick}>-</button>
            <button tabIndex={-1} className="boton-sec-add" onClick={onClick}>+</button>
        </div>
    );
}

const OrganizadorButacas = ({ setButacasExt }) => {
    const [ butacas, setButacas ] = useState(new Array(5).fill().map(el => new Array(5).fill(null)));

    const btonOnClick = (evt) => {
        evt.preventDefault();

        const parent = evt.target.parentNode;
        const row = +parent.dataset.row;
        const col = +parent.dataset.col;
        const operador = evt.target.textContent;

        if (!Number.isNaN(col)) {
            if (operador == "-" && butacas[0].length <= 5)
                return;

            const newButacas = butacas.map(el => { 
                if (operador == "+")
                    el.splice(col, 0, null);
                else
                    el.splice(col, 1);

                return el; 
            });
            setButacas(newButacas);
        }
        else if (!Number.isNaN(row)) {
            if (operador == "-" && butacas.length <= 5)
                return;

            const newButacas = butacas.map(el => el);

            if (operador == "+" && newButacas.length < 26)
                newButacas.splice(row, 0, new Array(newButacas[0].length).fill(null))
            else if (operador == "-")
                newButacas.splice(row, 1);

            setButacas(newButacas);
        }
    }

    const inputOnChange = (evt) => {
        const row = +evt.target.dataset.row;
        const col = +evt.target.dataset.col;

        const newButacas = butacas.map(el => el);
        const estadoActual = newButacas[row][col];
        const nuevoEstado = estadoActual == null ? "activo" : (estadoActual == "discapacitado" ? null : "discapacitado");
        newButacas[row][col] = nuevoEstado;

        setButacas(newButacas);
        extraerButacas();
    }

    const maxCols = butacas[0].length;
    const maxRows = butacas.length;

    const filas = [];

    const thead2 = [ <td></td>, <td></td> ];
    for (let i = 0; i < maxCols; i++)
        thead2.push(<td key={"xi" + i}><div className="d-flex justify-content-center">{i + 1}</div></td>)

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

            let td = (
                <td key={key}>
                    <div className="celda">
                        <input 
                            type="checkbox" 
                            data-estado={celda ? celda : "none"} 
                            checked={celda ? true : false} 
                            onChange={inputOnChange} 
                            data-row={i} 
                            data-col={j}
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

    const extraerButacas = () => {
        const butacasProcesadas = butacas.reduce((acc, el, idx) => {
            const columnas = el.map((c, cidx) => {
                if (c != null)
                    return { fila: idx, columna: cidx, discapacitado: c == "discapacitado" };

                return null;
            }).filter(el => el != null);

            if (columnas.length != 0)
                return [ ...acc, ...columnas ];
            else return acc;
        }, []);

        setButacasExt(butacasProcesadas);
    }

    return (
        <div>
            <div className="mb-5">
                Instrucciones:
                <ul>
                    <li>Para cambiar el tipo de butaca, hacer clic en una celda.</li>
                    <li>Al pasar el cursor debajo del los números de cada columna, o a la derecha de cada letra, aparecerán dos botones.</li>
                    <li>Utilice estos botones para agregar o eliminar filas/columnas.</li>
                </ul>
            </div>

            <table className="org-tabla mb-4">
                <thead>
                    <tr>{thead2}</tr>
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default OrganizadorButacas;