import axios from 'axios'
import { url } from '../configuracion/backend'

class Entrada {

    static async comprarEntrada(datos) {
        const resultado = await axios.post(`${url}/entrada`, datos);
        return resultado;
    }

    static async generarPdf(prestamo) {
        const doc = new jsPDF();
        doc.setFont("Helvetica", "Bold");

        const escribirEncabezado = (data) => {
            doc.text(`Cine Agile entrada id`, 80, 20);
            doc.text(`Tipo documento: ${data.cliente.tipoDocumento}`, 20, 30);
            doc.text(`Número de documento: ${data.cliente.nroDocumento}`, 90, 30);
            doc.text(`Cliente: ${data.cliente.nombre}`, 20, 40);
            doc.text(`Plazo: ${data.meses} mes(es)`, 20, 50);
            doc.text(`Monto: S/${data.monto}`, 80, 50);
            doc.text(`TEA: ${10}%`, 150, 50);
            doc.text(`Fecha: ${format(data.fecha, "dd/MM/yyyy")}`, 20, 60);
            doc.text(`Nro cuota`, 20, 70);
            doc.text(`Fecha de vencimiento`, 60, 70);
            doc.text(`Cuota`, 130, 70);
        }

        escribirEncabezado(prestamo);

        const fecha = new Date(prestamo.fecha);
        let j = 0;
        let suma = 0;

        for (let i = 0; i < prestamo.meses; i++) {
            const nuevaFecha = new Date(fecha)
            fecha.setMonth(nuevaFecha.getMonth() + 1);
            doc.text(`${i + 1}`, 20, 80 + (j * 10));
            doc.text(`${format(fecha, `yyyy-MM-dd`).replace('.', 'T')}`, 60, 80 + (j * 10));
            doc.text(`S/ ${Cuota.obtenerCuota(prestamo.monto, prestamo.meses).toFixed(2)}`, 130, 80 + (j * 10));
            suma = suma + parseFloat(Cuota.obtenerCuota(prestamo.monto, prestamo.meses));
            j++;

            if (j >= 21 && j % 21 == 0) {
                j = 0;
                doc.addPage();
                escribirEncabezado(prestamo);
            }
        }
        doc.text(`Total a pagar:`, 80, 80 + (j * 10));
        doc.text(`S/ ${suma.toFixed(2)}`, 130, 80 + (j * 10));
        
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    }

}

export default Entrada;