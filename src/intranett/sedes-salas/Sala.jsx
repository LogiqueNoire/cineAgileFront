import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrganizadorButacas from "./OrganizadorButacas";
import SalaButaca from "@/services/SalaButaca";
import BotonCarga from "@/components/BotonCarga";
import EditorButacas from "./EditorButacas";
import { env } from "@/configuracion/backend";
import salaIcon from '@/assets/sala2.svg';

const Sala = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sede = null, sala = null, modo = "editar" } = location.state || {};

    const [codigoSala, setCodigoSala] = useState(sala?.codigoSala ? sala.codigoSala : "");
    const [categoria, setCategoria] = useState(sala?.categoria ? sala.categoria : "");
    const [butacas, setButacas] = useState([]);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    // Si no hay una sede de entrada, entonces volver al menú de
    // sedes y salas.
    useEffect(() => {
        const noExisteSede = !sede;
        const noExisteInfoSala = !sala && (modo == "editar" || modo == "editar");

        if (noExisteSede || noExisteInfoSala) {
            navigate("/intranet/sedesysalas")
        }

    }, [])

    const codigoSalaOnChange = (evt) => {
        setCodigoSala(evt.target.value);
    }

    const categoriaOnChange = (evt) => {
        setCategoria(evt.target.value);
    }

    const onGrabar = (evt) => {
        evt.preventDefault();

        if (submitting) return;

        setSubmitting(true);

        setError(null);

        if (modo == "crear") {
            const crearSalaReq = {
                idSede: sede.id,
                codigoSala,
                categoria,
                butacas
            };

            SalaButaca.crearSala(crearSalaReq).then(res => {
                navigate("/intranet/sedesysalas", { state: { sedeRedir: sede } });
                env === "dev" && console.log("Sala creada!");
            }).catch(err => {
                console.log(err);
                if (err.response.status == 409) {
                    setError("¡Ya existe una sala dentro de la sede con el mismo código!");
                } else if (err.response.status == 500) {
                    setError("Error interno.")
                } else {
                    setError(err.response.data);
                }
            }).finally(_ => {
                window.scrollTo({ top: 0 });
                setSubmitting(false);
            })
        }

        if (modo == "editar") {
            const editarSalaReq = {
                idSala: sala.id,
                codigoSala,
                categoria,
                butacas: butacas.map(el => ({ idButaca: el.id, accion: el.accion }))
            }

            SalaButaca.editarSala(editarSalaReq).then(res => {
                navigate("/intranet/sedesysalas", { state: { sedeRedir: sede } });
                env === "dev" && console.log("Sala editada!");
            }).catch(err => {
                setError(err.response.data);
            }).finally(_ => {
                window.scrollTo({ top: 0 });
                setSubmitting(false);
            })
        }
    }

    env === "dev" && console.log(butacas);

    return (
        <div className="container-fluid py-3 col-10 pt-4">
            <form method="post" onSubmit={onGrabar} className="d-flex flex-column gap-3 align-items-center">
                {error &&
                    <div className="row bg-danger bg-opacity-10 border border-danger rounded-4 shadow p-3">
                        <div className="text-center text-danger">{error}</div>
                    </div>}
                <div className="col-12 col-sm-11 col-sm-9 col-md-8 col-lg-7 col-xl-5 rounded-4 shadow p-5 bg-white d-flex flex-column gap-4">
                    <div className="d-flex flex-row align-items-center gap-3 justify-content-center">
                        <h2 className="ancizar-sans-regular mb-0 cineagile-blue-500">Sala</h2>
                        <img src={salaIcon} alt="" style={{
                            height: '35px',
                            filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)"
                        }} />
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-center">
                        <label htmlFor="codigoSala" className="form-label mb-0">Código</label>
                        <input
                            onChange={codigoSalaOnChange}
                            value={codigoSala}
                            type="text"
                            className="form-control"
                            id="codigoSala"
                            placeholder="Código"
                            required={true}
                        />
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-center">
                        <label htmlFor="categoria" className="form-label mb-0">Categoría</label>
                        <select
                            onChange={categoriaOnChange}
                            value={categoria}
                            className="form-select"
                            id="categoria"
                            required={true}
                        >
                            <option value="" disabled={true}>Selecciona una categoría</option>
                            <option value="Regular">Regular</option>
                            <option value="Prime">Prime</option>
                        </select>
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-center">
                        <label htmlFor="sede" className="form-label mb-0">Sede</label>
                        <input type="text" className="form-control" id="sede" value={sede.nombre} disabled={true} />
                    </div>
                </div>

                <div className="bg-white row rounded-4 shadow p-5 overflow-auto d-flex flex-column">
                    <h2 className="ancizar-sans-regular mb-0 cineagile-blue-500 text-center">Organización de la sala</h2>
                    <div className="my-4 align-self-center">
                        {modo != "editar" ?
                            <OrganizadorButacas setButacasExt={setButacas} /> :
                            <EditorButacas cambios={butacas} setCambios={setButacas} butacasExistentes={sala.butacas} />
                        }
                    </div>
                    <BotonCarga type={"submit"} className={"btn btn-primary btn-primary-gradient w-100 align-self-center"} submitting={submitting}>
                        Guardar sala
                    </BotonCarga>
                </div>

            </form>
        </div>
    )
}

export default Sala;