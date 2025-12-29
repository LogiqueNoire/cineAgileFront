import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import Loading from '@/components/Loading/Loading';
import axios from 'axios';
import { env, url } from '@/configuracion/backend';
import Cookies from 'js-cookie';
import "./Analiticas.css"
import VentasMensuales from './VentasMensuales';
import Tarjetas from './Tarjetas';
import DesempeñoSemanal from './DesempeñoSemanal';

const data = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658',
];

const style = {
    top: '85%',
    left: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '21px',
    fontWeight: 'bold',
    color: '#000'
};


const Analiticas = () => {

    const [loading, setLoading] = useState(true)
    const [fechaConsultada, setFechaConsultada] = useState(new Date())
    const [mesElegido, setMesElegido] = useState((new Date()).getMonth() + 1)
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const [pelisTaquilleras, setPelisTaquilleras] = useState()

    const obtenerPeliculasMasTaquillerasDelAnio = async () => {
        try {
            const datos = (await axios.get(`${url}/api/intranet/v1/peliculas/taquilleras?mes=${mesElegido}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            env === "dev" && console.log(datos.reduce((acc, el) => acc + el[0], 0))
            setPelisTaquilleras(datos.map((el, i) => ({
                ventas: el[0].toFixed(2),
                pv: el[0] / (datos.reduce((acc, e) => acc + e[0], 0)) * 100,
                name: el[1],
                fill: data[i],
            })))

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        obtenerPeliculasMasTaquillerasDelAnio()
    }, [mesElegido])

    return (
        <main className="m-4 d-flex flex-column gap-4">
            <Tarjetas fechaConsultada={fechaConsultada} setFechaConsultada={setFechaConsultada}></Tarjetas>
            <main className='d-flex gap-3 justify-content-center panel'>
                <section className='d-flex flex-column justify-content-around gap-3 col-lg-9 col-12'>
                    <VentasMensuales></VentasMensuales>
                    <DesempeñoSemanal fechaConsultada={fechaConsultada} setFechaConsultada={setFechaConsultada}></DesempeñoSemanal>
                </section>
                <section className='gap-3 col-lg-3 col-12 h-100' style={{ height: '100%', maxHeight: '100%' }}>
                    {pelisTaquilleras == undefined ?
                        <div className='d-flex justify-content-center'>
                            <Loading></Loading>
                        </div>
                        :
                        <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-5 p-3 h-100'>
                            <h4 className="ancizar-sans-regular mb-0 text-center">{"Ventas de las 7 películas"}
                                <br />{"más taquilleras del mes de"}
                                <select name="" id="" className='form-select w-75 selector-mes fs-5'
                                    style={{ display: 'inline' }} value={mesElegido} onChange={(e) => { setMesElegido(e.target.value) }}>
                                    {(new Date()).getMonth() + 1 >= 1 && <option value="1">enero</option>}
                                    {(new Date()).getMonth() + 1 >= 2 && <option value="2">febrero</option>}
                                    {(new Date()).getMonth() + 1 >= 3 && <option value="3">marzo</option>}
                                    {(new Date()).getMonth() + 1 >= 4 && <option value="4">abril</option>}
                                    {(new Date()).getMonth() + 1 >= 5 && <option value="5">mayo</option>}
                                    {(new Date()).getMonth() + 1 >= 6 && <option value="6">junio</option>}
                                    {(new Date()).getMonth() + 1 >= 7 && <option value="7">julio</option>}
                                    {(new Date()).getMonth() + 1 >= 8 && <option value="8">agosto</option>}
                                    {(new Date()).getMonth() + 1 >= 9 && <option value="9">setiembre</option>}
                                    {(new Date()).getMonth() + 1 >= 10 && <option value="10">octubre</option>}
                                    {(new Date()).getMonth() + 1 >= 11 && <option value="11">noviembre</option>}
                                    {(new Date()).getMonth() + 1 >= 12 && <option value="12">diciembre</option>}
                                </select>
                            </h4>
                            <figure className='' style={{ width: 'auto', height: '53vh' }}>
                                {pelisTaquilleras.length != 0 ?
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadialBarChart cx="50%" cy="40%" innerRadius="20%" outerRadius="95%" barSize={10} data={pelisTaquilleras} startAngle={90} endAngle={-270}>
                                            <RadialBar
                                                className='radial-bar-label'
                                                minAngle={12}
                                                label={{ position: 'insideStart', fill: '#000000ff', fontWeight: 'bold' }}
                                                background
                                                clockWise
                                                dataKey="ventas"
                                                style={{ left: '0px' }}

                                            />
                                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style}
                                                style={{ color: '#000000' }} />
                                            <Tooltip itemSorter="name" />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    :
                                    <p className='fs-2 text-center my-4 ancizar-sans-regular'>No hay datos</p>
                                }
                            </figure>

                        </article>
                    }
                </section>
            </main>

        </main >
    )
}

export default Analiticas