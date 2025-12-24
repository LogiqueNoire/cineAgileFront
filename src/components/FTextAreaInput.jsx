import { useState } from "react";

import guardar from '@/assets/operaciones/guardar.svg';
import pencilSvg from "@/assets/operaciones/pencil.svg"

const FTextAreaInput = ({ className='', valorPorDefecto, label, onSave, atributo, required }) => {
    const [ modo, setModo ] = useState("read"); // read, edit, submitting
    const [ input, setInput ] = useState(valorPorDefecto);
    const [ status, setStatus ] = useState({ error: false, msg: null });

    const onEditClick = () => {
        setModo("edit");
    }

    const onSaveClick = () => {
        if (required && input.trim() == '') {
            setStatus({ error: true, msg: "El campo no puede estar vacío." })
            setInput(input.trim());
            return;
        }

        if (modo == "submitting") return;
        setModo("submitting");

        onSave({ [atributo]: input.trim() }).then(res => {
            setModo("read");
            setInput(input.trim());
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
        setInput(evt.target.value);

        if (status.error)
            setStatus({ error: false, msg: null });
    }

    return (
        <div className={`${className} py-2 px-4 border border-3 rounded`}>
        <div className="d-flex justify-content-between mb-3">
            <div className="fs-2">Sinopsis</div>
            <button className="btn btn-primary py-2 px-4 align-self-start" onClick={ modo == "read" ? onEditClick : onSaveClick } disabled={ modo == "submitting" }>
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

        <div className={`input-group has-validation`}>

            <div className={`form-floating ${ status.error && 'is-invalid' }`}>
                <textarea
                  maxLength={501}
                  style={{ "min-height": '200px', overflowY: 'auto' }}
                  className={`form-control ${ status.error && "is-invalid" }`}
                  disabled={ modo != "edit" }
                  id={ label } 
                  placeholder={ label }
                  value={input}
                  onChange={onChange}
                ></textarea>
                <label htmlFor={ label }>{ label }</label>
            </div>
            
            { status.msg && 
                <div class="invalid-feedback">
                    { status.msg }
                </div>
            }
        </div>
        
        </div>
    )
}

export default FTextAreaInput;