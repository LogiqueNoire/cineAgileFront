import { useEffect, useState } from "react";
import butaca from "../../assets/butaca.svg"
import guardar from "../../assets/guardarAzul.svg"
import guardarBlanco from "../../assets/guardarBlanco.svg"
import axios from 'axios';
import { url } from '../../configuracion/backend.js'
import Loading from '../../0 componentesGenerales/Loading';
import Cookies from "js-cookie";

export const ModalSalas = ({ onClose, sede }) => {
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState('')
  const [salas, setSalas] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState('')
  const [loading, setLoading] = useState(true);

  const update = async () => {
    console.log("guardando")
  }

  const agregarSala = async (e) => {
    e.preventDefault();
    if (!(categoriaGuardar === '')) {

      try {
        setLoading(true)
        await axios.post(`${url}/intranet/sedesysalas/nuevaSala`, {
          idSede: sede.id,
          codigoSala: codigoSalaGuardar,
          categoria: categoriaGuardar,
        }, { 
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } 
        });
        alert('Sala agregada correctamente a la sede');
      } catch (error) {
        if (
          error.response?.data?.message?.includes('duplicate key') ||
          error.response?.data?.detail?.includes('already exists')
        ) {
          alert('Ya existe una sala con ese código en esta sede.');
        } else {
          alert('Error al agregar la sala');
        }
        console.error(error);
      } finally {
        consultar()
        setCodigoSalaGuardar('');
        setCategoriaGuardar('');
      }
    } else {
      alert('Ingresar categoria');
    }
  };


  const consultar = async () => {
    try {
      const listaActualizada = (await axios.get(`${url}/sede/${sede.id}/salas`, { 
                      headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` } 
                  })).data;

                  console.log(listaActualizada);
                  
      if (listaActualizada) {
        setSalas(listaActualizada.reverse());
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    consultar()
  }, [])

  return (
    <div className="modal-terminos-overlay" >
      <div className="modal-terminos d-flex flex-column align-items-center" style={{ "max-height": "80vh", "overflow-y": "auto" }}>
        <h3 className="modal-terminos-title">Sede {sede.nombre}</h3>

        <div className="w-100 d-flex justify-content-between">
          <button className="btn btn-danger" onClick={onClose}>
            Cerrar
          </button>

          <button className='btn btn-primary d-flex gap-3' onClick={(e) => agregarSala(e)}>
            <h3 className="mb-0">Guardar nueva sala</h3>
            <img src={guardarBlanco} alt="" style={{ height: '22px' }} />
          </button>
        </div>

        {loading ?
          <Loading></Loading> :
          <table className='table table-striped border table-hover m-4'>
            <thead className=''>
              <tr className=''>
                <td className=''>Sala</td>
                <td className=''>Categoría</td>
                {/*
              <td className=''></td>
              <td className=''></td>
              */}
              </tr>
            </thead>

            <tbody className=''>
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