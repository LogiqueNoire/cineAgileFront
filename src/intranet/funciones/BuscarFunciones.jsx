import { useContext, useState, useEffect } from "react";
import { FuncionesContext } from "./FuncionesContext";
import Loading from '@/components/loading/Loading';
import Sede from "@/services/Sede";
import { ordenamientoAlfa } from "@/utils";

const BuscarFunciones = ({ handlePeliculaChange, handleSalaChange }) => {
    const [loading, setLoading] = useState(true);
    const {
        valoresBusqueda,
        setValoresBusqueda,
        setListaFunciones
    } = useContext(FuncionesContext);

    useEffect(() => {
        consultarSedesTodas()
        consultarSedesActivas()
    }, [])

    const consultarSedesTodas = async () => {
        try {
            const datos = await Sede.todasSedes()

            setValoresBusqueda(prev => ({
                ...prev,
                sedesTodas: datos == undefined ? undefined : datos.sort(ordenamientoAlfa)
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    const consultarSedesActivas = async () => {
        try {
            const datos = await Sede.mostrarSedesActivas()

            setValoresBusqueda(prev => ({
                ...prev,
                sedesActivas: datos == undefined ? undefined : datos.sort(ordenamientoAlfa)
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const cambiarSede = (e) => {
        setValoresBusqueda(prev => ({
            ...prev,
            sedeElegida: e.target.value
        }));
    }

    const configPorFiltro = {
        pelicula: {
            opciones: valoresBusqueda.peliculasSede,
            selected: valoresBusqueda.selectPelicula,
            onChange: handlePeliculaChange,
            label: "Película",
            empty: "No hay películas",
            optionLabel: el => el.nombre,
        },
        sala: {
            opciones: valoresBusqueda.salasSede,
            selected: valoresBusqueda.selectSala,
            onChange: handleSalaChange,
            label: "Sala",
            empty: "No hay salas",
            optionLabel: el => el.codigoSala,
        },
    };

    const filtroActual = configPorFiltro[valoresBusqueda.filtro];

    return (
        loading === true
            ? <Loading></Loading> :
            <div className='d-flex flex-column align-items-center gap-4 m-3 mt-4 p-4 rounded-4 shadow'>
                <h3 className="ancizar-sans-regular mb-0">Búsqueda de funciones</h3>
                <div>
                    <label className='d-flex text-nowrap'>Elige sede</label>
                    <select className='form-select' onChange={(e) => cambiarSede(e)}>
                        <option value='0'>Elija una sede</option>
                        {valoresBusqueda.sedesTodas.map((el, id) => (
                            <option key={el.id || id} value={el.id} >{el.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex gap-4">
                    <div>
                        <label className='d-flex text-nowrap'>Elige fecha dentro de una semana</label>
                        <input type='date' className='form-control' value={valoresBusqueda.fechaElegida} placeholder='Fecha'
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={
                                (e) => {
                                    setValoresBusqueda(prev => ({ ...prev, fechaElegida: e.target.value }));
                                    setListaFunciones([]) // Limpiar funciones al cambiar la fecha
                                }
                            } />
                    </div>
                    <div>
                        <label className='text-nowrap'>Filtro</label>
                        {valoresBusqueda.sedeElegida === '' || valoresBusqueda.sedeElegida === '0' ?
                            <select className='form-select' disabled>
                                <option value=''>Elige filtro</option>
                            </select>
                            :
                            <select className='form-select' value={valoresBusqueda.filtro} onChange={(e) => {
                                setValoresBusqueda(prev => ({
                                    ...prev,
                                    filtro: e.target.value,
                                    selectPelicula: '',
                                    selectSala: '',
                                }));
                                setListaFunciones([])
                            }} >
                                <option value=''>Elige filtro</option>
                                <option value='pelicula'>Por película</option>
                                <option value='sala'>Por sala</option>
                            </select>
                        }
                    </div>
                </div>

                <div className='d-flex gap-4 w-100 align-items-center justify-content-center'>
                    {filtroActual &&
                        (filtroActual.opciones == undefined ?
                            <Loading style={{ 'margin': '0px', 'width': '62px', 'height': '62px' }}></Loading>
                            :
                            <div>
                                <label className='d-flex text-nowrap'>
                                    {valoresBusqueda.filtro === 'pelicula' && 'Película'}
                                    {valoresBusqueda.filtro === 'sala' && 'Sala'}
                                </label>
                                {filtroActual.opciones.length > 0 ?
                                    <select value={filtroActual.selected}
                                        className='form-select' onChange={(e) => filtroActual.onChange(e)}>
                                        <option value="">
                                            {"Elige una "}
                                            {valoresBusqueda.filtro === 'pelicula' && 'película por'}
                                            {valoresBusqueda.filtro === 'sala' && 'sala de'}
                                            {" la sede"}
                                        </option>
                                        {filtroActual.opciones.map((el, id) => (
                                            <option key={el.id || id} value={el.id} >{filtroActual.optionLabel(el)}</option>
                                        ))}
                                    </select>
                                    :
                                    <select className='form-select' disabled>
                                        <option value="">{filtroActual.empty}</option>
                                    </select>
                                }
                            </div>)
                    }
                </div>
            </div>

    )
}

export default BuscarFunciones;