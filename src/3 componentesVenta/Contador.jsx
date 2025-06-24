import { useContext, useEffect, useState } from "react";
import { addSeconds, format, subSeconds } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { VentaContext } from "./VentaContextProvider";

const Contador = () => {
    const navigate = useNavigate();
    const { tiempo, setTiempo } = useContext(VentaContext).general;


    useEffect(() => {
        let timeOut = false;

        setTimeout(() => {
            if (tiempo.getMinutes() == 0 && tiempo.getSeconds() == 0 && !timeOut) {
                timeOut = true;
                const myModal = new bootstrap.Modal(document.getElementById("contadorBackdrop"));
                myModal.show();
                return;
            }
    
            let nuevoTiempo = subSeconds(tiempo, 1);
            setTiempo(nuevoTiempo);
        }, 1000);
    }, [ tiempo ])

    const onVolver = () => {
        navigate(-1);
    }

    return (<>
    <div className="text-center p-1 text-primary border border-2 border-primary mb-3 fs-4 rounded-4">
        { "Restante: " + format(tiempo, "mm:ss") }
    </div>

    
    <div className="modal fade" id="contadorBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="contadorBackdropLabel" aria-hidden="true">
            <div className="modal-dialog w-25 modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-center">
                  <h1 className="modal-title fs-2" id="contadorBackdropLabel">Aviso</h1>
                </div>
                <div className="modal-body">
                  <h2 className='text-center'>
                    ¡El tiempo de compra se ha terminado!
                  </h2>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onVolver}>Volver</button>
                </div>
              </div>
            </div>
        </div>
    </>)
};

export default Contador;