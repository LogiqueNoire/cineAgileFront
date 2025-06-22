import { useEffect, useState } from "react";
import axios from 'axios';
import { url } from '../../configuracion/backend.js'
import Loading from '../../0 componentesGenerales/Loading';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import pencilSvg from "../../assets/pencil.svg"
import BotonCarga from "../../0 componentesGenerales/BotonCarga.jsx";
import iconoApagar from '../../assets/apagar.svg'
import SalaButaca from "../../servicios/SalaButaca.js";
import Toast from "../../Toast.jsx";

export const ModalSalas = ({ onClose, sede }) => {
  const navigate = useNavigate();
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState('')
  const [salas, setSalas] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });

  const consultar = () => {
    axios.get(`${url}/sede/${sede.id}/salas`, {
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
    consultar();
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
      <div className="modal-terminos w-50 d-flex flex-column align-items-center" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
        <h3 className="modal-terminos-title">Sede {sede.nombre}</h3>

        <div className="w-100 d-flex justify-content-between">
          <button className="btn btn-danger" onClick={onClose}>
            Cerrar
          </button>

          <button className='btn btn-primary d-flex gap-3' onClick={irACrearSala}>
            <h3 className="mb-0">Crear nueva sala</h3>
          </button>

          { /*

          <button className='btn btn-primary d-flex gap-3' onClick={(e) => agregarSala(e)}>
            <h3 className="mb-0">Guardar nueva sala</h3>
            <img src={guardarBlanco} alt="" style={{ height: '22px' }} />
          </button>

          */ }
        </div>

        {loading ?
          <Loading></Loading> :
          <table className='table table-striped border table-hover my-4'>
            <thead className=''>
              <tr className=''>
                <td className=''>Sala</td>
                <td className=''>Categoría</td>
                <td className=''>Acciones</td>
              </tr>
            </thead>

            <tbody className=''>

              { error && <div className="text-danger text-center">{error}</div> }

              {salas.length > 0 ?

                salas.map((el, id) => (

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
                        <button className="py-1 btn btn-primary py-1 px-2" onClick={() => { onDetallesClick(el) }}><img src={pencilSvg} width={"24px"} height={"24px"}/></button>
                        <BotonCarga 
                          onClick={ () => onCambiarEstadoSala(el) }
                          className={`btn ${ el.activo ? "btn-success" : "btn-danger" } p-1`} >
                          <img src={iconoApagar} style={{ height: '33px' }} />
                        </BotonCarga>
                      </div>
                    </td>

                  </tr>


                ))
                : <></>
              }

            </tbody>


          </table>
        }
      </div>

      {<Toast tipo={toast.tipo}
                    titulo={toast.titulo}
                    mensaje={toast.mensaje}
                    visible={toast.visible} />}
    </div>
  );
};