import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrganizadorButacas from "./OrganizadorButacas";
import SalaButaca from "../../servicios/SalaButaca";

const AddSala = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [ codigoSala, setCodigoSala ] = useState("");
    const [ categoria, setCategoria ] = useState("");
    const [ butacas, setButacas ] = useState([]);
    const [ error, setError ] = useState(null);

    const { sede = null } = location.state || {};

    useEffect(() => {
        if (!sede) {
            navigate("/intranet/sedesysalas")
        }
    })

    const codigoSalaOnChange = (evt) => {
        setCodigoSala(evt.target.value);
    }
    
    const categoriaOnChange = (evt) => {
        setCategoria(evt.target.value);
    }

    const onGrabar = (evt) => {
        evt.preventDefault();

        const crearSalaReq = {
            idSede: sede.id,
            codigoSala,
            categoria,
            butacas
        };

        setError(null);
        SalaButaca.crearSala(crearSalaReq).then(res => {
            navigate("/intranet/sedesysalas"); // Futuro: Que abra automáticamente el modal de salas
            console.log("Sala creada!");
        }).catch(err => {
            if (err.response.status == 409) {
                setError("¡Ya existe una sala dentro de la sede con el mismo código!");
            }
            console.log(err);
        })
    }

    return (
        <div>
            {   error &&
                <div className="text-danger">{ error }</div>
            }
            <form method="post" onSubmit={onGrabar}>
                <h2>Sede: { sede.nombre } </h2>
                <h2>Información general</h2>

                <div className="mb-3">
                    <label htmlFor="codigoSala" className="form-label">Código de sala</label>
                    <input onChange={codigoSalaOnChange} value={codigoSala} type="text" className="form-control" id="codigoSala" placeholder="Código" required />
                </div>
                
                <select onChange={categoriaOnChange} value={categoria} className="form-select" aria-label="Default select example" required>
                    <option value="" disabled={true}>Selecciona una categoría</option>
                    <option value="Regular">Regular</option>
                    <option value="Prime">Prime</option>
                </select>

                <div>
                    <h2>Sala</h2>
                    <OrganizadorButacas setButacasExt={setButacas} />
                </div>

                <button className="btn btn-primary">Grabar</button>
            </form>
        </div>
    )
}

export default AddSala;