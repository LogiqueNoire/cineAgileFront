import React, { useEffect, useState } from 'react';
import AddSede from './AddSede';
import sala from '../../assets/sala2.svg';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import Loading from '../../0 componentesGenerales/Loading';
import { ModalSalas } from './ModalSalas'
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';


const VentanaSedesYSalas = () => {
    const location = useLocation();
    const { sedeRedir = null } = location.state || {};

    const [lista, setLista] = useState([]);
    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    const consultar = () => {
        axios.get(`${url}/intranet/soloSedes`, {
            headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
        }).then(res => {
            setLista(res.data.reverse());

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

    const moverse = (sede) => {
        setSede(sede);
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
            <div className='d-flex flex-column align-items-center container'>
                <AddSede onSucess={consultar}></AddSede>
                {loading === true
                    ? <Loading></Loading> :
                    <table className='table table-striped border table-hover m-4'>
                        <thead className=''>
                            <tr className=''>
                                <td className=''>Nombre de sede</td>
                                <td className=''></td>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {lista.map((el, id) => (
                                <tr key={el.id || id}>
                                    <td>{el.nombre}</td>
                                    <td >

                                        <div className='d-flex justify-content-end'>

                                            <button className='btn btn-primary d-flex gap-2 px-3' onClick={() => moverse(el)}>
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
                {sede && <ModalSalas onClose={onCerrarModal} sede={sede} />}
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;


