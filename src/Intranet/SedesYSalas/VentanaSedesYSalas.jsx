import React, { useEffect, useState } from 'react';
import AddSede from './AddSede';
import sala from '@/assets/sala2.svg';
import guardar from '@/assets/operaciones/guardar.svg'
import iconoApagar from '@/assets/operaciones/apagar.svg'
import axios from 'axios';
import { url } from "@/configuracion/backend"
import Loading from '@/components/Loading/Loading';
import { ModalSalas } from './ModalSalas'
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import "./VentanaSedesYSalas.css"
import Toast from '@/components/Toast/Toast';

const VentanaSedesYSalas = () => {
    const location = useLocation();
    const { sedeRedir = null } = location.state || {};

    const [lista, setLista] = useState([]);
    const [edicion, setEdicion] = useState([]); // Copia para editar sin guardar

    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({ tipo: '', visible: false, titulo: '', mensaje: '' });

    const consultar = () => {
        axios.get(`${url}/api/intranet/v1/sedes`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        }).then(res => {
            setLista(res.data.reverse());
            setEdicion([...res.data]);
            if (sedeRedir) {
                let sede = res.data.find(el => el.id == sedeRedir.id)
                if (sede) setSede(sede);
            }
        }).catch(err => {
            console.log(err);
        }).finally(_ => {
            setLoading(false);
        });
    }

    const actualizarSede = async (el) => {
        console.log(el);
        el.nombre = el.nombre.trim();

        let response
        try {
            response = await axios.patch(`${url}/api/intranet/v1/sedes`, el, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });
            consultar()
        } catch (error) {
            setToast({
                tipo: 'toast-danger',
                visible: true,
                titulo: 'Error al guardar la sede.',
                mensaje: 'Tal vez ya existe una sede con el mismo nombre.'
            });
            setTimeout(() => setToast({ visible: false }), 3000);
            console.error(error);
        } finally {
            if (response.status === 200) {
                setToast({
                    tipo: 'toast-info',
                    visible: true,
                    titulo: '¡Sede editada!',
                    mensaje: ''
                });
                setTimeout(() => setToast({ visible: false }), 3000);
            } else {
                setToast({
                    tipo: 'toast-danger',
                    visible: true,
                    titulo: 'Error al editar',
                    mensaje: response.data
                });
                setTimeout(() => setToast({ visible: false }), 3000);
            }
        }
    }

    const apagarPrender = async (el) => {
        console.log(el);
        let msj, title, type
        let confirmado
        if (el.activo === true) {
            confirmado = window.confirm('¿Estás seguro de que deseas desactivar esta sede? Las funciones asociadas se ocultarán y no se podrán crear nuevas funciones en esa sede');
            type = 'toast-danger'
            title = 'Sede desactivada'
            msj = 'Las funciones asociadas también se ocultarán'
        }
        else {
            confirmado = window.confirm('¿Estás seguro de que deseas activar esta sede?');
            type = 'toast-info'
            title = 'Sede activada'
            msj = 'Las funciones asociadas también se mostrarán'
        }
        if (confirmado) {
            try {
                await axios.patch(`${url}/api/intranet/v1/sedes/estado`, el, {
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                });
                consultar()
            } catch (error) {
                console.error(error);
            } finally {
                setToast({
                    tipo: type,
                    visible: true,
                    titulo: 'Estado de sede cambiado',
                    mensaje: msj
                });
                setTimeout(() => setToast({ visible: false }), 3000);
            }
        }

    }

    const moverse = (id) => {
        setSede(lista[id]);

    }

    useEffect(() => {
        consultar();

        return () => {
            setLoading(true);
        }
    }, [])

    const onCerrarModal = () => {
        setSede(null);
    }

    return (
        <div>
            <div className='d-flex flex-column align-items-center container-fluid'>
                <AddSede onSucess={consultar}></AddSede>
                {loading === true
                    ? <Loading></Loading> :
                    <table className='mytable2 table table-striped border table-hover m-4'>
                        <thead className='thead2'>
                            <tr className='tr2'>
                                <td className='td2'>Nombre de sede</td>
                                <td className='td2'>Opciones</td>
                            </tr>
                        </thead>
                        <tbody className='tbody2'>
                            {edicion.map((el, id) => (
                                <tr key={el.id || id} className='tr2'>
                                    <td className='align-content-center td2' data-label='Nombre' >
                                        <input className='form-control ms-end' type="text" value={el.nombre} style={{ width: '250px' }}
                                            onChange={(e) => {
                                                const nuevaLista = [...lista];
                                                nuevaLista[id] = { ...el, nombre: e.target.value };
                                                setEdicion(nuevaLista);
                                            }} />

                                    </td>
                                    <td className='td2 tdOpciones' data-label='Opciones'>

                                        <div className='d-flex justify-content-center gap-2' style={{ 'width': 'min-content' }} >
                                            <button className='btn btn-primary d-flex gap-2' onClick={() => actualizarSede(el)}
                                                style={{ 'paddingInline': '12px' }}>
                                                <img src={guardar} alt="" style={{ height: '25px' }} />
                                            </button>

                                            <button className={el.activo ? 'btn btn-success d-flex gap-2' : 'btn btn-danger d-flex gap-2'}
                                                onClick={() => apagarPrender(el)}
                                                style={{ padding: '6px' }}>
                                                <img className='' src={iconoApagar} alt="" style={{ height: '33px' }} />
                                            </button>

                                            <button className='btn btn-primary d-flex gap-2 px-3' onClick={() => moverse(id)}>
                                                <label className="">Salas</label>
                                                <img src={sala} alt="" style={{ height: '25px' }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>


                            ))}
                        </tbody>

                    </table>

                }
                {<Toast tipo={toast.tipo}
                    titulo={toast.titulo}
                    mensaje={toast.mensaje}
                    visible={toast.visible} />}
                {sede && <ModalSalas onClose={onCerrarModal} sede={sede} />}
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;


