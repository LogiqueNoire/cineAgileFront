import { useState } from "react";
import { editIcon, saveIcon } from "@/assets/operaciones";

const FTextAreaInput = ({ className = '', valorPorDefecto, label, onSave, atributo, required, readOnly }) => {
    const [modo, setModo] = useState("read"); //"read" || "edit" || "submitting"
    const [input, setInput] = useState(valorPorDefecto);
    const [status, setStatus] = useState({ error: false, msg: null });

    const onSaveClick = () => {
        if (required && input.trim() === '') {
            setStatus({ error: true, msg: "El campo no puede estar vacío." })
            setInput(input.trim());
            return;
        }

        if (modo === "submitting") return;
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
        <div className={`${className} p-4 shadow rounded-4 d-flex gap-3`}>
            <header className="d-flex flex-column justify-content-between">
                <div className="fs-2 ancizar-sans-regular">Sinopsis</div>
                {!readOnly && <button className="btn btn-primary p-2 align-self-start rounded-circle" onClick={modo === "read" ? () => setModo("edit") : onSaveClick} disabled={modo == "submitting"}>
                    {modo === "submitting" ?
                        <span className="d-flex align-items-center mx-2 my-2 spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </span>
                        :
                        <>
                            {modo === "read" && <img src={editIcon} alt="editar" style={{ "width": "32px", "height": "32px" }} />}
                            {modo === "edit" && <img src={saveIcon} alt="guardar" style={{ "width": "32px", "height": "32px" }} />}
                        </>
                    }
                </button>}
            </header>

            <div className={`input-group has-validation`}>

                <div className={`form-floating ${status.error && 'is-invalid'}`}>
                    <textarea
                        maxLength={501}
                        style={{ "min-height": '100px', overflowY: 'auto' }}
                        className={`form-control rounded-4 ${status.error && "is-invalid"}`}
                        disabled={modo != "edit"}
                        id={label}
                        placeholder={label}
                        value={input}
                        onChange={onChange}
                    ></textarea>
                    <label htmlFor={label}>{label}</label>
                </div>

                {status.msg &&
                    <div class="invalid-feedback">
                        {status.msg}
                    </div>
                }
            </div>

        </div>
    )
}

export default FTextAreaInput;