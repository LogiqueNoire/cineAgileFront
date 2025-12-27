import { useState } from "react";
import BotonCarga from "@/components/BotonCarga";
import Usuario from "@/services/Usuario";
import passwordIcon from "@/assets/modulos/password.svg";

const CambiarContra = () => {
    const [contraActual, setContraActual] = useState("");
    const [nuevaContra, setNuevaContra] = useState("");
    const [confirmarContra, setConfirmarContra] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState({ isError: false, msg: null });

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (submitting) return;

        if (nuevaContra == contraActual) {
            setStatus({ isError: true, msg: "La nueva contraseña no puede ser igual a la actual." })
            setSubmitting(false);
            return;
        }

        if (nuevaContra != confirmarContra) {
            setStatus({ isError: true, msg: "La contraseña de confirmación no coincide." })
            setSubmitting(false);
            return;
        }

        setSubmitting(true);

        const formData = {
            contraActual,
            nuevaContra
        };

        Usuario.cambiarContra(formData).then(res => {
            setContraActual("");
            setNuevaContra("");
            setConfirmarContra("");
            setStatus({ isError: false, msg: res });
        }).catch(error => {
            if (error.status == 404)
                setStatus({ isError: true, msg: "Error interno del servidor." });
            else
                setStatus({ isError: true, msg: error.response.data });

            console.log(error);
        }).finally(_ => {
            setSubmitting(false);
        })

    }

    return (
        <form action="" onSubmit={onSubmit}>
            <div className="d-flex flex-column align-items-center container-fluid col-10 bg-white p-5 rounded-4 shadow">
                <div className="d-flex flex-row align-items-center mb-3 gap-2">
                    <h2 className="" style={{ color: '#01217B' }}>Cambiar contraseña</h2>
                    <img src={passwordIcon} alt="Password" className="" style={{ filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)" }} />
                </div>
                {
                    status.msg != null &&
                    <div
                        className={`${!status.isError ? "bg-success" : "bg-danger"} w-100 mb-3 bg-opacity-10 border border-1 ${!status.isError ? "border-success" : "border-danger"} rounded p-3 mb-3`}>
                        <div className={`text-center ${!status.isError ? "text-success" : "text-danger"}`}>{status.msg}</div>
                    </div>
                }

                <div className="d-flex flex-column gap-3 col-12 col-sm-9 col-md-8 col-lg-5 col-xl-5 col-xxl-4">
                    <div>
                        <label htmlFor="contraActual" className="form-label">Contraseña actual</label>
                        <input value={contraActual} onChange={(evt) => setContraActual(evt.target.value)} type="password" className="form-control" id="contraActual" name="contraActual" required={true} />
                    </div>

                    <div>
                        <label htmlFor="contraNueva" className="form-label">Contraseña nueva</label>
                        <input value={nuevaContra} onChange={(evt) => setNuevaContra(evt.target.value)} type="password" className="form-control" id="contraNueva" name="contraNueva" required={true} />
                    </div>

                    <div>
                        <label htmlFor="contraConfirmar" className="form-label">Confirmar contraseña</label>
                        <input value={confirmarContra} onChange={(evt) => setConfirmarContra(evt.target.value)} type="password" className="form-control" id="contraConfirmar" name="contraConfirmar" required={true} />
                    </div>

                    <div>
                        <div>La nueva contraseña debe:</div>
                        <ul>
                            <li>Tener mínimo 8 caracteres.</li>
                            <li>Contener solo caracteres alfanuméricos.</li>
                            <li>Combinar minúsculas y mayúsculas.</li>
                            <li>Contener al menos un número.</li>
                        </ul>
                    </div>

                    <BotonCarga submitting={submitting} type="submit" className="btn btn-primary btn-primary-gradient align-self-center">
                        Guardar contraseña
                    </BotonCarga>

                </div>
            </div>
        </form>

    )
};

export default CambiarContra;