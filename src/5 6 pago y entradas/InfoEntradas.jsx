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

const EntradaCard = ({ infoGeneral, entrada, token }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    console.log("token en info entrada", token.replace(/\//g, "%2F").replace(/=/g, "%3D"))

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

    const location = useLocation();
    const [entradas, setEntradas] = useState(location.state?.entradas || null);

    useEffect(() => {
        if (!entradas && codigo) {
            const fetchEntrada = async () => {
                try {
                    console.log(codigo)
                    const response = await Entrada.buscarEntrada(decodeURIComponent(codigo));
                    console.log(response);
                    setEntradas(response.data);
                } catch (error) {
                    console.error("Error al buscar entrada:", error);
                }
            };

            fetchEntrada();
        }
    }, [codigo, entradas]);

    const handleGenerarPDF = () => {
        setTimeout(() => {
            Entrada.generarPdf(entradas, entradas.tokens);
        }, 2500);
    };

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