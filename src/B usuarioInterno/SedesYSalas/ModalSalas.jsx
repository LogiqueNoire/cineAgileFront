import { useState } from "react";
import butaca from "../../assets/butaca.svg"
import guardar from "../../assets/guardarAzul.svg"
import guardarBlanco from "../../assets/guardarBlanco.svg"

export const ModalSalas = ({ onClose, salas, sede }) => {
  const [codigoSalaGuardar, setCodigoSalaGuardar] = useState()
  const [categoriaGuardar, setCategoriaGuardar] = useState()

  const update = async () => {
    console.log("guardando")
  }


  const agregarSala = async () => {
    e.preventDefault();

    try {
      await axios.post(`${url}/intranet/sedesysalas/nuevaSala`, sede);
      alert('Sala agregada correctamente a la sede');
    } catch (error) {
      alert('Error al agregar la sede');
      console.error(error);
    }
  };

  return (
    <div className="modal-terminos-overlay">
      <div className="modal-terminos d-flex flex-column align-items-center">
        <h3 className="modal-terminos-title">Sede {sede.nombre}</h3>
        <button className='btn btn-primary d-flex gap-3'>
          <h3 className="mb-0">Guardar nueva sala</h3>
          <img src={guardarBlanco} alt="" style={{ height: '22px' }} />
        </button>
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
                  value={''}
                  onChange={(e) => setCodigoSalaGuardar(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nueva categoría"
                  name="nuevacategoria"
                  value={''}
                  onChange={(e) => setCategoriaGuardar(e.target.value)}
                  required
                />
              </td>

              <td className='text-center'>

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

        <button className="terminos-close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};