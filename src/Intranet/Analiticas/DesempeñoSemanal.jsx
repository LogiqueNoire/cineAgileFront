import axios from "axios";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { url } from "@/configuracion/backend";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

const DesempeñoSemanal = ({ fechaConsultada }) => {

    const [listaPeliculas, setListaPeliculas] = useState([])
    const [peliculaElegida, setPeliculaElegida] = useState(0);
    const [ventasDetalladas, setVentasDetalladas] = useState();
    const [data, setData] = useState([])

    const parseDomain = () => [
        0,
        Math.max.apply(
            null,
            ventasDetalladas.map((entry) => entry.ventas),
        ),
    ];

    const domain = ventasDetalladas ? parseDomain() : [0];
    const range = [10, 125];

    const renderTooltip = (props) => {
        const { active, payload } = props;

        if (active && payload && payload.length) {
            const data = payload[0] && payload[0].payload;

            return (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #999',
                        margin: 0,
                        padding: 10,
                    }}
                >
                    <p>{data.hour}</p>
                    <p>
                        <span>value: </span>
                        {data.value}
                    </p>
                </div>
            );
        }

        return null;
    };

    const ordenamientoAlfa = (a, b) => {
        const x = a.nombre.toLowerCase();
        const y = b.nombre.toLowerCase();

        return x < y ? -1 : 1;
    }

    const consultarPeliculas = async () => {
        try {
            const f = format(fechaConsultada, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/api/intranet/v1/peliculas/ventas?fecha=${f}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
                })).data;

            setListaPeliculas(datos?.sort(ordenamientoAlfa));
        } catch (error) {
            console.error(error);
        }
    }

    const consultarVentasDetalladas = async () => {
        try {
            const p = peliculaElegida
            const f = format(fechaConsultada, "yyyy-MM-dd'T'HH:mm:ss")
            const datos = (await axios.get(`${url}/api/intranet/v1/ventas/desempeno-semanal?idPelicula=${p}&fecha=${f}`, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            })).data;
            console.log("consultado con peli", peliculaElegida)
            setVentasDetalladas(datos);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setPeliculaElegida(0)
        consultarPeliculas()
    }, [fechaConsultada])

    useEffect(() => {
        if (peliculaElegida != 0)
            consultarVentasDetalladas()
    }, [peliculaElegida])

    useEffect(() => {
        if (ventasDetalladas != undefined) {
            console.log(ventasDetalladas)
            console.log("editando data")
            const parseada = ventasDetalladas.map(el => ({ hour: el.hora, index: el.dia, value: el.ventas.toFixed(2) }))
            const array = []
            for (let i = 0; i < 7; i++) {
                let d = parseada.at(25 * i).index
                array.push(parseada.filter(el => el.index == d).reverse())
            }
            if (array.length > 0)
                setData(array)
            else
                setData([])
        } else {
            setData([])
        }
    }, [ventasDetalladas])

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        console.log(listaPeliculas)
    }, [listaPeliculas])

    return (
        <article className='d-flex flex-column border border-3 border-info-subtle rounded rounded-5 p-3' >
            <div className="d-flex flex-row flex-wrap gap-3 align-items-center justify-content-center">
                <h4 className="text-center col-12 p-0 col-sm-4">Desempeño por día/hora de</h4>
                <div className="col-12 p-0 col-sm-6">
                    <select value={peliculaElegida}
                        disabled={listaPeliculas.length == 0}
                        className='form-select'
                        onChange={(e) => { setPeliculaElegida(e.target.value) }}>
                        <option value="0">{listaPeliculas.length == 0 ? "0 películas con ventas en la semana" : "Elige una película"}</option>                        {listaPeliculas?.map((el, id) => (
                            <option key={el.idPelicula || id} value={el.idPelicula} >{el.nombre}</option>
                        ))}

                    </select>
                </div>
            </div>
            {peliculaElegida != 0 && data.length != 0 ?
                <>
                    <span className="text-start pt-2 labelOfAxis">Día de la función</span>
                    <figure className='mt-3 desempenoSemanal' style={{ height: '29vh', alignItems: 'center', position: 'relative' }}>
                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    style={{ position: 'relative', left: '-40px' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    name="sunday"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'LU', position: 'insideRight' }}
                                    style={{ position: 'relative', left: '-40px' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} style={{ position: 'relative', left: '-40px' }} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip}
                                    style={{ position: 'relative', left: '-40px' }} />
                                <Scatter data={data[0].slice().reverse()} fill="#06ff" style={{ position: 'relative', left: '-40px' }} />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={800}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'MA', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[1].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={800}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'MI', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[2].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={700}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'JU', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[3].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={700}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'VI', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[4].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={800}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tick={{ fontSize: 0 }}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'SA', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[5].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="104%" height={41}>
                            <ScatterChart
                                width={800}
                                height={50}
                                margin={{
                                    top: 10,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <XAxis
                                    type="category"
                                    dataKey="hour"
                                    name="hour"
                                    interval={0}
                                    tickLine={{ display: 'none' }}
                                    axisLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="index"
                                    height={10}
                                    width={80}
                                    tick={false}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'DO', position: 'insideRight' }}
                                />
                                <ZAxis type="number" dataKey="value" domain={domain} range={range} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                                <Scatter data={data[6].slice().reverse()} fill="#06ff" />
                            </ScatterChart>
                        </ResponsiveContainer>

                    </figure>
                    <span className="text-center labelOfAxis">Hora de inicio de la función</span>
                </>
                :
                <span className="text-center px-2 pt-3">Para mostrar el gráfico, una película debe estar seleccionada.</span>}
        </article>
    )
}
export default DesempeñoSemanal;