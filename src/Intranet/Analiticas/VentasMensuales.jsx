import { useEffect, useState } from "react";
import { url } from "@/configuracion/backend";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/components/Loading/Loading";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const VentasMensuales = () => {
    const [ventasMensuales, setVentasMensuales] = useState()
    const [loading, setLoading] = useState(true)
    const mesesCortos = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const consultarVentasMensuales = async () => {
        try {
            const datos = (await axios.get(`${url}/api/intranet/v1/ventas/totales-mes`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            env === "dev" && console.log("datos", datos)
            let resultado = []
            let i = 0
            let j = 0
            while (i <= (new Date()).getMonth()) {
                //console.log(j)
                //console.log(datos[j])
                //console.log("mes", i, ((datos[j])[1])-1, (new Date()).getMonth())
                if (datos[j] != undefined) {
                    if (i < (datos[j])[1] - 1) {
                        resultado.push({
                            ventas: 0,
                            name: mesesCortos[i]
                        })
                        //console.log("cero agregado")
                    } else {
                        resultado.push({
                            ventas: (datos[j])[0].toFixed(2),
                            name: mesesCortos[(datos[j])[1] - 1]
                        })
                        j++
                    }
                } else {
                    resultado.push({
                        ventas: 0,
                        name: mesesCortos[i]
                    })
                }
                i++;
                //console.log(resultado)
            }
            setVentasMensuales(resultado)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        consultarVentasMensuales()
    }, [])

    return (
        ventasMensuales == undefined ?
            <div className='d-flex justify-content-center'>
                <Loading></Loading>
            </div>
            :
            <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-5 pt-3' >
                <h4 className="text-center">Ventas por mes del último año</h4>
                <figure className='d-flex m-0 align-self-center w-flex' style={{ height: '25vh', alignItems: 'center', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={ventasMensuales}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            className="fs-flex"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {/*<Legend />*/}
                            {/*<Bar dataKey="totalRecaudado" fill="#8884d8" activeBar={<Rectangle fill="purple" stroke="#8884d8" />} />*/}
                            <Bar dataKey="ventas" fill="#82ca9d" activeBar={<Rectangle fill="green" stroke="#82ca9d" />}
                                label={{ position: 'top', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </figure>
            </article>
    )
}

export default VentasMensuales;