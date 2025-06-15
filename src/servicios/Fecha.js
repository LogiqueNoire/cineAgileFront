import { format } from "date-fns"

class Fecha {
    // Transforma una fecha local a UTC 
    static tiempoLocalDate_A_UTCString(date) {
        return date.toISOString();
    }
    
    // Transforma una fecha local a UTC 
    static tiempoLocalString_A_UTCString(str) {
        return (new Date(str)).toISOString();
    }

    // Transforma la fecha (traída del backend) a la correcta para la ubicación del cliente
    static tiempoStringUTC_A_TiempoLocalString(str) {
        return format((new Date(str + 'Z')), "yyyy-mm-dd.HH:mm:ss").replace(".", "T");
    }
}

export default Fecha;