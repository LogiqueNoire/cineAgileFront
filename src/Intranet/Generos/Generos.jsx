import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import { url } from "@/configuracion/backend";
import Cookies from "js-cookie";
import iconoGuardar from "@/assets/operaciones/guardar.svg"
import Toast from "@/components/Toast/Toast";
import genresIcon from '@/assets/modulos/genresIcon.svg'
import Genero from "@/services/Genero";
import { ordenamientoAlfa } from "@/utils";

const Generos = () => {
    const [loading, setLoading] = useState(true)
    const [generos, setGeneros] = useState({});
    const [generoNombre, setGeneroNombre] = useState(null)
    const [toast, setToast] = useState({ visible: false, tipo: '', titulo: '', mensaje: '' })

    const consultarGeneros = async () => {
        try {
            const datos = await Genero.consultarGeneros()
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
            response = await axios.post(`${url}/api/intranet/v1/generos`, nombre.trim(), {
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
            response = await axios.patch(`${url}/api/intranet/v1/generos`, { id: el.id, nombre: el.nombre.trim() }, {
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
                <h2 className="fs-1 cineagile-blue-500 ancizar-sans-regular mb-0">Géneros registrados</h2>
                <img src={genresIcon} alt="" style={{ width: "90px", filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)" }} />
            </div>
            {loading === true
                ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :
                <table className='table table-hover mt-4 ' style={{width:"300px"}}>
                    <thead className=''>
                        <tr className=''>
                            <th className='' data-label='Nombre'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nuevo nombre"
                                    name="nuevonombre"
                                    value={generoNombre || ""}
                                    onChange={(e) => setGeneroNombre(e.target.value)}
                                    required
                                />
                            </th>
                            <th className='' data-label='Opciones'>
                                <button className='btn btn-primary btn-primary-gradient d-flex gap-2' onClick={() => agregarGenero(e, generoNombre)}
                                    style={{ 'padding': '11px' }}>
                                    <span className="fs-3" style={{lineHeight:"0.67"}}>+</span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {generos.map((el, id) => (
                            <tr className='' key={`${el}${id}`}>
                                <td className='' data-label='Nombre'>
                                    <input
                                        type="text"
                                        className="form-control"
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
                                <td className='' data-label='Opciones'>
                                    <button className='btn btn-primary btn-primary-gradient d-flex gap-2' onClick={() => editarGenero(e, el)}
                                        style={{ 'padding': '10px' }}>
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