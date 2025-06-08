import React, { useEffect, useState } from 'react';
import AddSede from './AddSede';
import sala from '../../assets/sala2.svg';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import { useNavigate } from 'react-router-dom'
import Loading from '../../0 componentesGenerales/Loading';
import { ModalSalas } from './ModalSalas'
import Cookies from 'js-cookie';


const VentanaSedesYSalas = () => {
    const [lista, setLista] = useState([]);
    const [sede, setSede] = useState([]);
    const [loading, setLoading] = useState(true);
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false)
    const [primeraVez, setPrimeraVez] = useState(true)

    const consultar = async () => {
        try {
            setLista(((await axios.get(`${url}/intranet/soloSedes`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data).reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const moverse = (el) => {
        setPrimeraVez(false)
        setSalas(el.salas)
        setSede(el)
        console.log(el.salas)

        //navigate(`/intranet/sedesysalas/${idSede}`)
    }

    useEffect(() => {
        if (!primeraVez) {
            setModalAbierto(true);
        }
    }, [primeraVez]);


    useEffect(() => {
        consultar()
    }, [])

    useEffect(() => {
        console.log("Sedes y salas", lista)
    }, [lista])

    const funcionCambiar = () => {
        setModalAbierto(false)
        setPrimeraVez(true)
        consultar()
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

                                            <button className='btn btn-primary d-flex gap-2' onClick={() => moverse(el)}>
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
                {modalAbierto && <ModalSalas onClose={funcionCambiar} salas={salas} sede={sede} />}
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;


