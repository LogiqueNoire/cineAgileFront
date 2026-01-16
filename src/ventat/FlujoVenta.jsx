import { useLocation, useNavigate } from "react-router";

import { VentaContext } from '@/ventat/VentaContextProvider'
import ButacaPage from '@/ventat/3 butacas/ButacaPage'
import ResumenPeli from '@/ventat/ResumenPeli'
import { PreciosPage } from '@/ventat/4 precios/PreciosPage'
import React, { useEffect, useState, useContext } from "react";
import { PagoPage } from "@/ventat/5 pago/PagoPage";
import Funcion from "@/services/Funcion";
import Contador from "@/components/contador/Contador";
import Entrada from "@/services/Entrada";
import { format, isBefore } from "date-fns";

import cancelarSvg from "@/assets/operaciones/X.svg";
import { env } from "@/configuracion/backend";

const ventanas = [ButacaPage, PreciosPage, PagoPage];

const FlujoVenta = () => {
    const [indice, setIndice] = useState(0);
    const [precios, setPrecios] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const { pelicula } = location.state
    const contexto = useContext(VentaContext);
    const [cancelling, setCancelling] = useState(false);

    const funcion = contexto.general.funcion;

    const next = () => {
        Funcion.estaDisponible(funcion.idFuncion).then(res => {
            env === "dev" && console.log(funcion, res);
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

        Entrada.desbloquearEntradas(info)
            .then(res => { accion(); })
            .catch(err => { console.log(err); });
    };

    let ventana = React.createElement(ventanas[indice], {
        ...ventanaProps[indice],
        next: next,
        prev: prev,
        onCancelar
    });

    const [error, setError] = useState(false)
    const [msjError, setMsjError] = useState("")

    useEffect(() => {
        if (contexto.pruebaInicialContext.pruebaInicial == 0) {
            return
        }
        if (indice === 0) {
            if (contexto.butacaContext.seleccionadas.length === 0) {
                setMsjError("No seleccionaste ninguna butaca")
                env === "dev" && console.log("indice", indice)
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
                env === "dev" && console.log("indice", indice)
            } else {
                setMsjError("No")
                setError(false)
            }
        } else if (indice === 2) {
            //por agregar
        }

    }, [contexto.butacaContext.seleccionadas, contexto.entradasContext.entradasSeleccionadas])

    console.log()

    useEffect(() => {
        const tiempoInicio = new Date(contexto.general.funcion.fechaHoraInicio);
        if (isBefore(tiempoInicio, new Date())) {
            navigate(-1);
        }
    }, [location]);

    const onCancelarBtn = () => {
        if (cancelling) return;
        setCancelling(true);

        let res = confirm("¿Estás seguro que deseas cancelar la compra?")
        if (res) onCancelar(() => { navigate(-1); });
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="d-flex flex-column justify-content-center p-sm-2 p-lg-4 bg-light col-12 col-lg-4 overflow-hidden">
                <ResumenPeli pelicula={pelicula} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio}
                    salaPeli={funcion.codigoSala} categoria={funcion.categoria} dimension={funcion.dimension} idFuncion={funcion.idFuncion} />
            </div>

            <div className="d-flex flex-column p-4 pt-5 bg-white align-items-center flex-grow-1 col-12 col-lg-8">
                <div className="container d-flex flex-row justify-content-between w-100 mb-2 col-12 flex-wrap-reverse flex-md-nowrap width-fila-header-venta">
                    <div className="d-flex justify-content-start gap-3">
                        <span className="d-flex gap-2 align-items-center">
                            <div className={`ancizar-sans-regular fs-5 p-1 rounded-circle text-white fw-bold d-flex justify-content-center align-items-center ${indice == 0 ? "bg-cineagile-blue-500" : "bg-dark-subtle"}`}
                                style={{ width: "35px", aspectRatio: "1/1", lineHeight: "0.95" }}>1</div>
                            <span className={`ancizar-sans-regular fs-5 ${indice == 0 ? "cineagile-blue-500" : "color-dark-sutble"}`}>Butacas</span>
                        </span>
                        <span className="d-flex gap-2 justify-content-center align-items-center">
                            <div className={`ancizar-sans-regular fs-5 p-1 rounded-circle text-white fw-bold d-flex justify-content-center align-items-center ${indice == 1 ? "bg-cineagile-blue-500" : "bg-dark-subtle"}`}
                                style={{ width: "35px", aspectRatio: "1/1", lineHeight: "0.95" }}>2</div>
                            <span className={`ancizar-sans-regular fs-5 ${indice == 1 ? "cineagile-blue-500" : "color-dark-sutble"}`}>Precios</span>
                        </span>
                        <span className="d-flex gap-2 justify-content-center align-items-center">
                            <div className={`ancizar-sans-regular fs-5 p-1 rounded-circle text-white fw-bold d-flex justify-content-center align-items-center ${indice == 2 ? "bg-cineagile-blue-500" : "bg-dark-subtle"}`}
                                style={{ width: "35px", aspectRatio: "1/1", lineHeight: "0.95" }}>3</div>
                            <span className={`ancizar-sans-regular fs-5 ${indice == 2 ? "cineagile-blue-500" : "color-dark-sutble"}`}>Pago</span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-end gap-3">
                        <Contador onCancelar={onCancelar} />
                        <button disabled={contexto.general.submitting || cancelling} className="btn btn-danger rounded rounded-5 p-2" onClick={onCancelarBtn}>
                            <img src={cancelarSvg} alt="" />
                        </button>
                    </div>
                </div>

                <div className="col-12">
                    {ventana}
                </div>
            </div>
        </div>
    )
}

export default FlujoVenta;

