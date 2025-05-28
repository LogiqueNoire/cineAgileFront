import React, { useEffect, useState } from 'react';
import AddSede from './AddSede';
import axios from 'axios';
import { url } from "../../configuracion/backend"
import { useNavigate } from 'react-router-dom'

const VentanaSedesYSalas = () => {
    const [lista, setLista] = useState([]);
    const [idSede, setIdSede] = useState([]);
    const navigate = useNavigate();

    const consultar = async () => {
        try {
            setLista((await axios.get(`${url}/intranet/sedesysalas`)).data);
        } catch (error) {
            console.error(error);
        }
    }

    const moverse = (id) => {
        setIdSede(id)
        //navigate(`/intranet/sedesysalas/${idSede}`)
    }

    useEffect(()=>{
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

                <table className='table table-striped border table-hover m-4'>
                    <thead className=''>
                        <tr className=''>
                            <td className=''>Nombre de sede</td>
                            <td className=''></td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {lista.map((el, id) => (

                            <tr key={el.id}>
                                <td>{el.nombre}</td>
                                <td className='text-center'>
                                    <button className='btn btn-primary' onClick={() => moverse(el.id)}>Ver</button>
                                </td>
                            </tr>


                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default VentanaSedesYSalas;