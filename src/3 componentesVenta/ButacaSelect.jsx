import './ButacaMap'
import ButacaMap from './ButacaMap';
import SalaButaca from '../servicios/SalaButaca';
import Funcion from '../servicios/Funcion';
import { VentaContext } from './VentaContextProvider';
import Loading from '../0 componentesGenerales/Loading';
import Entrada from '../servicios/Entrada';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const SeleccionButaca = ({ funcion, prev, next, onCancelar }) => {
  const navigate = useNavigate();
  const context = useContext(VentaContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { butacaContext } = context;

  const [ moving, setMoving ] = useState(false);

  useEffect(() => {
    Funcion.mostrarButacasDeFuncion(funcion.idFuncion).then(data => {
      const butacas = data.map(el => ({ ...el.butaca, ocupado: el.ocupado }))
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
  }, [funcion])

  const volver = () => {
    onCancelar(() => {
      navigate(-1);
      prev();
    })
  }


  const siguiente = () => {
    if (moving) return;
    setMoving(true);

    const fechaAhora = (new Date(Date.now()));
    const info = {
      id_funcion: funcion.idFuncion,
      entradas: butacaContext.seleccionadas.map(el => ({ id_butaca: +el.id })),
      tiempoRegistro: format(fechaAhora, "yyyy-MM-dd.HH:mm:ss").replace(".", "T")
    };

    Entrada.bloquearEntradas(info).then(res => {
      next();
    }).catch(err => {
      console.log(err);
    })
  }


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
      {error && <h2>Error!</h2>}
      {loading ? 
      <div className='d-flex justify-content-center'>
        <Loading style={{ margin: "15rem" }} />
      </div> :
        <>
          <div className='d-flex flex-column gap-2'>
            <ButacaMap isSelectedFunc={estaEnSeleccionados} onButacaSelect={onButacaSelect} butacas={data} />
            <div className='border border-dark butaca-leyenda p-2 mb-4'>
              <h4 className="text-center mb-2">Leyenda</h4>
              <table className="butaca-table butaca-hist d-flex justify-content-center">
                <tbody>
                  <tr className=''>
                    <td className=''>
                      <div className='butaca-celda-wrapper'>
                        <input type="checkbox" className="butaca-celda butaca-libre" readOnly onClick={(e) => e.preventDefault()} />
                      </div>
                    </td>
                    <td className=''>
                      <h4 className="butaca-label mx-2">Libre</h4>
                    </td>
                    <td className=''>
                      <div className='butaca-celda-wrapper'>
                        <input type="checkbox" className="butaca-celda butaca-discapacitado" readOnly onClick={(e) => e.preventDefault()} />
                      </div>
                    </td>
                    <td className=''>
                      <h4 className="butaca-label mx-2">Discapacitado</h4>
                    </td>
                  </tr>
                  <tr className=''>
                    <td>
                      <div className='butaca-celda-wrapper'>
                        <input type="checkbox" className="butaca-celda butaca-ocupado" readOnly checked onClick={(e) => e.preventDefault()} />
                      </div>
                    </td>
                    <td>
                      <h4 className="butaca-label mx-2">Ocupado</h4>
                    </td>
                    <td>
                      <div className='butaca-celda-wrapper'>
                        <input type="checkbox" className="butaca-celda butaca-libre" readOnly checked onClick={(e) => e.preventDefault()} />
                      </div>
                    </td>
                    <td>
                      <h4 className="butaca-label mx-2">Seleccionado</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal col-12 fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog w-25 modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-center">
                  <h1 className="modal-title fs-2" id="staticBackdropLabel">Aviso</h1>
                </div>
                <div className="modal-body">
                  <h2 className='text-center'>
                    ¡Máximo de butacas seleccionadas!
                  </h2>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-4 align-items-center">
          { /* <button className="btn btn-primary" onClick={volver} >Volver</button> */ }
            <button className="btn btn-primary" disabled={context.butacaContext.seleccionadas.length === 0 || moving} onClick={siguiente}>Siguiente</button>
          </div>
        </>
      }

    </>)
};

export default SeleccionButaca;