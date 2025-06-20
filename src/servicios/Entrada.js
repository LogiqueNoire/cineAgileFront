import axios from 'axios'
import { url } from '../configuracion/backend'
import jsPDF from 'jspdf';

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/entrada`, datos);
        console.log("resultado entrada js", resultado)
        return resultado;
    }

    static async generarPdf(entradasCompletas, qrRefs) {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "Bold");

        const entradas = entradasCompletas.entradas

        const escribirInfoComun = (data) => {
            doc.text(`Cine Agile`, 40, 40);
            doc.text(`Pelicula: ${data.tituloPelicula}`, 20, 80);
            doc.text(`Fecha y hora de inicio de la función: ${(new Date(data.fechaHoraInicio)).toLocaleString()}`, 20, 120);
            doc.text(`Sede: ${data.nombreSede}`, 20, 90);
            doc.text(`Sala: ${data.sala}`, 20, 100);
        }
        const escribirEntrada = (entrada, index) => {
            doc.text(`Entrada ${index + 1}`, 40, 50);
            doc.text(`Butaca: ${String.fromCharCode('A'.charCodeAt(0) + entrada.butaca.fila)
                + entrada.butaca.columna}`, 20, 110);
            doc.text(`Fecha y hora del pago: ${(new Date(entrada.tiempoRegistro)).toLocaleString()}`, 20, 140);

            doc.text(`Precio final: ${entrada.costoFinal}`, 20, 150);
        }

        for (let i = 0; i < entradas.length; i++) {
            if (i !== 0) doc.addPage();

            const entrada = entradas[i];
            const canvasEl = qrRefs[i]?.current; // QRCodeCanvas renderiza canvas, ref apunta directo al canvas

            if (canvasEl) {
                const imgData = canvasEl.toDataURL("image/png");
                doc.addImage(imgData, "PNG", 110, 20, 60, 60);
            } else {
                console.warn(`No se encontró canvas para la entrada ${i}`);
            }

            escribirInfoComun(entradasCompletas);
            escribirEntrada(entrada, i);
        }


        doc.save("entrada.pdf");

        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }

    static async buscarEntrada() {
        return await axios.get(`${url}/entrada?token=${token}`)
    }

}

export default Entrada;