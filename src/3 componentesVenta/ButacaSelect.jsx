import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';
import Funcion from '../servicios/Funcion';
import { VentaContext } from './VentaContextProvider';
import Loading from '../0 componentesGenerales/Loading';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const SeleccionButaca = ({ funcion, prev, next }) => {
    const navigate = useNavigate();
    const context = useContext(VentaContext)
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        Funcion.mostrarButacasDeFuncion(funcion.idFuncion).then(data => {
            const butacas = data.map(el => ({ ...el.butaca, ocupado: el.ocupado }) )
            setData(butacas)
        }).catch(err => {
            setError("Error al cargar")
        }).finally(_ => [
            setLoading(false)
        ])

        return () => {
            setLoading(true)
            setError(null)
        }
    }, [ funcion ])

    const volver = () => {
        navigate(-1);
        prev();
    }

    const siguiente = () => {
        next();
    }

  const { butacaContext } = context;

  const estaEnSeleccionados = (pos) => {
      return butacaContext.seleccionadas.some(el => el.f === pos.f && el.c === pos.c)
  }

  const onButacaSelect = (pos) => {
      context.pruebaInicialContext.setPruebaInicial(1);
      if (!estaEnSeleccionados(pos)) {
          if (butacaContext.seleccionadas.length + 1 > 5) {
              const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
              myModal.show();
              return;
          }

          butacaContext.setSeleccionadas([...butacaContext.seleccionadas, pos])
      } else {
          const nuevosElementos = butacaContext.seleccionadas.filter(el => el.f !== pos.f || el.c !== pos.c)
          butacaContext.setSeleccionadas(nuevosElementos)
      }
  }

    return (
        <>
          { error && <h2>Error!</h2> }
          { loading ? <Loading style={ { margin: "15rem" } } /> :
          <>
            <div className='d-flex'>
                  <ButacaMap isSelectedFunc={estaEnSeleccionados} onButacaSelect={onButacaSelect} butacas={ data } />
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Aviso</h1>
                  </div>
                  <div className="modal-body">
                    <h2 className='text-primary text-center'>
                      ¡Máximo de butacas seleccionadas!
                    </h2>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="d-flex justify-content-center gap-4 align-items-center">
                <button className="btn btn-primary" onClick={volver} >Volver</button>
                <button className="btn btn-primary" disabled={context.butacaContext.seleccionadas.length === 0} onClick={siguiente}>Siguiente</button>
            </div>
          </>
          }

        </>)
};

export default SeleccionButaca;