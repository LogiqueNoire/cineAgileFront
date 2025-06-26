import axios from 'axios'
import { url } from '../configuracion/backend'
import jsPDF from 'jspdf';
import imagenMarco from '../assets/marcoPNG.png'
import QRCode from 'qrcode'
const urlFront = import.meta.env.VITE_FRONT_URL

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/entrada`, datos);
        console.log("resultado entrada js", resultado)
        return resultado;
    }

    static async generarPdf(entradasCompletas, tokens) {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "Bold");

        const entradas = entradasCompletas.entradas

        const escribirInfoComun = (data) => {
            doc.setFontSize('20')
            doc.text(`Cine Agile`, 60, 70);
            doc.text(`Datos elegidos`, 80, 120);
            doc.setFontSize('16')
            doc.text(`Película: ${data.tituloPelicula}`, 40, 130);
            doc.text(`Clasificación: ${data.clasificacion}`, 40, 140);
            doc.text(`Fecha y hora de la función: ${(new Date(data.fechaHoraInicio)).toLocaleString()}`, 40, 150);
            doc.text(`Sede: ${data.nombreSede}`, 40, 160);
            doc.text(`Sala: ${data.sala}`, 40, 170);
        }
        const escribirEntrada = (entrada, index) => {
            doc.setFontSize('20')
            doc.text(`Entrada`, 64, 80);
            doc.setFontSize('16')
            doc.text(`Butaca: ${String.fromCharCode('A'.charCodeAt(0) + entrada.butaca.fila)
                + Number(entrada.butaca.columna+1)}`, 40, 180);
            doc.text(`Tipo de entrada: ${entrada.persona}`, 40, 190);
            doc.setFontSize('20')
            doc.text(`Datos de pago`, 80, 210);
            doc.setFontSize('16')
            doc.text(`Fecha y hora del pago: ${(new Date(entrada.tiempoRegistro)).toLocaleString()}`, 40, 220);
            doc.text(`Precio final: S/ ${entrada.costoFinal.toFixed(2)}`, 40, 230);
        }

        const getImageDataURL = (src) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext("2d").drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                };
                img.onerror = reject;
                img.src = src;
            });

        const marcoImg = await getImageDataURL(imagenMarco);

        for (let i = 0; i < entradas.length; i++) {
            if (i !== 0) doc.addPage();

            const entrada = entradas[i];

            const qrDataUrl = await QRCode.toDataURL(`${urlFront}/entrada/${encodeURIComponent(tokens[i])}`);


            doc.addImage(qrDataUrl, "PNG", 110, 40, 60, 60);


            doc.addImage(marcoImg, "PNG", 20, 20, 170, 260);
            escribirInfoComun(entradasCompletas);
            escribirEntrada(entrada, i);
        }


        doc.save("entrada.pdf");

        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }



    static async buscarEntrada(token) {
        return await axios.get(`${url}/entrada?token=${encodeURIComponent(token)}`)
    }

    static async bloquearEntradas(info) {
        const resultado = await axios.post(`${url}/entrada/lock`, info);
        return resultado;
    }

    static async desbloquearEntradas(info) {
        const resultado = await axios.post(`${url}/entrada/unlock`, info);
        return resultado;
    }

}

export default Entrada;