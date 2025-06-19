import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Entrada from '../servicios/Entrada'
import QRCode from "react-qr-code";
import { url } from "../configuracion/backend";
import Encriptador from "../servicios/Encriptador";
import { useRef } from "react";
import jsPDF from "jspdf";

const EntradaCard = ({ infoGeneral, entrada, token }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    console.log("entrada", entrada)

    const tiempoRegistroCorrecto = (new Date(entrada.tiempoRegistro)).toLocaleString();

    // Falta estandarizar todas las fechas de las funciones a UTC
    const fechaHoraInicioCorrecto = (new Date(infoGeneral.fechaHoraInicio)).toLocaleString();

    const { fila, columna } = entrada.butaca;
    const letra = String.fromCharCode('A'.charCodeAt(0) + fila);

    return (
        <div className="border border-secondary p-3">

            <div>

                <div className="d-flex align-items-center">
                    <h2 className="w-50 text-center">CineAgile<br />Entrada</h2>
                    <div className="w-50 d-flex justify-content-center">
                        <h2>{ }</h2>
                        <QRCode className="w-100 d-flex align-items-center" style={{ height: "auto" }}
                            value={`${url}/entrada/${token}`} renderAs='canvas' /> {/*codigoQR*/}

                    </div>
                </div>

                <h2 className="text-center mt-4">Datos elegidos</h2>

                <h5>Pelicula: {infoGeneral.tituloPelicula}</h5>
                <h5>Fecha y hora: {fechaHoraInicioCorrecto}</h5>
                <h5>Sede: {infoGeneral.nombreSede} </h5>
                <h5>Sala: {infoGeneral.sala}</h5>
                <h5>Butaca: {letra + (columna + 1)}</h5>

                <h2 className="text-center mt-4">Datos del pago</h2>
                <h5>Fecha y hora del pago: {tiempoRegistroCorrecto}</h5>
                <h5>Precio final: {entrada.costoFinal} nuevos soles </h5>
            </div>
        </div>
    )

}

const InfoEntradas = () => {
    const location = useLocation();
    const { entradas = null } = location.state || {};

    if (entradas === null) {
        const entradas = Entrada.buscarEntrada(codigo)
        navigate("/entradas", { state: { entradas: funcion } })
    }


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
        let mypdf = Entrada.generarPdf(entradas)
    }

    /*
    const canvasRef = canvasRef.current;

    const generarPDF = () => {
        const doc = new jsPDF();

        // Agrega texto u otros datos
        doc.text("Entrada para el evento", 10, 10);
        doc.text("Nombre: Juan Pérez", 10, 20);
        doc.text("Fecha: 2025-06-22", 10, 30);

        // Captura la imagen del QR desde el canvas
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 10, 40, 50, 50); // x, y, width, height
        }

        doc.save("entrada.pdf");
    };*/

    console.log(entradas)

    return (
        <div className="w-100 p-4">
            <div className="container-fluid gap-4">


                <div className="d-flex flex-column align-items-center gap-4 mb-4">
                    <h1>Entradas</h1>
                    <button onClick={descargarPdf}>Descargar PDF</button>
                    <button onClick={generarPDF}>Descargar PDF v2</button>
                </div>

                <div className="d-flex flex-column align-items-center gap-4">
                    {entradas && entradas.entradas.map((el, i) => {
                        return (
                            <EntradaCard infoGeneral={{ ...entradas }} entrada={el} token={entradas.tokens[i]} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default InfoEntradas;