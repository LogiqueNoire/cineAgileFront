import axios from 'axios'
import { url } from '../configuracion/backend'
import jsPDF from 'jspdf';
import imagenMarco from '../assets/marcoEntrada4.png'
import fondoEntrada from '../assets/fondoEntrada.jpg'
import QRCode from 'qrcode'
const urlFront = import.meta.env.VITE_FRONT_URL

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/api/v1/entradas`, datos);
        console.log("resultado entrada js", resultado)
        return resultado;
    }

    static async generarPdf(entradasCompletas, tokens, setDownloading) {
        const doc = new jsPDF({
            orientation: "l",
            unit: "mm",
            format: "a5", 
            compress: true
        });
        doc.setFont("Helvetica", "Bold");

        const entradas = entradasCompletas.entradas


        const escribirInfoComun = (data) => {
            doc.setFontSize('32')
            doc.setTextColor('#01217B')
            doc.text(`cineagile`, 25, 48);
            doc.setTextColor('#01217B')
            doc.setFontSize('20')
            doc.text(`Datos de la función`, 105, 30);
            //doc.setTextColor('#000000ff')
            doc.setFontSize('15.5')
            doc.text(`Película: ${data.tituloPelicula}`, 85, 39);
            doc.text(`Clasificación: ${data.clasificacion}`, 85, 48);
            doc.text(`Fecha y hora: ${(new Date(data.fechaHoraInicio)).toLocaleString()}`, 85, 57);
            doc.text(`Sede: ${data.nombreSede}`, 85, 66);
            doc.text(`Sala: ${data.sala}`, 85, 75);
        }
        const escribirEntrada = (entrada, index) => {
            let tipoPersona = "";
            switch (entrada.persona) {
                case "general": tipoPersona = "General"; break;
                case "mayores": tipoPersona = "Mayor de 60"; break;
                case "niños": tipoPersona = "Niño"; break;
                case "conadis": tipoPersona = "Conadis"; break;
            }

            doc.setFontSize('32')
            doc.setTextColor('#01217B')
            doc.text(`Entrada`, 28, 62);
            //doc.setTextColor('#000000ff')
            doc.setFontSize('15.5')
            doc.text(`Butaca: ${String.fromCharCode('A'.charCodeAt(0) + entrada.butaca.fila)
            + Number(entrada.butaca.columna + 1)}`, 85, 84);
            doc.text(`Tipo de entrada: ${tipoPersona}`, 85, 93);
            doc.setFontSize('20')
            doc.setTextColor('#01217B')
            doc.text(`Datos del pago`, 113, 105);
            //doc.setTextColor('#000000ff')
            doc.setFontSize('15.5')
            doc.text(`Fecha y hora: ${(new Date(entrada.tiempoRegistro)).toLocaleString()}`,85, 114);
            doc.text(`Precio final: S/ ${entrada.costoFinal.toFixed(2)}`, 85, 123);
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

        function comprimirImagen(imgSrc, maxWidth, maxHeight, calidad = 0.7) {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let { width, height } = img;

                    // Redimensionamos si es necesario
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convertimos a JPEG comprimido
                    resolve(canvas.toDataURL("image/jpeg", calidad));
                };
            });
        }


        const marcoImg = await getImageDataURL(imagenMarco);
        const fondo = await getImageDataURL(fondoEntrada);

        const fondoOptimizado = await comprimirImagen(fondo, 2480, 4000, 0.92);

        for (let i = 0; i < entradas.length; i++) {
            if (i !== 0) doc.addPage();

            const entrada = entradas[i];

            const qrDataUrl = await QRCode.toDataURL(`${urlFront}/entrada/${encodeURIComponent(tokens[i])}`);

            doc.addImage(fondoOptimizado, "WEBP", 0, 0, 220, 360);

            doc.addImage(marcoImg, "SVG", 10, 10, 190, 127.5);
            doc.addImage(qrDataUrl, "PNG", 23, 67, 52.5, 52.5);

            escribirInfoComun(entradasCompletas);
            escribirEntrada(entrada, i);
        }


        doc.save("entrada.pdf");

        console.time("PDF Blob");
        const blob = doc.output("blob");
        console.timeEnd("PDF Blob");
        console.time("create Blob");
        const url = URL.createObjectURL(blob);
        console.timeEnd("create Blob");
        console.time("open");
        window.open(url, "_blank");
        console.timeEnd("open");
        setDownloading(false)
    }



    static async buscarEntrada(token) {
        return await axios.get(`${url}/api/v1/entradas?token=${encodeURIComponent(token)}`)
    }

    static async bloquearEntradas(info) {
        const resultado = await axios.post(`${url}/api/v1/entradas/lock`, info);
        return resultado;
    }

    static async desbloquearEntradas(info) {
        const resultado = await axios.post(`${url}/api/v1/entradas/unlock`, info);
        return resultado;
    }

}

export default Entrada;