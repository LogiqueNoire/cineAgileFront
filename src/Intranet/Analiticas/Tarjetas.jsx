import { format } from "date-fns";
import { url } from "../../configuracion/backend";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Tarjetas = ({fechaConsultada, setFechaConsultada}) => {
    const [loading, setLoading] = useState(true)


    const [entradasVendidas, setEntradasVendidas] = useState()
    const [ventasDia, setVentasDia] = useState()
    const [funcionesAgotadas, setFuncionesAgotadas] = useState()
    const [funcionesPorProyectar, setFuncionesPorProyectar] = useState()

    const consultarFuncionesPorProyectar = async (fecha) => {
        try {
            const f = format(fecha, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/api/intranet/v1/funciones?fecha=${f}&estado=por_proyectar`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            setFuncionesPorProyectar(datos)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const consultarFuncionesAgotadas = async (fecha) => {
        try {
            const f = format(fecha, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/api/intranet/v1/funciones?fecha=${f}&estado=agotadas`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            setFuncionesAgotadas(datos)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const consultarEntradasVendidas = async (fecha) => {
        try {
            const f = format(fecha, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/api/intranet/v1/ventas/entradas-vendidas?fecha=${f}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            setEntradasVendidas(datos)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

     const consultarVentas = async (fecha) => {
        try {
            const f = format(fecha, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/intranet/ventas/totales-periodo?fecha=${f}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;

            setVentasDia(datos)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fechaConsultada != undefined) {
            consultarFuncionesPorProyectar(fechaConsultada)
            consultarFuncionesAgotadas(fechaConsultada)
            consultarEntradasVendidas(fechaConsultada)
            consultarVentas(fechaConsultada)
            console.log(fechaConsultada)
        }
    }, [fechaConsultada])

    return (
        <section className='d-flex flex-row justify-content-around gap-3 w-100 align-items-center'>
            <div className='d-flex flex-column col-lg-2 align-items-center'>
                <label className="text-center align-content-center fs-1 fw-bold">Analíticas</label>
                {fechaConsultada && <input type="date" className='form-control m-0 fw-bold' style={{ width: 'min-content'}} value={format(fechaConsultada, "yyyy-MM-dd")}
                    onChange={(e) => { e.target.value != "" ? setFechaConsultada(new Date(`${e.target.value}T00:00`)) : setFechaConsultada(new Date()) }} />}
            </div>
            <div className="d-flex gap-3 overflow-x-auto justify-content-around w-100" >
            <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-4 p-3' style={{ /*width: 'min-content',*/ height: 'auto' }}>
                <h4 className="text-center">{"Entradas vendidas"}</h4>
                <p className={`fw-bold text-center ${entradasVendidas != undefined ? 'fs-2' : 'pt-2'}`}>
                    {entradasVendidas != undefined ? entradasVendidas :
                        <span className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></span>}
                </p>
            </article>
            <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-4 p-3' style={{ height: 'auto' }}>
                <h4 className="text-center">{"Ventas"}</h4>
                <p className={`fw-bold text-center ${ventasDia != undefined ? 'fs-2' : 'pt-2'}`}>
                    {ventasDia != undefined ? `S/ ${ventasDia.toFixed(2)}` :
                        <span className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></span>}
                </p>
            </article>
            <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-4 p-3' style={{ height: 'auto' }}>
                <h4 className="text-center">{"Funciones agotadas"}</h4>
                <p className={`fw-bold text-center ${funcionesAgotadas != undefined ? 'fs-2' : 'pt-2'}`}>
                    {funcionesAgotadas != undefined ? funcionesAgotadas :
                        <span className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></span>}
                </p>
            </article>
            <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-4 p-3' style={{ height: 'auto' }}>
                <h4 className="text-center">{"Funciones por proyectar"}</h4>
                <p className={`fw-bold text-center ${funcionesPorProyectar != undefined ? 'fs-2' : 'pt-2'}`}>
                    {funcionesPorProyectar != undefined ? funcionesPorProyectar :
                        <span className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></span>}
                </p>
            </article>
            </div>
        </section>
    )

}

export default Tarjetas