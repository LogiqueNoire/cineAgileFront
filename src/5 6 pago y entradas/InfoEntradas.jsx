import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Entrada from '../servicios/Entrada'
import { QRCodeCanvas } from "qrcode.react";
import { url } from "../configuracion/backend";
import Encriptador from "../servicios/Encriptador";
import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import React from "react";

const EntradaCard = ({ infoGeneral, entrada, token, qrRef }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    console.log("entrada", entrada)

    const tiempoRegistroCorrecto = (new Date(entrada.tiempoRegistro)).toLocaleString();

    // Falta estandarizar todas las fechas de las funciones a UTC
    const fechaHoraInicioCorrecto = (new Date(infoGeneral.fechaHoraInicio)).toLocaleString();

    const { fila, columna } = entrada.butaca;
    const letra = String.fromCharCode('A'.charCodeAt(0) + fila);

    let tipoPersona = "";
    switch(entrada.persona) {
        case "general": tipoPersona = "General"; break;
        case "mayores": tipoPersona = "Mayor"; break;
        case "niños": tipoPersona = "Niño"; break;
        case "conadis": tipoPersona = "Conadis"; break;
    }


    return (
        <div className="border border-secondary p-3">

            <div>

                <div className="d-flex align-items-center">
                    <h2 className="w-50 text-center">CineAgile<br />Entrada</h2>
                    <div className="w-50 d-flex justify-content-center">
                        <QRCodeCanvas className="w-100 d-flex align-items-center" ref={qrRef} style={{ height: "auto" }}
                            size={256} value={`${url}/entrada/${token}`} /> {/*codigoQR*/}

                    </div>
                </div>

                <h2 className="text-center mt-4">Datos elegidos</h2>

                <h5>Pelicula: {infoGeneral.tituloPelicula}</h5>
                <h5>Fecha y hora: {fechaHoraInicioCorrecto}</h5>
                <h5>Sede: {infoGeneral.nombreSede} </h5>
                <h5>Sala: {infoGeneral.sala}</h5>
                <h5>Butaca: {letra + (columna + 1)}</h5>
                <h5>Tipo: { tipoPersona }</h5>

                <h2 className="text-center mt-4">Datos del pago</h2>
                <h5>Fecha y hora del pago: {tiempoRegistroCorrecto}</h5>
                <h5>Precio final: {entrada.costoFinal.toFixed(2)} nuevos soles </h5>
            </div>
        </div>
    )

}

const InfoEntradas = () => {
    const location = useLocation();
    const { entradas = null } = location.state || {};
    const qrRefs = useRef([]);

    // Limpiar y asignar refs una vez que llegan las entradas

    console.log(entradas);
    if (entradas?.entradas && qrRefs.current.length !== entradas.entradas.length) {
        qrRefs.current = entradas.entradas.map(() => React.createRef());
    }


    const handleGenerarPDF = () => {
        setTimeout(() => {
            Entrada.generarPdf(entradas, qrRefs.current);
        }, 500); // Espera medio segundo
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
                                token={entradas.tokens[i]}
                                qrRef={qrRefs.current[i]} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default InfoEntradas;


/*

const descargarPdf = async () => {
        const docs = document.querySelectorAll(".entrada-card");
        const opts = {
            margin: 10
        };

        let pdf = html2pdf().from(document.createElement("div")).set(opts).toPdf();

        let primero = true;

        for (let card of docs) {
            pdf = pdf.get("pdf").then(pdf => {
                if (!primero)
                    pdf.addPage();
                else
                    primero = false;
            }).from(card).toContainer().toCanvas().toPdf();
        }
        await pdf.save();
        console.log("entradas", entradas)
        let mypdf = 
    }*/