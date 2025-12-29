import { useState } from "react";
import { format } from "date-fns";
import { editIcon, saveIcon } from "@/assets/operaciones";

const FDateInput = ({ className = '', valorPorDefecto, label, onSave, atributo, required }) => {
    const [modo, setModo] = useState<"read" | "edit" | "submitting">("read");
    const [input, setInput] = useState(valorPorDefecto || '');
    const [status, setStatus] = useState({ error: false, msg: null });

    const onSaveClick = () => {
        if (required && input.trim() === '') {
            setStatus({ error: true, msg: "El campo no puede estar vacío." })
            return;
        }

        if (modo === "submitting") return;
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
        const { value } = evt.target;
        setInput(value || null);

        if (status.error)
            setStatus({ error: false, msg: null });
    }

    return (
        <div className={`${className} input-group has-validation`}>
            <div className={`form-floating ${status.error && 'is-invalid'}`}>
                <input type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className={`form-control ${status.error && "is-invalid"}`} id={label} placeholder={label} disabled={modo != "edit"}
                    value={input} onChange={onChange} />
                <label htmlFor={label}>{label}</label>
            </div>
            <button className="btn btn-primary py-2 px-4" onClick={modo === "read" ? () => setModo("edit") : onSaveClick} disabled={modo === "submitting"}>
                {modo === "submitting" ?
                    <span className="d-flex align-items-center mx-2 my-2 spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </span>
                    :
                    <>
                        {modo === "read" && <img src={editIcon} alt="editar" />}
                        {modo === "edit" && <img src={saveIcon} alt="guardar" style={{ "width": "32px", "height": "32px" }} />}
                    </>
                }
            </button>

            {status.msg &&
                <div className="invalid-feedback">
                    {status.msg}
                </div>
            }
        </div>

    )
}

export default FDateInput;