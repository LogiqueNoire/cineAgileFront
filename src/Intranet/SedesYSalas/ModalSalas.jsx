import { useEffect, useState } from "react";
import axios from 'axios';
import { url } from '@/configuracion/backend.js'
import Loading from '@/components/Loading/Loading.jsx';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import pencilSvg from "@/assets/operaciones/pencil.svg"
import BotonCarga from "@/components/BotonCarga.jsx";
import iconoApagar from '@/assets/operaciones/apagar.svg'
import SalaButaca from "@/services/SalaButaca.js";
import Toast from "@/components/Toast/Toast.jsx";

export const ModalSalas = ({ onClose, sede }) => {
  const navigate = useNavigate();
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState('')
  const [salas, setSalas] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });

  const consultarSalas = () => {
    axios.get(`${url}/api/intranet/v1/salas?idSede=${sede.id}`, {
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
        : window.confirm('¿Estás seguro de que deseas activar esta sala?');

      if (!confirmado) {
        submitting = false;
        return;
      }

      SalaButaca.cambiarEstado(sala.id, !sala.activo).then((res) => {

        if (sala.activo) {
          setToast({
            tipo: 'toast-info',
            visible: true,
            titulo: 'Sala desactivada',
            mensaje: 'Las funciones asociadas también se ocultarán'
          });
        } else {
          setToast({
            tipo: 'toast-info',
            visible: true,
            titulo: 'Sala activada',
            mensaje: 'Las funciones asociadas también se mostrarán'
          });
        }
        consultar();
      }).catch(err => {
        setToast({
          tipo: 'toast-danger',
          visible: true,
          titulo: 'Error al guardar la sala.',
          mensaje: err.data
        });

      }).finally(_ => {
        submitting = false;
        setTimeout(() => setToast({ visible: false }), 3000);
      })
    }
  }

  const onCambiarEstadoSala = crearOnCambiarEstadoSala();

  return (
    <div className="modal-terminos-overlay">
      <div className="modal-terminos mx-3 d-flex flex-column align-items-center" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
        <h3 className="modal-terminos-title fs-3 my-2">Sede {sede.nombre}</h3>

        <div className="w-100 d-flex justify-content-between gap-2">
          <button className="btn btn-danger btn-danger-gradient fs-5" onClick={onClose}>
            Cerrar
          </button>

          <button className='btn btn-primary btn-primary-gradient' onClick={irACrearSala}>
            Crear nueva sala
          </button>

          { /*

          <button className='btn btn-primary d-flex gap-3' onClick={(e) => agregarSala(e)}>
            <h3 className="mb-0">Guardar nueva sala</h3>
            <img src={guardar} alt="" style={{ height: '22px' }} />
          </button>

          */ }
        </div>

        {loading ?
          <Loading></Loading> :
          salas.length > 0 ?
            <table className='table table-striped border table-hover mt-3'>
              <thead className=''>
                <tr className=''>
                  <td className=''>Sala</td>
                  <td className=''>Categoría</td>
                  <td className=''>Acciones</td>
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
                        <button className="py-1 btn btn-primary py-1 px-2" onClick={() => { onDetallesClick(el) }}><img src={pencilSvg} width={"24px"} height={"24px"} /></button>
                        <BotonCarga
                          onClick={() => onCambiarEstadoSala(el)}
                          className={`btn ${el.activo ? "btn-success rounded-circle" : "btn-danger rounded-circle"} p-1`} >
                          <img src={iconoApagar} style={{ height: '33px' }} />
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

      {<Toast tipo={toast.tipo}
        titulo={toast.titulo}
        mensaje={toast.mensaje}
        visible={toast.visible} />}
    </div>
  );
};