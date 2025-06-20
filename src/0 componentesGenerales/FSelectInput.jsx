import { useState } from "react";

import guardar from '../assets/guardar.svg';
import pencilSvg from "../assets/pencil.svg"

const FSelectInput = ({ valorPorDefecto, label, onSave, opciones, atributo }) => {
    const [ modo, setModo ] = useState("read"); // read, edit, submitting
    const [ input, setInput ] = useState(valorPorDefecto);

    const onEditClick = () => {
        setModo("edit");
    }

    const onSaveClick = () => {
        if (modo == "submitting") return;
        setModo("submitting");

        onSave({ [atributo]: input }).then(res => {
        }).catch(err => {
        }).finally(_ => {
            setModo("read");
        })
    };

    return (
        <div className="input-group">
            <div className="form-floating">
                <select className="form-select" id={ label } placeholder={ label } disabled={ modo != "edit" } value={ input } onChange={ (evt) => setInput(evt.target.value) }>
                    <option value="" selected disabled={true}>Selecciona un género</option>
                    { opciones.map(el => (
                        <option value={ el }>{el}</option>
                    )) }
                </select>
                <label htmlFor={ label }>{ label }</label>
            </div>
            <button className="btn btn-primary py-2 px-4" onClick={ modo == "read" ? onEditClick : onSaveClick } disabled={ modo == "submitting" }>
                { modo == "submitting" ? 
                <span className="d-flex align-items-center mx-2 my-2 spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </span> 
                : 
                ( modo == "read" ? 
                    <img src={pencilSvg} /> 
                    : modo == "edit" ? 
                        <img src={guardar} style={{ "width": "32px", "height": "32px" }} /> : "" )
                }
            </button>
        </div>
    )
}

export default FSelectInput;