import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContext } from './VentaContextProvider'
import ResumenPeliComJose3 from '../4 precios/ResumenPeliComJose3'
import { VentanaPrecios } from '../4 precios/VentanaPrecios'
import React, { useEffect, useState, useContext } from "react";
import { VentanaPago } from "../5 6 pago y entradas/VentanaPago";
import Funcion from "../servicios/Funcion";
import Contador from "./Contador";
import Entrada from "../servicios/Entrada";
import { format, isBefore } from "date-fns";

import cancelarSvg from "../assets/operaciones/X.svg";

const ventanas = [ButacaSelect, VentanaPrecios, VentanaPago];

const FlujoVenta = () => {
    const [indice, setIndice] = useState(0);
    const [precios, setPrecios] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const { pelicula } = location.state
    const contexto = useContext(VentaContext);
    const [ cancelling, setCancelling ] = useState(false);

    const funcion = contexto.general.funcion;

    const next = () => {
        Funcion.estaDisponible(funcion.idFuncion).then(res => {
            console.log(funcion, res);
            setIndice(indice + 1);
        }).catch(err => {
            console.log(err);
            navigate("/error", { state: { errorInfo: "Función cerrada." } });
        });
    }

    const prev = () => {
        setIndice(Math.max(indice - 1, 0));
    }

    const ventanaProps = [
        { // ButacaSelect
            funcion: funcion
        },
        { // VentanaPrecios
            precios: precios
        },
        {}
    ]

    const onCancelar = (accion) => {
        if (contexto.butacaContext.seleccionadas.length == 0) {
            navigate(-1);
            return;
        }

        const fechaAhora = (new Date(Date.now()));
        const info = {
            id_funcion: funcion.idFuncion,
            entradas: contexto.butacaContext.seleccionadas.map(el => ({ id_butaca: +el.id })),
            tiempoRegistro: format(fechaAhora, "yyyy-MM-dd.HH:mm:ss").replace(".", "T")
        };

        Entrada.desbloquearEntradas(info).then(res => {
            accion();
        }).catch(err => {
            console.log(err);
        });

    };

    let ventana = React.createElement(ventanas[indice], {
        ...ventanaProps[indice],
        next: next,
        prev: prev,
        onCancelar
    });

    const navigatePrecios = () => {
        navigate(`/funcion/precios`,
            {
                state: {
                    pelicula: pelicula, funcion: funcion
                }
            });
    };

    const [error, setError] = useState(false)
    const [msjError, setMsjError] = useState("")

    useEffect(() => {
        if (contexto.pruebaInicialContext.pruebaInicial === 0) {
        }
        else {
            if (indice === 0) {
                if (contexto.butacaContext.seleccionadas.length === 0) {
                    setMsjError("No seleccionaste ninguna butaca")
                    console.log("indice", indice)
                    setError(true)
                } else {
                    setMsjError("No")
                    console.log("msj", msjError)
                    setError(false)
                }
            } else if (indice === 1) {
                setError(false)
                if (contexto.entradasContext.entradasSeleccionadas != contexto.butacaContext.seleccionadas.length) {
                    setError(true)
                    console.log("indice", indice)
                } else {
                    setMsjError("No")
                    setError(false)
                }
            } else if (indice === 2) {
                //por agregar
            }
        }
    }, [contexto.butacaContext.seleccionadas, contexto.entradasContext.entradasSeleccionadas])

    console.log()

    useEffect(() => {
        const tiempoInicio = new Date(contexto.general.funcion.fechaHoraInicio);
        if (isBefore(tiempoInicio, new Date())) {
            navigate(-1);
        } 
    }, [ location ]);

    const retroceder = () => {
        console.log("retrocediendo")
        if (indice != 0) {
            if (indice == 1) {
                contexto.entradasContext.setEntradasSeleccionadas(0)
                contexto.entradasContext.setGeneralesSeleccionadas(0)
                contexto.entradasContext.setNiñosSeleccionadas(0)
                contexto.entradasContext.setConadisSeleccionadas(0)
                contexto.entradasContext.setMayoresSeleccionadas(0)
                contexto.totalContext.setTotal(0)
            }
            setIndice(indice - 1)
            console.log("indice", indice)
            setError(false)
        } else {
            console.log("indice", indice)
        }

    }

    const onCancelarBtn = () => {
        if (cancelling) return;
        setCancelling(true);
        
        let res = confirm("¿Estás seguro que deseas cancelar la compra?")
        if (res) onCancelar(() => { navigate(-1); });
    }

    return (
        <>
            <div className="d-flex border border-2 flex-wrap justify-content-center">
                <div className="d-flex flex-column justify-content-center p-sm-2 p-lg-4 bg-light col-12 col-lg-4 overflow-hidden">
                    <ResumenPeliComJose3 pelicula={pelicula} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio}
                        salaPeli={funcion.codigoSala} categoria={funcion.categoria} dimension={funcion.dimension} idFuncion={funcion.idFuncion} />
                </div>

                <div className="d-flex flex-column py-2 bg-white align-items-center flex-grow-1 col-12 col-lg-8 px-4">
                    <div className="d-flex justify-content-between w-100 mb-2 col-12">
                        <Contador onCancelar={onCancelar} />
                        <button disabled={contexto.general.submitting || cancelling} className="btn btn-danger rounded rounded-5 p-2" onClick={onCancelarBtn}>
                            <img src={cancelarSvg} alt="" />
                        </button>
                    </div>
                    <div className="col-12">
                        {ventana}
                    </div>
                </div>
            </div>

        </>
    )
}
/*Envuelto por el provider para que funcione el contexto*/
export default FlujoVenta;

