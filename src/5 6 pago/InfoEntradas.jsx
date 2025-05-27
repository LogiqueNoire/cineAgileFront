import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

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
    <div className="border border-secondary entrada-card">
        <div>CineAgile entrada (titulo)</div>
        <div>QR</div>

        <h2>Datos elegidos</h2>
        <p>Pelicula: { infoGeneral.tituloPelicula }</p>
        <p>Fecha y hora: { fechaHoraInicioCorrecto }</p>
        <p>Sede: { infoGeneral.nombreSede } </p>
        <p>Sala: { infoGeneral.sala }</p>
        <p>Butaca: { letra + (columna + 1) }</p>

        <h2>Datos del pago</h2>
        <p>Fecha y hora del pago: { tiempoRegistroCorrecto }</p>
        <p>Precio final: { entrada.costoFinal } nuevos soles </p>
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
    }

    return (
        <div className="container">
            <h1>Entradas</h1>
            <button onClick={ descargarPdf }>Descargar PDF</button>

            <div>
                { entradas && entradas.entradas.map(el => {
                    return (
                        <EntradaCard infoGeneral={ { ...entradas } } entrada={ el } />
                    )
                }) }
            </div>

        </div>
    )
}

export default InfoEntradas;