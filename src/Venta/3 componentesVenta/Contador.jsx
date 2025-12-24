import { useContext, useEffect, useReducer, useState } from "react";
import { differenceInSeconds, addSeconds, format, subMinutes, subSeconds } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { VentaContext } from "./VentaContextProvider";
import iconotiempo from "@/assets/time.svg"

const actualizarTiempo = (aPartirDe) => {
    let ahoraMismo = new Date();
    const diff = differenceInSeconds(aPartirDe, ahoraMismo);
    const contador = addSeconds(new Date(2000,0,0,0,0,0,0), diff);

  return { diff, contador };
};

const Contador = ({ onCancelar }) => {
    const navigate = useNavigate();
    const { tiempo, setTiempo } = useContext(VentaContext).general;
    const [ estado, actualizar ] = useReducer((_, action) => actualizarTiempo(action), tiempo, actualizarTiempo);
    const contexto = useContext(VentaContext);

    let timeOut = false;
    
    setTimeout(() => {
      if (estado.diff == 0 && !timeOut) {
        if (contexto.butacaContext.seleccionadas.length != 0) onCancelar(() => {});
        
        timeOut = true;
        const myModal = new bootstrap.Modal(document.getElementById("contadorBackdrop"));
        myModal.show();
        
        return;
      }

      actualizar(tiempo);
    }, 1000);

    // console.log(estado.contador);

    /*
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

    */

    const onVolver = () => {
      navigate(-1);
    }

    return (<>
    <div className="text-center p-1 px-3 text-primary border border-2 border-primary fs-4 rounded-4 d-flex align-items-center gap-2" style={{width: 'max-content'}}>
      <img src={iconotiempo} alt="" style={{height: '30px'}}/>
      <h4>{format(estado.contador, "mm:ss")}</h4>
        
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