import { useEffect, useState } from "react";
import axios from 'axios';
import { url } from '../../configuracion/backend.js'
import Loading from '../../0 componentesGenerales/Loading';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const ModalSalas = ({ onClose, sede }) => {
  const navigate = useNavigate();
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState('')
  const [salas, setSalas] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${url}/sede/${sede.id}/salas`, {
      headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
    }).then(res => {
      if (res.data) {
        setSalas(res.data.reverse());
        setLoading(false);
      }
    }).catch(err => {
      setError("Servicio no disponible.");
      console.log(err);
    }).finally(_ => {
      setLoading(false);
    })
  }, [sede]);

  const irACrearSala = () => {
    navigate("/intranet/sala", { state: { sede, modo: "crear" } })
  }

  const onDetallesClick = (sala) => {
    navigate("/intranet/sala", { state: { sala, sede, modo: "detalle" } })
    // navigate("/intranet/detallesala", { state: { sala, sede } })
  };

  return (
    <div className="modal-terminos-overlay" >
      <div className="modal-terminos d-flex flex-column align-items-center" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
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
                {/*
              <td className=''></td>
              <td className=''></td>
              */}
              </tr>
            </thead>

            <tbody className=''>

              { /*

              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nuevo nombre"
                    name="nuevonombre"
                    value={codigoSalaGuardar}
                    onChange={(e) => setCodigoSalaGuardar(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    name="nuevacategoria"
                    value={categoriaGuardar}
                    onChange={(e) => setCategoriaGuardar(e.target.value)}
                    required>
                    <option value="">Elija una categoría</option>
                    <option value="Regular">Regular</option>
                    <option value="Prime">Prime</option>
                  </select>
                </td>

              </tr>

              */ }


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
                      <button className="btn btn-primary" onClick={() => { onDetallesClick(el) }}>Detalles</button>
                    </td>
                    {/*
                        <td className='text-center'>
                        <button className='btn px-0' style={{"white-space": "nowrap"}}
                        onClick={() => update()}>
                        <img src={butaca} alt="" style={{ height: '22px' }}/>
                        </button>
                        </td>
                        <td className='text-center'>
                        <button className='btn px-0'>
                        <img src={guardar} alt="" style={{ height: '22px' }}/>
                        </button>
                        </td>
                        */}
                  </tr>


                ))
                : <></>
              }

            </tbody>


          </table>
        }
      </div>
    </div>
  );
};