import axios from "axios"
import { useEffect, useState } from "react";
import { backend_url } from "@/configuracion/backend";
import Cookies from "js-cookie";
import { format } from "date-fns";
import auditIcon from "@/assets/modulos/audit.svg"
import Loading from "@/components/loading/Loading";
import { accionesColores } from "../colorsConfig";

const Auditoria = () => {
    const [dataCompleta, setDataCompleta] = useState()
    const [dataParaMostrar, setDataParaMostrar] = useState()
    const [startIndex, setStartIndex] = useState()
    const cantidadFilasMostrar = 20;
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        setStartIndex((paginaActual - 1) * cantidadFilasMostrar)
    }, [paginaActual])

    const recuperarAuditoria = async () => {
        let response
        try {
            response = (await axios.get(`${backend_url}/api/intranet/v1/registrosacciones`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            setDataCompleta(response);
        } catch (e) {
            console.error("Error", e)
        }
    }

    useEffect(() => {
        recuperarAuditoria()
    }, [])

    useEffect(() => {
        if (dataCompleta != undefined) {
            setDataParaMostrar([...dataCompleta].reverse().slice(startIndex, startIndex + cantidadFilasMostrar))
        }
    }, [dataCompleta, startIndex])

    return (
        <div className="mt-4">
            <div className="d-flex flex-row align-items-center mb-3 gap-3 justify-content-center">
                <h2 className="fs-1 cineagile-blue-600 ancizar-sans-regular mb-0">Auditorías</h2>
                <img src={auditIcon} alt="audit" className="" style={{ filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)", height: '70px' }} />
            </div>
            {dataParaMostrar != undefined && dataParaMostrar?.length > 0 ?
                <>
                    <div className="overflow-x-auto mx-4">
                        <div className="" style={{ width: 'max(max-content, 100%)', whiteSpace: "nowrap" }}>
                            <table className="table table-hover">
                                <thead className="">
                                    <tr>
                                        <th className="">Fecha</th>
                                        <th className="">Hora</th>
                                        <th className="">Acción</th>
                                        <th className="">Módulo/entidad</th>
                                        {/*<th className="">ID entidad afectada</th>*/}
                                        <th className="">Usuario</th>
                                        <th className="">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataParaMostrar?.map((el) => (
                                        <tr className="" key={el.id}>
                                            <td className="" > {format(el.fecha, "yyyy-MM-dd")}</td>
                                            <td className="">{format(el.fecha, "HH:mm:ss")}</td>
                                            <td className="">
                                                <span className={`rounded-5 fw-bold p-1 px-2`}
                                                    style={{
                                                        backgroundColor: `${accionesColores[
                                                            accionesColores.findIndex(color => color[0] === el.accion)
                                                        ][1]
                                                            }`,
                                                        color: `${accionesColores[
                                                            accionesColores.findIndex(color => color[0] === el.accion)
                                                        ][2]
                                                            }`
                                                    }}>{el.accion.replace("_", " ")}</span>
                                            </td>
                                            <td className="">{el.entidadAfectada == "" ? "-" : el.entidadAfectada}</td>
                                            {/*<td className="">{el.idEntidad}</td>*/}
                                            
                                            <td className="">{el.usuario}</td>
                                            <td className="">{el.detalles}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div >
                    <div className="d-flex flex-row gap-3 justify-content-center my-3">
                        {startIndex - cantidadFilasMostrar >= 0 &&
                            <button className="btn-primary btn-primary-gradient" onClick={() => { setPaginaActual(paginaActual - 1) }}>Anterior</button>}
                        {startIndex + cantidadFilasMostrar < dataCompleta.length &&
                            <button className="btn-primary btn-primary-gradient" onClick={() => { setPaginaActual(paginaActual + 1) }}>Siguiente</button>}
                    </div>
                </>
                :
                <div className="d-flex justify-content-center">
                    <Loading></Loading>
                </div>
            }
        </div >
    )
}
export default Auditoria