import React, { useEffect, useState } from 'react';
import AddSede from './AddSede';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import { useNavigate } from 'react-router-dom'
import Loading from '../../0 componentesGenerales/Loading';
import { ModalSalas } from './ModalSalas'

const VentanaSedesYSalas = () => {
    const [lista, setLista] = useState([]);
    const [sede, setSede] = useState([]);
    const [loading, setLoading] = useState(true);
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false)

    const consultar = async () => {
        try {
            setLista((await axios.get(`${url}/intranet/sedesysalas`)).data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const moverse = (el) => {
        setSalas(el.salas)
        setSede(el)
        console.log(el.salas)

        //navigate(`/intranet/sedesysalas/${idSede}`)
    }

    useEffect(() => {
        setModalAbierto(true);
    }, [salas]);


    useEffect(() => {
        console.log("hola")
        consultar()
    }, [])

    useEffect(() => {
        console.log("Sedes y salas", lista)
    }, [lista])

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
                                    <td className='text-center'>
                                        <button className='btn btn-primary' onClick={() => moverse(el)}>Ver</button>
                                    </td>
                                </tr>


                            ))}
                        </tbody>

                    </table>

                }
                {modalAbierto && <ModalSalas onClose={() => setModalAbierto(false)} salas={salas} sede={sede}/>}
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;