import { useState } from "react";
import desarrolladorIcono from "../../assets/modulos/developer.svg"
import Toast from "../../Toast";
import axios from "axios";
import { url } from "../../configuracion/backend";
import Cookies from "js-cookie";
import MuyPronto from "../../Muypronto";
import dbIcon from "../../assets/modulos/db.svg"

const OpcionesDesarrollador = () => {
    const [toast, setToast] = useState({ title: '', visible: false });

    const poblarBD = async () => {
        let response;
        try {
            response = await axios.post(`${url}/intranet/desarrollador/poblarBD`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

        } catch (error) {
            console.log(error)
            setToast(prev => ({...prev, title: "toast-danger", visible: true }))
        } finally {
            console.log(response)
            setToast(prev => ({...prev, title: "toast-info", visible: true }))
        }
    }

    return (
        <div className="container-fluid col-11 p-2 d-flex flex-column gap-4">
            <div className="d-flex justify-content-center align-items-center gap-2">
                <h2 className="fs-1 fw-bold">Opciones de desarrollador</h2>
                <img src={desarrolladorIcono} alt="" style={{ height: '90px', filter: 'invert(99%)' }} />
            </div>
            <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={poblarBD} style={{width: 'max-content'}}>
                <h2 className="">Poblar la BD con los datos de prueba</h2>
                <img src={dbIcon} alt="" style={{ height: '50px' }} />
            </button>
            <MuyPronto></MuyPronto>
            <Toast tipo={toast.title}
                mensaje={'INSERTS DE PRUEBA EJECUTADOS'}
                visible={toast.visible} />
        </div>
    )
};

export default OpcionesDesarrollador;