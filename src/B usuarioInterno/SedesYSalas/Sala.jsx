import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrganizadorButacas from "./OrganizadorButacas";
import SalaButaca from "../../servicios/SalaButaca";
import BotonCarga from "../../0 componentesGenerales/BotonCarga";
import ButacaMap from "../../3 componentesVenta/ButacaMap";

const Sala = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sede = null, sala = null, modo = "detalle" } = location.state || {};

    const [ codigoSala, setCodigoSala ] = useState(sala?.codigoSala ? sala.codigoSala : "");
    const [ categoria, setCategoria ] = useState(sala?.categoria ? sala.categoria : "");
    const [ butacas, setButacas ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ submitting, setSubmitting ] = useState(false);


    // Si no hay una sede de entrada, entonces volver al menú de
    // sedes y salas.
    useEffect(() => {
        const noExisteSede = !sede;
        const noExisteInfoSala = !sala && (modo == "detalle" || modo == "editar");

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

        const crearSalaReq = {
            idSede: sede.id,
            codigoSala,
            categoria,
            butacas
        };

        setError(null);
        SalaButaca.crearSala(crearSalaReq).then(res => {
            navigate("/intranet/sedesysalas", { state: { sedeRedir: sede } });
            console.log("Sala creada!");
        }).catch(err => {
            if (err.response.status == 409) {
                setError("¡Ya existe una sala dentro de la sede con el mismo código!");
            }
            console.log(err);
        }).finally(_ => {
            window.scrollTo({ top: 0 });
            setSubmitting(false);
        })
    }

    return (
        <div className="container-fluid py-3 col-10">
            <form method="post" onSubmit={onGrabar} className="d-flex flex-column gap-3">
                {
                    error &&
                    <div className="row bg-danger bg-opacity-10 border border-danger rounded shadow p-3">
                        <div className="text-center text-danger">{ error }</div>
                    </div>
                }

                <div className="row rounded shadow p-5 bg-white row">
                    <h2>Sede</h2>
                    <div className="row my-4">
                        <div className="mb-3 col-4">
                            <label htmlFor="sede" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="sede" value={ sede.nombre } disabled={true} />
                        </div>
                    </div>
                    
                    <hr />

                    <h2>Sala</h2>
                    <div className="row my-4">
                        <div className="mb-3 col-4">
                            <label htmlFor="codigoSala" className="form-label">Código</label>
                            <input 
                                onChange={codigoSalaOnChange} 
                                value={codigoSala} 
                                type="text" 
                                className="form-control" 
                                id="codigoSala" 
                                placeholder="Código" 
                                required={ true }
                                disabled={ modo == "detalle" }
                            />
                        </div>
                        
                        <div className="col-4">
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <select 
                                onChange={categoriaOnChange} 
                                value={categoria} 
                                className="form-select" 
                                id="categoria" 
                                required={ true }
                                disabled={ modo == "detalle" }
                            >
                                <option value="" disabled={true}>Selecciona una categoría</option>
                                <option value="Regular">Regular</option>
                                <option value="Prime">Prime</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white row rounded border shadow p-5 overflow-auto d-flex flex-column">
                    <h2>Organización de la sala</h2>
                    <div className="my-5 col-10 align-self-center">
                        { modo == "crear" ?
                            <OrganizadorButacas setButacasExt={setButacas} /> :
                            <ButacaMap butacas={ sala.butacas } />
                        }
                    </div>
                </div>

                {   modo != "detalle" &&
                    <div className="bg-white row rounded border shadow p-5 overflow-auto d-flex flex-column">
                        <BotonCarga type={"submit"} className={"btn btn-primary w-25 align-self-center"} submitting={submitting}>
                            Grabar
                        </BotonCarga>
                    </div>
                }


            </form>
        </div>
    )
}

export default Sala;