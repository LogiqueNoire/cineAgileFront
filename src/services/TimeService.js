import { backend_url } from "@/configuracion/backend";
import axios from "axios";

class TimeService {
    static async obtenerFecha() {
        try {
            const response = await axios.get(`${backend_url}/api/tiempo/v1`);
            return new Date(response.data);

        } catch (err) {
            console.error("Error al obtener la fecha:", err);
        }
    };
}

export default TimeService;