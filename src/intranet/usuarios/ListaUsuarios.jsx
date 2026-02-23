import { useEffect, useState } from "react";
import Usuario from "@/services/Usuario";
import Loading from "@/components/loading/Loading";
import usuarioIcon from "@/assets/modulos/modulo_usuario_icono.svg"
import { env } from "@/configuracion/backend";
import { rolesColors } from "../colorsConfig";

const ListaUsuarios = ({ actualizado }) => {
    const [usuarios, setUsuarios] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Usuario.mostrarUsuarios().then(response => {
            env === "dev" && console.log(response);
            setUsuarios(response.data);
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
                                    <td>Rol</td>
                                    {/*<td>Módulos</td>*/}
                                    {/*<td>Acciones</td>*/}
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.length > 0 && usuarios.map(el => (
                                    <tr className="" key={el.username}>
                                        <td className="w-50">{el.username}</td>
                                        <td className="w-50 text-wrap">{el.nombreSede ? el.nombreSede : "Todos"}</td>
                                        <td className="d-flex">
                                            <span className="rounded-5 fw-bold p-1 px-2 d-flex"
                                                style={{ background: rolesColors[rolesColors.findIndex((rol) => rol[0] === el.role)][1],
                                                    color: rolesColors[rolesColors.findIndex((rol) => rol[0] === el.role)][2]
                                                 }}>
                                                {el.role ? el.role.replace("_", " ") : "-"}
                                            </span>
                                        </td>
                                        {/*<td className="col-4 text-center"><button className="btn btn-primary">Detalles</button></td>*/}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div >
    );

}

export default ListaUsuarios;