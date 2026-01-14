import { useState } from "react";
import { env } from "@/configuracion/backend";
import { editIcon, saveIcon } from "@/assets/operaciones";

const FTextInputImage = ({ className = '', valorPorDefecto, label, onSave, atributo, required, setImage }) => {
    const [modo, setModo] = useState("read"); //"read" || "edit" || "submitting"
    const [input, setInput] = useState(valorPorDefecto);
    const [status, setStatus] = useState({ error: false, msg: null });

    env === "dev" && console.log(input.trim());

    const onSaveClick = () => {
        if (status.error)
            setStatus({ error: false, msg: null });

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
        setImage(evt.target.value)
        if (status.error)
            setStatus({ error: false, msg: null });
    }

    return (
        <div className={`${className} input-group has-validation`}>
            <div className={`form-floating ${status.error && 'is-invalid'}`}>
                <input maxLength={255} className={`form-control ${status.error && "is-invalid"}`} id={label} placeholder={label} disabled={modo != "edit"} value={input} onChange={onChange} type="text" />
                <label htmlFor={label}>{label}</label>
            </div>
            <button className="btn btn-primary py-2 px-4" onClick={modo == "read" ? () => setModo("edit") : onSaveClick} disabled={modo == "submitting"}>
                {modo == "submitting" ?
                    <span className="d-flex align-items-center mx-2 my-2 spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </span>
                    :
                    <>
                        {modo === "read" && <img src={editIcon} alt="editar" style={{ "width": "32px", "height": "32px" }} />}
                        {modo === "edit" && <img src={saveIcon} alt="guardar" style={{ "width": "32px", "height": "32px" }} />}
                    </>
                }
            </button>

            {status.msg &&
                <div class="invalid-feedback">
                    {status.msg}
                </div>
            }
        </div>
    )
}

export default FTextInputImage;