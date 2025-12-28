import { useState } from "react";
import Toast from "@/components/Toast/Toast";
import axios from "axios";
import { env, url } from "@/configuracion/backend";
import Cookies from "js-cookie";
import MuyPronto from "@/components/Muypronto";
import truncateDBicon from "@/assets/modulos/truncateDB.svg"
import { dbIcon, developerIcon } from "@/assets/modulos";

const OpcionesDesarrollador = () => {
    const [toast, setToast] = useState({ tipo: '', title: '', mensaje: '', visible: false });

    const poblarBD = async () => {
        let response;
        try {
            response = await axios.post(`${url}/api/intranet/v1/dev/poblarBD`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

        } catch (error) {
            console.log(error)
            setToast(prev => ({...prev, tipo: "toast-danger", title: 'Datos cargados', mensaje: '¡Ya puede empezar a usar el sistema!', visible: true }))
        } finally {
            env === "dev" && console.log(response)
            setToast(prev => ({...prev, tipo: "toast-info", title: 'Base de datos reiniciada', mensaje: 'Se dejó el superusuario.', visible: true }))
        }
    }

    const reiniciarBD = async () => {
        let response;
        try {
            response = await axios.post(`${url}/api/intranet/v1/dev/reiniciarBD`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

        } catch (error) {
            console.log(error)
            setToast(prev => ({...prev, title: "toast-danger", visible: true }))
        } finally {
            env === "dev" && console.log(response)
            setToast(prev => ({...prev, title: "toast-danger", visible: true }))
        }
    }

    return (
        <div className="container-fluid col-11 p-2 d-flex flex-column gap-4 align-items-center">
            <div className="d-flex justify-content-center align-items-center gap-2">
                <h2 className="fs-1 fw-bold">Opciones de desarrollador</h2>
                <img src={developerIcon} alt="" style={{ height: '90px', filter: 'invert(99%)' }} />
            </div>
            <button className="btn btn-primary btn-primary-gradient d-flex gap-3 align-items-center justify-content-center" onClick={poblarBD} style={{width: 'max-content'}}>
                <h2 className="">Poblar la BD con datos de prueba</h2>
                <img src={dbIcon} alt="" style={{ height: '50px' }} />
            </button>
            <button className="btn btn-danger btn-danger-gradient d-flex gap-3 align-items-center justify-content-center" onClick={reiniciarBD} style={{width: 'max-content'}}>
                <h2 className="">Reiniciar la BD</h2>
                <img src={truncateDBicon} alt="" style={{ height: '50px' }} />
            </button>
            <MuyPronto></MuyPronto>
            <Toast tipo={toast.title}
                mensaje={'INSERTS DE PRUEBA EJECUTADOS'}
                visible={toast.visible} />
        </div>
    )
};

export default OpcionesDesarrollador;