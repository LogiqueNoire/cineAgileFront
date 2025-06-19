import axios from 'axios'
import { url } from '../configuracion/backend'
import jsPDF from 'jspdf';

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/entrada`, datos);
        console.log("resultado entrada js", resultado)
        return resultado;
    }

    static async generarPdf(entradasCompletas) {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "Bold");

        const entradas = entradasCompletas.entradas

        const escribirInfoComun = (data) => {
            doc.text(`Cine Agile`, 40, 20);
            doc.text(`Pelicula: ${data.tituloPelicula}`, 20, 50);
            doc.text(`Fecha y hora de inicio de la función: ${(new Date(data.fechaHoraInicio)).toLocaleString()}`, 20, 60);
            doc.text(`Sede: ${data.nombreSede}`, 20, 70);
            doc.text(`Sala: ${data.sala}`, 20, 80);
        }
        const escribirEntrada = (entrada) => {
            doc.text(`Entrada ${entrada.id.idFuncion + entrada.butaca.id}`, 40, 30);
            doc.text(`Butaca: ${String.fromCharCode('A'.charCodeAt(0) + entrada.butaca.fila)
                +entrada.butaca.columna}`, 20, 100);
            doc.text(`Precio final: ${entrada.costoFinal}`, 20, 110);
        }
        for (let e of entradas){
            console.log("E", e)
            escribirInfoComun(entradasCompletas);
            escribirEntrada(e);

            doc.addPage();
        }
        
        
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }

    static async buscarEntrada(){
        return await axios.get(`${url}/entrada?token=${token}`)
    }

}

export default Entrada;