import { useEffect, useState } from "react";
import BotonCarga from "@/components/BotonCarga";
import Sede from "@/services/Sede";
import Usuario from "@/services/Usuario";
import { env } from "@/configuracion/backend";
import { ordenamientoAlfa } from "@/utils";

const FormularioUsuario = ({ actualizar }) => {
    const [sedes, setSedes] = useState([]);

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

    useEffect(() => {
        Sede.mostrarSedesActivas().then(res => {
            setSedes(res);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (submitting)
            return;

        setSubmitting(true);
        setError(null);

        const form = {
            username,
            password,
            sedeId: sedeSeleccionada
        }

        env === "dev" && console.log(form);

        Usuario.crearUsuario(form).then(() => {
            actualizar();
        }).catch(error => {
            setError(error.response.data);
            window.scrollTo({ top: 0 });
        }).finally(_ => {
            setSubmitting(false);
        })
    }

    return (
        <div className="d-flex flex-column bg-white mb-4 mt-4 align-items-center">
            {
                error &&
                <div className="bg-danger bg-opacity-10 border border-1 border-danger rounded p-3 mb-3">
                    <div className="text-center text-danger">{error}</div>
                </div>
            }

            <form onSubmit={onSubmit} action="post" className="d-flex flex-column shadow rounded-4 p-5 gap-3 col-12 col-lg-6">
                <h2 className="fs-1 text-center ancizar-sans-regular mb-0">Nuevo usuario</h2>
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col-12 col-sm-5 col-md-5">
                        <label htmlFor="username" className="form-label">Nombre de usuario</label>
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" className="form-control" id="username" required={true} />
                    </div>

                    <div className="col-12 col-sm-6 col-md-6">
                        <label htmlFor="sedeAsignada" className="form-label">Sede</label>
                        <select onChange={(e) => { setSedeSeleccionada(e.target.value) }} defaultValue={""} className="form-select" name="sedeAsignada" id="sedeAsignada" required={true}>
                            <option value={""} disabled={true}>Seleccionar sede</option>
                            {sedes.sort(ordenamientoAlfa).map(sede => (
                                <option key={sede.id} value={sede.id}>{sede.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col-12 col-sm-5 col-md-5">
                        <label htmlFor="password" className="form-label" required={true}>Contraseña</label>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
                    </div>

                    <div className="col-12 col-sm-5 col-md-6">
                        <label htmlFor="passwordConf" className="form-label" required={true}>Confirmar contraseña</label>
                        <input value={passwordConf} onChange={(e) => { setPasswordConf(e.target.value) }} type="password" className="form-control" id="passwordConf" />
                    </div>
                </div>
                <div className="d-flex flex-row gap-3">

                    <div>
                        <div>El usuario debe:</div>
                        <ul>
                            <li>Tener mínimo 3 caracteres.</li>
                            <li>Contener solo caracteres alfanuméricos.</li>
                        </ul>
                        <div>La contraseña debe:</div>
                        <ul>
                            <li>Tener mínimo 8 caracteres.</li>
                            <li>Contener solo caracteres alfanuméricos.</li>
                            <li>Combinar minúsculas y mayúsculas.</li>
                            <li>Contener al menos un número.</li>
                        </ul>
                    </div>
                </div>


                <BotonCarga submitting={submitting} type="submit" className="btn btn-primary btn-primary-gradient col-12 col-md-8 col-lg-7 align-self-center">
                    Agregar usuario
                </BotonCarga>
            </form>
        </div>

    );
};

export default FormularioUsuario;