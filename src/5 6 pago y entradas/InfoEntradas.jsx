import { useLocation, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Entrada from '../servicios/Entrada'
import { QRCodeCanvas } from "qrcode.react";
const url = import.meta.env.VITE_FRONT_URL;
import Encriptador from "../servicios/Encriptador";
import { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import React from "react";
import QRCode from 'qrcode';
import iconoEntrada from "../assets/ticket.svg"
import iconoDownload from "../assets/download.svg"
import "./progressBar.css";

const EntradaCard = ({ infoGeneral, entrada, token }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    //console.log("token en info entrada", token.replace(/\//g, "%2F").replace(/=/g, "%3D"))

    const tiempoRegistroCorrecto = (new Date(entrada.tiempoRegistro)).toLocaleString()
    // Falta estandarizar todas las fechas de las funciones a UTC
    const fechaHoraInicioCorrecto = (new Date(infoGeneral.fechaHoraInicio)).toLocaleString();

    const { fila, columna } = entrada.butaca;
    const letra = String.fromCharCode('A'.charCodeAt(0) + fila);

    let tipoPersona = "";
    switch (entrada.persona) {
        case "general": tipoPersona = "General"; break;
        case "mayores": tipoPersona = "Mayor de 60"; break;
        case "niños": tipoPersona = "Niño"; break;
        case "conadis": tipoPersona = "Conadis"; break;
    }

    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        const generarQr = async () => {
            const urlCompleta = `${url}/entrada/${encodeURIComponent(token)}`;
            const dataUrl = await QRCode.toDataURL(urlCompleta);
            setQrUrl(dataUrl);
        };
        generarQr();
    }, [token]);

    return (
        <div className="border border-2 border-secondary p-3">

            <div className="align-items-center direction">
                <div className="align-items-center direction-inverse">
                    <h2 className="text-center">CineAgile<br />Entrada</h2>
                    <div className="qr">
                        <img className=""
                            src={qrUrl} alt="QR Entrada" />
                    </div>
                </div>
                <div>
                    <h2 className="text-center">Datos de la función</h2>
                    <h5 className="detalleEntrada">Pelicula: {infoGeneral.tituloPelicula}</h5>
                    <h5 className="detalleEntrada">Clasificación: {infoGeneral.clasificacion}</h5>
                    <h5 className="detalleEntrada">Fecha y hora: {fechaHoraInicioCorrecto}</h5>
                    <h5 className="detalleEntrada">Sede: {infoGeneral.nombreSede} </h5>
                    <h5 className="detalleEntrada">Sala: {infoGeneral.sala}</h5>
                    <h5 className="detalleEntrada">Butaca: {letra + (columna + 1)}</h5>
                    <h5 className="detalleEntrada">Tipo de entrada: {tipoPersona}</h5>

                    <h2 className="text-center mt-4">Datos del pago</h2>
                    <h5 className="detalleEntrada">Fecha y hora: {tiempoRegistroCorrecto}</h5>
                    <h5 className="detalleEntrada">Precio final: S/ {entrada.costoFinal.toFixed(2)}</h5>
                </div>
            </div>
        </div>
    )

}

const InfoEntradas = () => {
    const { codigo } = useParams()
    const frase = "Generando documento..."
    const location = useLocation();
    const [entradas, setEntradas] = useState(location.state?.entradas || null);
    const [downloading, setDownloading] = useState(false)
    const [progress, setProgress] = useState("")
    const [percent, setPercent] = useState(0)
    const [isLooping, setIsLooping] = useState(false);
    const [isLooping2, setIsLooping2] = useState(false);
    const [isLooping3, setIsLooping3] = useState(false);
    useEffect(() => {
        let interval1;
        let interval2;

        if (downloading) {
            interval1 = setInterval(() => {
                setProgress(prev => {
                    if (prev.length < frase.length) {
                        return frase.slice(0, prev.length + 1);
                    } else {
                        clearInterval(interval1);
                        return prev;
                    }
                });
            }, 100);

            interval2 = setInterval(() => {
                setPercent(prev => {
                    if (prev < 100) {
                        return prev + 1;
                    } else {
                        clearInterval(interval2);
                        return prev;
                    }
                });
            }, 22);
        } else {
            setProgress("");
            setPercent(0);
        }

        return () => {
            if (interval1) clearInterval(interval1);
            if (interval2) clearInterval(interval2);
        };
    }, [downloading, entradas]);


    useEffect(() => {
        if (!entradas && codigo) {
            const fetchEntrada = async () => {
                try {
                    //console.log(codigo)
                    const response = await Entrada.buscarEntrada(decodeURIComponent(codigo));
                    //console.log(response);

                    setEntradas(response.data);
                } catch (error) {
                    console.error("Error al buscar entrada:", error);
                }
            };

            fetchEntrada();
        }
    }, [codigo, entradas]);

    const handleGenerarPDF = () => {
        setDownloading(true)
        setTimeout(() => {
            Entrada.generarPdf(entradas, entradas.tokens, setDownloading);
        }, 2500);
    };

    useEffect(() => {
        if (progress.length === frase.length) {
            const timeout = setTimeout(() => {
                setIsLooping(true);
            }, 4000);
            const timeout2 = setTimeout(() => {
                setIsLooping2(true);
            }, 350);
            const timeout3 = setTimeout(() => {
                setIsLooping3(true);
            }, 2500);

            return () => {
                clearTimeout(timeout)
                clearTimeout(timeout2)
                clearTimeout(timeout3)
            };
        } else {
            setIsLooping(false);
            setIsLooping2(false);
            setIsLooping3(false);
        }
    }, [progress]);


    return (
        <div className="w-100 p-4">
            <div className="container-fluid gap-4">

                <div className="d-flex flex-column align-items-center gap-4 mb-4">
                    <div className="d-flex gap-3 justify-content-center align-items-center flex-wrap">
                        <div className="d-flex gap-2 align-items-center">
                            <h1 className="fs-1" style={{ color: '#01217B' }}>Entradas</h1>
                            <img src={iconoEntrada} alt="Password" className="" style={{ filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)", height: '70px' }} />
                        </div>
                        <button className='btn btn-primary fw-bold fs-5 p-2 rounded-4' onClick={() => handleGenerarPDF()}>
                            <img src={iconoDownload} alt="Password" className="" style={{ height: '45px' }} />
                        </button>
                    </div>
                    {progress != undefined && progress.length > 0 && progress.length <= frase.length &&
                        <div className="progress-wrapper">
                            <div className="progress-text">{progress}</div>
                            <div className={`water-fill`} style={{ width: `${percent}%`, height: '100%' }}>
                                <div className={`wave wave1 ${isLooping ? 'loop' : ''}`}></div>
                                <div className={`wave wave2 ${isLooping2 ? 'loop' : ''}`}></div>
                                <div className={`wave wave3 ${isLooping3 ? 'loop' : ''}`}></div>
                                <div className="bubbles"></div>
                            </div>
                        </div>}
                </div>

                <div className="d-flex flex-column align-items-center gap-4">
                    {entradas && entradas.entradas.map((el, i) => {
                        return (
                            <EntradaCard
                                infoGeneral={{ ...entradas }}
                                entrada={el}
                                token={entradas.tokens ? entradas.tokens[i] : null}
                            />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default InfoEntradas;