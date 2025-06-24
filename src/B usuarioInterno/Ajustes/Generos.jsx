import { useState } from "react";
import Loading from "../../0 componentesGenerales/Loading";
const Generos = () => {
    const [loading, setLoading] = useState(false)
    const [generos, setGeneros] = useState({});

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

    return (
        <div>
            {loading === true
                ? <div className='d-flex flex-column align-items-center container'><Loading></Loading></div> :
                <table className='table mytable table-striped border table-hover mt-4'>
                    <thead className='thead'>
                        <tr>
                            <th className='td'>Nombre</th>
                            <th className='td'></th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {generos.map((el, id) => (

                            <tr className='tr' key={id}>
                                <td className='td' data-label='Nombre'>
                                    {el.nombre}
                                </td>
                                <td className='td' data-label='Imagen'>
                                    <button className='d-flex align-items-center btn btn-primary p-2 mx-2' onClick={() => editarOnClick(el)}>
                                        <img src={iconoEditar} alt="" style={{ height: '20px' }} />
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            }
        </div>
    )

}

export default Generos;