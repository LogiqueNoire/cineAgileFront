import { useEffect, useState } from "react";
import Usuario from "@/services/Usuario";
import Loading from "@/components/loadingt/Loading";
import usuarioIcon from "@/assets/modulos/modulo_usuario_icono.svg"
import { env } from "@/configuracion/backend";


const ListaUsuarios = ({ actualizado }) => {
    const [usuarios, setUsuarios] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Usuario.mostrarUsuarios().then(lista => {
            env === "dev" && console.log(lista);
            setUsuarios(lista);
        }).catch(err => {
            setError("Error!")
            console.log(err);
        }).finally(_ => {
            setLoading(false);
        })
        return () => {
            setLoading(true);
            setError(null);
        }
    }, [actualizado])

    env === "dev" && console.log(usuarios)

    return (
        <div className="d-flex flex-column bg-white p-5 shadow rounded-4">
            <div className="d-flex flex-row align-items-center mb-3 gap-2 justify-content-center">
                <h2 className="fs-1 cineagile-blue-600 ancizar-sans-regular mb-0">Usuarios</h2>
                <img src={usuarioIcon} alt="usuarios" className="" style={{ filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)", height: '60px' }} />
            </div>
            <div className="overflow-x-auto rounded-3">
                <div className="" style={{ width: 'max(max-content, 100%)', whiteSpace: "nowrap" }}>
                    {loading ? <div className="d-flex justify-content-center"><Loading /></div> :
                        <table className="table table-hover m-0">
                            <thead className="table-dark fw-bold">
                                <tr>
                                    <td>Usuario</td>
                                    <td>Sede</td>
                                    <td>Módulos</td>
                                    {/*<td>Acciones</td>*/}
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map(el => (
                                    <tr className="">
                                        <td className="w-50">{el.username}</td>
                                        <td className="w-50 text-wrap">{el.nombreSede ? el.nombreSede : "Todos"}</td>
                                        <td className="d-flex flex-row" style={{ width: 'max-content' }}>
                                            <div className="d-flex flex-column" style={{ width: 'max-content' }}>
                                                <span>Operaciones</span>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span className="d-block-inline">Películas</span>
                                                </div>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span className="d-inline-grid">Sedes, salas y butacas</span>
                                                </div>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span className="d-inline-grid">Funciones</span>
                                                </div>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span className="d-inline-grid">Géneros</span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span>Insights</span>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span>Analíticas</span>
                                                </div>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span>Usuarios</span>
                                                </div>
                                                <div className="align-items-center">
                                                    <label className="switch m-2">
                                                        <input type="checkbox" checked={{}} onChange={{}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <span>Auditorías</span>
                                                </div>
                                            </div>
                                        </td>
                                        {/*<td className="col-4 text-center"><button className="btn btn-primary">Detalles</button></td>*/}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    );

}

export default ListaUsuarios;