import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from '@/configuracion/backend.js'
import Loading from '@/components/loadingt/Loading.jsx';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import BotonCarga from "@/components/BotonCarga.jsx";
import SalaButaca from "@/services/SalaButaca.js";
import { apagarIcon, editIcon } from "@/assets/operaciones";
import { ToastContext } from "@/context/ToastContextProvider";

export const ModalSalas = ({ onClose, sede }) => {
  const { showToast } = useContext(ToastContext)
  const navigate = useNavigate();
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState('')
  const [salas, setSalas] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const consultarSalas = () => {
    axios.get(`${backend_url}/api/intranet/v1/salas?idSede=${sede.id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
    }).then(res => {
      if (res.data) {
        setSalas(res.data.reverse());
        setLoading(false);
      }
    }).catch(err => {
      setError("Servicio no disponible.");
    }).finally(_ => {
      setLoading(false);
    })
  }

  useEffect(() => {
    consultarSalas();
  }, [sede]);

  const irACrearSala = () => {
    navigate("/intranet/sala", { state: { sede, modo: "crear" } })
  }

  const onDetallesClick = (sala) => {
    navigate("/intranet/sala", { state: { sala, sede, modo: "editar" } })
  };

  const crearOnCambiarEstadoSala = () => {
    let submitting = false;

    return (sala) => {
      if (submitting) return;
      submitting = true;

      let confirmado = sala.activo === true ?
        window.confirm('¿Estás seguro de que deseas desactivar esta sala? Las funciones asociadas se ocultarán y no se podrán crear nuevas funciones en esa sede')
        : globalThis.confirm('¿Estás seguro de que deseas activar esta sala?');

      if (!confirmado) {
        submitting = false;
        return;
      }

      SalaButaca.cambiarEstado(sala.id, !sala.activo).then((res) => {

        if (sala.activo) {
          showToast({ tipo: 'toast-info', titulo: 'Sala desactivada', mensaje: 'Las funciones asociadas también se ocultarán' });
        } else {
          showToast({ tipo: 'toast-info', titulo: 'Sala activada', mensaje: 'Las funciones asociadas también se mostrarán' });
        }
        consultarSalas();
      }).catch(err => {
        console.error(err)
        showToast({ tipo: 'toast-danger', titulo: 'Error al guardar la sala.', mensaje: err.data });

      }).finally(_ => {
        submitting = false;
      })
    }
  }

  const onCambiarEstadoSala = crearOnCambiarEstadoSala();

  return (
    <div className="modal-terminos-overlay">
      <div className="modal-terminos mx-3 d-flex flex-column align-items-center" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
        <h3 className="modal-terminos-title fs-3 my-2 ancizar-sans-regular">Sede {sede.nombre}</h3>

        <div className="w-100 d-flex justify-content-between gap-2">
          <button className="btn btn-danger btn-danger-gradient fs-5" onClick={onClose}>
            Cerrar
          </button>

          <button className='btn btn-primary btn-primary-gradient' onClick={irACrearSala}>
            Crear nueva sala
          </button>
        </div>

        {loading ?
          <Loading></Loading> :
          salas.length > 0 ?
            <table className='table table-striped table-hover mt-3'>
              <thead className=''>
                <tr className=''>
                  <td className='fw-bold'>Sala</td>
                  <td className='fw-bold'>Categoría</td>
                  <td className='fw-bold'>Acciones</td>
                </tr>
              </thead>

              <tbody className=''>
                {error && <div className="text-danger text-center">{error}</div>}
                {salas.map((el, id) => (
                  <tr key={el.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="nombre"
                        value={el.codigoSala}
                        onChange={(e) => setCodigoSalaGuardar(e.target.value)}
                        required
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Categoría"
                        name="categoria"
                        value={el.categoria}
                        onChange={(e) => setCategoriaGuardar(e.target.value)}
                        required
                        disabled
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-primary-gradient py-0 px-2" onClick={() => { onDetallesClick(el) }} style={{ lineHeight: "0.9" }}>
                          <img src={editIcon} width={"25px"} height={"25px"} alt="edit" />
                        </button>
                        <BotonCarga
                          onClick={() => onCambiarEstadoSala(el)}
                          className={`btn ${el.activo ? "btn-success rounded-circle" : "btn-danger rounded-circle"} p-1`} >
                          <img src={apagarIcon} style={{ height: '33px' }} alt="apagar" />
                        </BotonCarga>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <span className="mt-3">No hay salas para mostrar</span>
        }
      </div>
    </div>
  );
};