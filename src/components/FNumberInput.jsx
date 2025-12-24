import { useState } from "react";

import guardar from '@/assets/operaciones/guardar.svg';
import pencilSvg from "@/assets/operaciones/pencil.svg"

const FNumberInput = ({ className='', valorPorDefecto, label, onSave, atributo, required }) => {
    const [ modo, setModo ] = useState("read"); // read, edit, submitting
    const [ input, setInput ] = useState("" + valorPorDefecto);
    const [ status, setStatus ] = useState({ error: false, msg: null });

    const onEditClick = () => {
        setModo("edit");
    }

    const onSaveClick = () => {
        if (required && input.trim() == '') {
            setStatus({ error: true, msg: "El campo no puede estar vacío." })
            return;
        }

        if (modo == "submitting") return;
        setModo("submitting");

        onSave({ [atributo]: input }).then(res => {
            setModo("read");
        }).catch(err => {
            if (err.response?.data) {
                setStatus({ error: true, msg: err.response.data })
            } else {
                setStatus({ error: true, msg: "Error del servidor" })
            }
            setModo("edit")
        })
    };

    const onChange = (evt) => {
        const input = evt.target.value;
        if (input.length > 3)
            return;

        const regex = /^\d*\.?\d{0}$/; // permite hasta 0 decimales

        if (input === "" || regex.test(input)) {
            setInput(input) 
        };

        if (status.error)
            setStatus({ error: false, msg: null });
    }

    return (
        <>
        <div className={`${className} input-group has-validation`}>
            <div className={`form-floating ${ status.error && 'is-invalid' }`}>
                <input type="number" min="1" max="500" step="0" 
                    className={`form-control ${ status.error && "is-invalid" }`} id={ label } placeholder={ label } disabled={ modo != "edit" } value={ input }
                    onChange={ onChange } />
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
            
            { status.msg && 
                <div class="invalid-feedback">
                    { status.msg }
                </div>
            }
        </div>
        
        </>
    )
}

export default FNumberInput;