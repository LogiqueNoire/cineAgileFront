import { useEffect, useState } from "react";
import BotonCarga from "@/components/BotonCarga";
import Sede from "@/services/Sede";
import Usuario from "@/services/Usuario";
import { env } from "@/configuracion/backend";
import { ordenamientoAlfa } from "@/utils";
import { rolesColors } from "../colorsConfig";
import Permiso from "./Permiso";
import { infoIcon } from "@/assets/operaciones";
import { cancelIcon } from "@/assets/operaciones";

const FormularioUsuario = ({ actualizar }) => {
    const [sedes, setSedes] = useState([]);

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

    const [showGuide, setShowGuide] = useState(false)

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
        <div className="d-flex flex-wrap bg-white mb-4 mt-4 align-items-center gap-4 justify-content-center">
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
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col-12 col-sm-5 col-md-5">
                        <div className="d-flex gap-1 align-items-center mb-2">
                            <label htmlFor="text" className="form-label mb-0" required={true}>Rol</label>
                            <button className="btn p-0" onClick={(e) => { e.preventDefault(); setShowGuide(!showGuide) }}>
                                <img src={infoIcon} alt="info icon" className="" style={{ width: "24px", filter: "invert(100%)" }} />
                            </button>
                        </div>
                        <select onChange={(e) => { /*setSedeSeleccionada(e.target.value)*/ }} defaultValue={""} className="form-select" name="sedeAsignada" id="sedeAsignada" required={true}>
                            <option value={""} disabled={true}>Seleccionar rol</option>
                            <option value={"ADMIN"}>ADMIN</option>
                            <option value={"SEDE_ADMIN"} >SEDE ADMIN</option>
                            <option value={"PLANIFICADOR"}>PLANIFICADOR</option>
                        </select>
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
            {showGuide &&
                <div className="modal-terminos-overlay" >
                    <div className="modal-terminos d-flex flex-column align-items-center p-5 rounded-5 ancizar-sans-regular"
                        style={{ "max-height": "80vh", "overflow": "auto", width: "auto" }}>
                        <div className="w-100 position-relative">
                            <button className="btn btn-danger rounded rounded-5 p-2 position-absolute end-0" onClick={() => { setShowGuide(!showGuide) }}>
                                <img src={cancelIcon} alt="" />
                            </button>
                        </div>

                        <table className=" table table-hover">
                            <thead>
                                <tr>
                                    <span className="fs-3 ancizar-sans-regular text-center mb-0">Guía de roles y permisos</span>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="d-flex flex-column gap-2" style={{ width: 'max-content' }}>
                                        <span className={`rounded-5 fw-bold p-1 px-2 text-center`} style={{
                                            backgroundColor: rolesColors[rolesColors.findIndex(e => e[0] === "ADMIN")][1],
                                            color: rolesColors[rolesColors.findIndex(e => e[0] === "ADMIN")][2]
                                        }}>ADMIN</span>
                                        <div className="d-flex flex-row" style={{ width: 'max-content' }}>
                                            <div className="d-flex flex-column" style={{ width: 'max-content' }}>
                                                <span>Operaciones</span>
                                                <Permiso title={"Películas"} isTrue={true}></Permiso>
                                                <Permiso title={"Sedes, salas y butacas"} isTrue={true}></Permiso>
                                                <Permiso title={"Funciones"} isTrue={true}></Permiso>
                                                <Permiso title={"Géneros"} isTrue={true}></Permiso>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span>Insights</span>
                                                <Permiso title={"Analíticas"} isTrue={true}></Permiso>
                                                <Permiso title={"Usuarios"} isTrue={true}></Permiso>
                                                <Permiso title={"Auditorías"} isTrue={true}></Permiso>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="d-flex flex-column gap-2" style={{ width: 'max-content' }}>
                                        <span className={`rounded-5 fw-bold p-1 px-2 text-center`} style={{
                                            backgroundColor: rolesColors[rolesColors.findIndex(e => e[0] === "SEDE_ADMIN")][1],
                                            color: rolesColors[rolesColors.findIndex(e => e[0] === "SEDE_ADMIN")][2]
                                        }}>SEDE ADMIN</span>
                                        <div className="d-flex flex-row" style={{ width: 'max-content' }}>
                                            <div className="d-flex flex-column" style={{ width: 'max-content' }}>
                                                <span>Operaciones</span>
                                                <Permiso title={"Agregar, editar películas"} isTrue={false}></Permiso>
                                                <Permiso title={"Ver películas"} isTrue={true}></Permiso>
                                                <Permiso title={"Sedes, salas y butacas"} isTrue={true}></Permiso>
                                                <Permiso title={"Funciones"} isTrue={true}></Permiso>
                                                <Permiso title={"Géneros"} isTrue={false}></Permiso>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span>Insights</span>
                                                <Permiso title={"Analíticas"} isTrue={true}></Permiso>
                                                <Permiso title={"Usuarios"} isTrue={false}></Permiso>
                                                <Permiso title={"Auditorías"} isTrue={false}></Permiso>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="d-flex flex-column gap-2" style={{ width: 'max-content' }}>
                                        <span className={`rounded-5 fw-bold p-1 px-2 text-center`} style={{
                                            backgroundColor: rolesColors[rolesColors.findIndex(e => e[0] === "PLANIFICADOR")][1],
                                            color: rolesColors[rolesColors.findIndex(e => e[0] === "PLANIFICADOR")][2]
                                        }}>PLANIFICADOR</span>
                                        <div className="d-flex flex-row" style={{ width: 'max-content' }}>
                                            <div className="d-flex flex-column" style={{ width: 'max-content' }}>
                                                <span>Operaciones</span>
                                                <Permiso title={"Agregar, editar películas"} isTrue={false}></Permiso>
                                                <Permiso title={"Ver películas"} isTrue={true}></Permiso>
                                                <Permiso title={"Solo ver sedes y salas"} isTrue={true}></Permiso>
                                                <Permiso title={"Funciones"} isTrue={true}></Permiso>
                                                <Permiso title={"Géneros"} isTrue={false}></Permiso>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span>Insights</span>
                                                <Permiso title={"Analíticas"} isTrue={false}></Permiso>
                                                <Permiso title={"Usuarios"} isTrue={false}></Permiso>
                                                <Permiso title={"Auditorías"} isTrue={false}></Permiso>
                                            </div>
                                        </div>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>}
        </div>

    );
};

export default FormularioUsuario;