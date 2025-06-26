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
        <div className="border border-secondary p-3">

            <div>

                <div className="d-flex align-items-center">
                    <h2 className="w-50 text-center">CineAgile<br />Entrada</h2>
                    <div className="w-50 d-flex justify-content-center">
                        <img className="w-100 d-flex align-items-center" style={{ height: "auto", width: '256px' }}
                            src={qrUrl} alt="QR Entrada" />
                    </div>
                </div>

                <h2 className="text-center mt-4">Datos elegidos</h2>

                <h5>Pelicula: {infoGeneral.tituloPelicula}</h5>
                <h5>Clasificación: {infoGeneral.clasificacion}</h5>
                <h5>Fecha y hora: {fechaHoraInicioCorrecto}</h5>
                <h5>Sede: {infoGeneral.nombreSede} </h5>
                <h5>Sala: {infoGeneral.sala}</h5>
                <h5>Butaca: {letra + (columna + 1)}</h5>
                <h5>Tipo de entrada: {tipoPersona}</h5>

                <h2 className="text-center mt-4">Datos del pago</h2>
                <h5>Fecha y hora del pago: {tiempoRegistroCorrecto}</h5>
                <h5>Precio final: S/ {entrada.costoFinal.toFixed(2)}</h5>
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
                    <h1>Entradas</h1>
                    <button className='btn btn-primary' onClick={() => handleGenerarPDF()}>Descargar PDF</button>
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