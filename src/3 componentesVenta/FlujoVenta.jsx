import { useLocation, useNavigate } from "react-router";

import ButacaSelect from './ButacaSelect'
import { VentaContext } from './VentaContextProvider'
import ResumenPeliComJose3 from '../4 precios/ResumenPeliComJose3'
import { VentanaPrecios } from '../4 precios/VentanaPrecios'
import { useEffect, useState, useContext } from "react";
import { VentanaPago } from "../5 pago/VentanaPago";

const FlujoVenta = () => {
    const [indice, setIndice] = useState(0);
    const [precios, setPrecios] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const { funcion, pelicula } = location.state
    console.log(funcion)
    console.log(pelicula)
    const contexto = useContext(VentaContext);
    console.log("Seleccionadas", contexto.butacaContext)
    console.log(JSON.stringify(contexto.butacaContext));

    const pasosCompra = [
        <ButacaSelect funcion={funcion} />,
        <VentanaPrecios precios={precios} />,
        <VentanaPago />
    ]
    /*
        useEffect(() => {
            if (indice === 0) {
                setPrecios(0)
            } else if (indice === 1) {
                setPrecios(1)
            }
        });*/

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
                    setError(true)
                    setMsjError("No seleccionaste ninguna butaca")
                    console.log("indice", indice)
                } else {
                    setMsjError("No")
                    console.log("msj", msjError)
                }
            } else if (indice === 1) {
                if (contexto.entradasContext.entradasSeleccionadas === 0) {
                    setError(true)
                    setMsjError("No seleccionaste ninguna entrada")
                    console.log("indice", indice)
                } else if (contexto.entradasContext.entradasSeleccionadas > contexto.butacaContext.seleccionadas.length) {
                    setError(true)
                    setMsjError("No seleccionaste la misma cantidad de entradas que de butacas")
                    console.log("indice", indice)
                } else {
                    setMsjError("No")
                }
            } else if (indice === 2) {
                //por agregar
            }
        }
    }, [contexto.butacaContext.seleccionadas, contexto.entradasContext.entradasSeleccionadas])


    return (
        <div className="d-flex my-4 py-4 border border-2">
            <div className="d-flex justify-content-center px-4 border-end">
                <ResumenPeliComJose3 pelicula={pelicula} sedePeli={funcion.nombreSede} fechaPeli={funcion.fechaHoraInicio}
                    salaPeli={funcion.codigoSala} categoria={funcion.categoria} dimension={funcion.dimension} />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                {pasosCompra[indice]}
                <div className="d-flex justify-content-center gap-4 align-items-center">
                    <button className="btn btn-primary" onClick={() => { indice != 0 ? setIndice(indice - 1) && console.log("indice", indice) : console.log("indice", indice) }} >Volver</button>
                    {error === false && msjError === "" ? <button disabled className="btn btn-primary">Siguiente</button>
                        : <button className="btn btn-primary" onClick={() => { setIndice(indice + 1) }}>Siguiente</button>}
                    {msjError === "" || msjError === "No" ?
                        <></>
                        :
                        <div className="alert alert-danger" role="alert">
                            {msjError}
                        </div>
                    }


                </div>
            </div>
        </div>)
}
/*Envuelto por el provider para que funcione el contexto*/
export default FlujoVenta;

