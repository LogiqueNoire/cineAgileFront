import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, UNSAFE_useScrollRestoration } from 'react-router-dom';
import { url } from '../../configuracion/backend.js'
import { format } from 'date-fns'

import peliculaIcono from '../../assets/peliculaDark.svg'
import Loading from '../../0 componentesGenerales/Loading.jsx';
import Cookies from 'js-cookie';
import Toast from '../../Toast.jsx';

export default function AddFilm({ onSucess }) {
  const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });
  const [generos, setGeneros] = useState()

  const [fechaReal, setFechaReal] = useState()
  const [pelicula, setPelicula] = useState({
    nombre: '',
    director: '',
    actores: '',
    genero: '',
    clasificacion: '',
    duracion: '',
    fechaInicioEstreno: '',
    imageUrl: '',
    sinopsis: '',
  });


  const {
    nombre,
    director,
    actores,
    genero,
    clasificacion,
    duracion,
    fechaInicioEstreno,
    imageUrl,
    sinopsis,
  } = pelicula;

  const onInputChange = (e) => {
    setPelicula({
      ...pelicula,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    if (duracion > 500 || duracion <= 0) {
      setPelicula(prev => ({ ...prev, duracion: '' }));
    }
  }, [duracion]);

  const consultarGeneros = async () => {
        try {
            const datos = (await axios.get(`${url}/intranet/generos`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setGeneros(datos)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

  /*manejo de fecha*/
  let response
  useEffect(() => {
    const obtenerFecha = async () => {
      try {
        response = await axios.get(`${url}/fecha-actual`);
        setFechaReal(new Date(response.data));

      } catch (err) {
        console.error("Error al obtener la fecha:", err);
      }
    };
    consultarGeneros()
    obtenerFecha();
  }, []);

  useEffect(() => {
    if (fechaReal) {
      /*setFechaElegida(fechaReal)*/
      console.log("Fecha real obtenida:", fechaReal);
      setPelicula((prev) => ({
        ...prev,
        fechaInicioEstreno: fechaReal,
      }));
    }
  }, [fechaReal]);


  const onFechaChange = (e) => {
    const { name, value } = e.target;

    setPelicula({
      ...pelicula,
      [name]: value ? new Date(`${value}T00:00`) : null,
    });
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(pelicula)

    if (!(genero.trim() === '' || clasificacion.trim() === '' || duracion === 0
      || director.trim() === '' || imageUrl.trim() === '' || sinopsis.trim() === '')) {
      const peliculaFinal = {
        ...pelicula,
        fechaInicioEstreno: format(pelicula.fechaInicioEstreno, 'yyyy-MM-dd'),
      };
      try {
        await axios.post(`${url}/intranet/peliculas/agregar`, peliculaFinal, {
          headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        });

        if (onSucess) {
          onSucess()
        }
        setPelicula({
          nombre: '',
          director: '',
          actores: '',
          genero: '',
          clasificacion: '',
          duracion: '',
          fechaInicioEstreno: '',
          imageUrl: '',
          sinopsis: '',
        });
      } catch (error) {
        setToast({
          tipo: 'toast-danger',
          visible: true,
          titulo: 'Error al agregar la película',
          mensaje: ''
        });
        setTimeout(() => setToast({ visible: false }), 3000);
        console.error(error);
      } finally {
        setToast({
          tipo: 'toast-info',
          visible: true,
          titulo: 'Película agregada correctamente',
          mensaje: ''
        });
        setTimeout(() => setToast({ visible: false }), 3000);
      }
    } else {
      console.log('error 1')
      setToast({
        tipo: 'toast-danger',
        visible: true,
        titulo: 'Error',
        mensaje: 'Falta llenar campos.'
      });
      setTimeout(() => setToast({ visible: false }), 3000);
    }
  };



  /*pruebas*/


  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const options = [
    { id: 'js', value: 'JavaScript', label: 'JavaScript' },
    { id: 'py', value: 'Python', label: 'Python' },
    { id: 'java', value: 'Java', label: 'Java' },
    { id: 'cpp', value: 'C++', label: 'C++' },
    { id: 'react', value: 'React', label: 'React' },
    { id: 'node', value: 'Node.js', label: 'Node.js' },
    { id: 'css', value: 'CSS', label: 'CSS' },
    { id: 'html', value: 'HTML', label: 'HTML' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (optionValue) => {
    setSelectedItems(prev => {
      if (prev.includes(optionValue)) {
        return prev.filter(item => item !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  const getDropdownText = () => {
    const count = selectedItems.length;
    if (count === 0) {
      return 'Seleccionar opciones';
    } else if (count === 1) {
      return selectedItems[0];
    } else {
      return `${count} opciones seleccionadas`;
    }
  };






  return (
    <div className="addFilm">
      {fechaReal !== undefined ?
        <div className="border rounded p-4 mt-4 shadow">
          <div className="d-flex align-items-center p-2 gap-2 justify-content-center">
            <h2 className="text-center">Agregar película</h2>
            <img src={peliculaIcono} alt="" style={{ height: '80px' }} />
          </div>
          <form onSubmit={(e) => onSubmit(e)} >
            <div className='d-flex flex-wrap gap-3 justify-content-center'>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="duracion" className="form-label">
                  Duración (min)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  step="0"
                  className="form-control"
                  placeholder="Duración"
                  name="duracion"
                  value={duracion}
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^\d*\.?\d{0}$/; // permite hasta 0 decimales
                    if (input === "" || regex.test(input)) {
                      onInputChange(e)
                    };
                  }
                  }
                  required

                />
              </div>

              <div className="mb-3">
                <label htmlFor="fechaInicioEstreno" className="form-label">
                  Fecha Inicio Estreno
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaInicioEstreno"
                  min={fechaReal ? format(fechaReal, 'yyyy-MM-dd') : ''}
                  value={fechaInicioEstreno ? format(fechaInicioEstreno, 'yyyy-MM-dd') : format(fechaReal, 'yyyy-MM-dd')}
                  onChange={(e) => onFechaChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="director" className="form-label">
                  Director
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Director"
                  name="director"
                  value={director}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="clasificacion" className="form-label">
                  Clasificación
                </label>
                <select
                  className="form-select"
                  placeholder="Clasificación"
                  name="clasificacion"
                  value={clasificacion}
                  onChange={(e) => onInputChange(e)}
                  required>
                  <option value="">Seleccione una clasificación</option>
                  <option value="Apto para todos">Apto para todos</option>
                  <option value="+14">+14</option>
                  <option value="+18">+18</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="actores" className="form-label">
                  Actores principales (opcional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Actores"
                  name="actores"
                  value={actores}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  URL Imagen
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://..."
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              

            </div>



            <div className='d-flex flex-wrap gap-3 justify-content-center'>

              <div className="mb-3">
                <label className="form-label">Género(s)</label>
                <div className="border rounded p-3 bg-light" style={{ maxHeight: '110px', overflowY: 'auto' }}>
                  {generos.map((genre,id) => (
                    <div className="form-check" key={id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`genre-${id}`}
                        checked={genero.includes(genre)}
                        onChange={(e) => {
                          const currentGenres = genero ? genero.split(', ').filter(g => g) : [];
                          let newGenres;
                          if (e.target.checked) {
                            newGenres = [...currentGenres, genre];
                          } else {
                            newGenres = currentGenres.filter(g => g !== genre);
                          }
                          onInputChange({ target: { name: 'genero', value: newGenres.join(', ') } });
                        }}
                      />
                      <label className="form-check-label" htmlFor={`genre-${genre}`}>
                        {genre.nombre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="sinopsis" className="form-label">
                  Sinopsis
                </label>
                <textarea
                style={{ height: '110px', overflowY: 'auto' }}
                  className="form-control"
                  placeholder="Sinopsis"
                  name="sinopsis"
                  value={sinopsis}
                  onChange={(e) => onInputChange(e)}
                  required
                  
                ></textarea>
              </div>
            </div>




            <div className='d-flex gap-2 justify-content-center'>

              <button type="submit" className="btn btn-outline-primary">
                Agregar película
              </button>
              {/*
                <Link className="btn btn-outline-danger mx-2" to={`/intranet/peliculas`}>
                Cancelar
                </Link>
              */}
            </div>
          </form>
        </div>
        :
        <div className="d-flex justify-content-center">
          <Loading ></Loading>
        </div>
      }
      {<Toast tipo={toast.tipo}
        titulo={toast.titulo}
        mensaje={toast.mensaje}
        visible={toast.visible} />}
    </div>

  );
}
