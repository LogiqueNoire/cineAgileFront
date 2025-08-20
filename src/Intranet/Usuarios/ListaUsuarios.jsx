import { useEffect, useState } from "react";
import Usuario from "../../servicios/Usuario";
import Loading from "../../0 componentesGenerales/Loading";

const listaUsuarios = [
    {
        username: "spiderdog",
        sedeNombre: null
    },
    {
        username: "conejo_anonimo",
        sedeNombre: "Casa"
    },
    {
        username: "lizardog",
        sedeNombre: "Beach"
    }
    
];

const ListaUsuarios = ({ actualizado }) => {
    const [ usuarios, setUsuarios ] = useState([]);
    
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        Usuario.mostrarUsuarios().then(lista => {
            console.log(lista);
            setUsuarios(lista);
        }).catch(err => {
            setError("Error!")
            console.log(err);
        }).finally(_ => {
            setLoading(false);
        })
        console.log('hi')

        return () => {
            setLoading(true);
            setError(null);
        }
    }, [ actualizado ])

    console.log(usuarios)

    return (
        <div className="d-flex flex-column bg-white p-5 border border-3 shadow rounded-4">
            <h2 className="mb-3">Usuarios</h2>

            <div className="rounded-3 overflow-hidden d-flex justify-content-center">

                { loading ? <Loading /> :
                
                    <table className="table table-hover">
                        <thead className="table-dark fw-bold">
                            <tr>
                                <td>Usuario</td>
                                <td>Sede</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>

                        <tbody>
                            { usuarios.map(el => (
                                <tr >
                                    <td className="col-6">{ el.username }</td>
                                    <td className="col-4">{ el.nombreSede ? el.nombreSede : "Todos" }</td>
                                    <td className="col-4 text-center"><button className="btn btn-primary">Detalles</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );

}

export default ListaUsuarios;