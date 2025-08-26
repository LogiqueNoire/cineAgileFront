import { useEffect, useState } from "react";
import Loading from "../../0 componentesGenerales/Loading";
import axios from "axios";
import { url } from "../../configuracion/backend";
import Cookies from "js-cookie";
import iconoGuardar from "../../assets/operaciones/guardar.svg"
import Toast from "../../Toast";
import genresIcon from '../../assets/modulos/genresIcon.svg'

const Generos = () => {
    const [loading, setLoading] = useState(true)
    const [generos, setGeneros] = useState({});
    const [generoNombre, setGeneroNombre] = useState(null)
    const [toast, setToast] = useState({ visible: false, tipo: '', titulo: '', mensaje: '' })

    const ordenamientoAlfa = (a, b) => {
        const x = a.nombre.toLowerCase();
        const y = b.nombre.toLowerCase();

        return x < y ? -1 : 1;
    }

    const consultarGeneros = async () => {
        try {
            const datos = (await axios.get(`${url}/intranet/generos`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setGeneros(datos.sort(ordenamientoAlfa))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const agregarGenero = async (e, nombre) => {
        e.preventDefault();
        let response;
        try {
            response = await axios.post(`${url}/intranet/generos/agregar`, nombre.trim(), {
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth-token")}`,
                    'Content-Type': 'text/plain'
                }
            });

        } catch (error) {
            console.log(error)
        } finally {
            consultarGeneros()
            if (response) {
                setGeneroNombre('')
                setToast({
                    visible: true,
                    tipo: 'toast-info',
                    titulo: 'Género agregado',
                    mensaje: ''
                })
                setTimeout(() => setToast({ visible: false }), 3000);
            } else {
                setToast({
                    visible: true,
                    tipo: 'toast-danger',
                    titulo: 'Error con el género',
                    mensaje: 'Nombre repetido'
                })
                setTimeout(() => setToast({ visible: false }), 3000);
            }

        }
    }

    const editarGenero = async (e, el) => {
        e.preventDefault();
        let response;
        try {
            response = await axios.patch(`${url}/intranet/generos/editar`, { id: el.id, nombre: el.nombre.trim() }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("auth-token")}`
                }
            });

        } catch (error) {
            console.log(error)
        } finally {
            consultarGeneros()
            if (response) {

                setToast({
                    visible: true,
                    tipo: 'toast-info',
                    titulo: 'Género modificado',
                    mensaje: ''
                })
                setTimeout(() => setToast({ visible: false }), 3000);
            } else {
                setToast({
                    visible: true,
                    tipo: 'toast-danger',
                    titulo: 'Error con el género',
                    mensaje: 'Nombre repetido'
                })
                setTimeout(() => setToast({ visible: false }), 3000);
            }

        }
    }

    useEffect(() => {
        consultarGeneros()
    }, [])


    return (
        <div className="d-flex flex-column align-items-center container-fluid col-10 mt-4">
            <div className="d-flex align-items-center gap-4">
                <h2>Géneros registrados</h2>
                <img src={genresIcon} alt="" style={{ width: '90px', filter: "invert(90%)" }} />
            </div>
            {loading === true
                ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :
                <table className='table mytable table-striped border table-hover mt-4'>
                    <thead className='thead'>
                        <tr className="tr">
                            <th className='td'>Nombre</th>
                            <th className='td'></th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        <tr className='tr'>
                            <td className='td' data-label='Nombre'>
                                <input
                                    type="text"
                                    className="sinopsis form-control"
                                    placeholder="Nuevo nombre"
                                    name="nuevonombre"
                                    value={generoNombre || ""}
                                    onChange={(e) => setGeneroNombre(e.target.value)}
                                    required
                                />
                            </td>
                            <td className='td' data-label='Opciones'>
                                <button className='d-flex align-items-center btn btn-primary p-2 mx-2' onClick={(e) => agregarGenero(e, generoNombre)}>
                                    <img src={iconoGuardar} alt="" style={{ height: '20px' }} />
                                </button>
                            </td>

                        </tr>
                        {generos.map((el, id) => (

                            <tr className='tr' key={id}>
                                <td className='td' data-label='Nombre'>
                                    <input
                                        type="text"
                                        className="sinopsis form-control"
                                        placeholder="Nuevo nombre"
                                        name="nuevonombre"
                                        value={el.nombre}
                                        onChange={
                                            (e) => {
                                                const nuevaLista = [...generos];
                                                nuevaLista[id] = { ...el, nombre: e.target.value };
                                                setGeneros(nuevaLista);
                                            }
                                        }
                                        required
                                    />
                                </td>
                                <td className='td' data-label='Opciones'>
                                    <button className='d-flex align-items-center btn btn-primary p-2 mx-2' onClick={(e) => editarGenero(e, el)}>
                                        <img src={iconoGuardar} alt="" style={{ height: '20px' }} />
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            }
            <Toast tipo={toast.tipo} titulo={toast.titulo} mensaje={toast.mensaje} visible={toast.visible}></Toast>
        </div>

    )

}

export default Generos;