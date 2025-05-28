import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import QRCode from "react-qr-code";

const EntradaCard = ({ infoGeneral, entrada }) => {
    // Adherir 'Z' a la fecha UTC en formato ISO 8601 hará que new Date() transforme
    // dicha fecha a la zona horaria correcta.
    const tiempoRegistroCorrecto = (new Date(entrada.tiempoRegistro + 'Z')).toLocaleString();

    // Falta estandarizar todas las fechas de las funciones a UTC
    const fechaHoraInicioCorrecto = (new Date(infoGeneral.fechaHoraInicio)).toLocaleString();

    const { fila, columna } = entrada.butaca;
    const letra = String.fromCharCode('A'.charCodeAt(0) + fila);

    console.log(infoGeneral)

    return (
        <div className="border border-secondary entrada-card p-3">

            <div>

                <div className="d-flex align-items-center gap-4">
                    <h2 className="w-50 text-center">CineAgile<br />Entrada</h2>
                    <QRCode className="w-50" style={{height: "auto"}} value={158454545} /> {/*codigoQR*/}
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

    const descargarPdf = async () => {
        const docs = document.querySelectorAll(".entrada-card");
        const opts = {
            margin: 10
        };

        let pdf = Entrada.generarPdf()

        /*html2pdf().from(document.createElement("div")).set(opts).toPdf();*/

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
    }

    return (
        <div className="w-100 p-4">
            <div className="container">

                <h1>Entradas</h1>
                <button onClick={descargarPdf}>Descargar PDF</button>

                <div>
                    {entradas && entradas.entradas.map(el => {
                        return (
                            <EntradaCard infoGeneral={{ ...entradas }} entrada={el} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default InfoEntradas;