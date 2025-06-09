import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButacaMap from "../../3 componentesVenta/ButacaMap";

const DetalleSala = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { sala = null, sede = null } = location.state || {};

    useEffect(() => {
        if (!sala || !sede) navigate("/intranet");
    }, [])

    console.log(sala.butacas);

    return (<>
        <div className="container-fluid col-10 bg-white border shadow p-5 d-flex flex-column">
            <h2 className="mb-4">Detalles Sala</h2>

            <div className="row">
                <div className="mb-3 col-4">
                    <label htmlFor="sede" className="form-label">Sede</label>
                    <input type="text" className="form-control" id="sede" value={ sede.nombre } disabled={true} />
                </div>
                
                <div className="mb-3 col-4">
                    <label htmlFor="codigoSala" className="form-label">Sala</label>
                    <input type="text" className="form-control" id="codigoSala" value={ sala.codigoSala } disabled={true} />
                </div>
                
                <div className="mb-3 col-4">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <input type="text" className="form-control" id="categoria" value={ sala.categoria } disabled={true} />
                </div>
            </div>
            
            <h2 className="my-4">Organización de las butacas</h2>

            <div className="col-6 align-self-center">
                <ButacaMap butacas={ sala.butacas } />
            </div>
        </div>
    </>)
}

export default DetalleSala;