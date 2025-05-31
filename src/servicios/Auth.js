import axios from "axios";
import { url } from "../configuracion/backend";
import Cookies from "js-cookie";

class Auth {
    
    static async login(username, password) {
        const res = await axios.post(`${url}/auth/login`, { username, password });
        return res.data;
    }

    static async getUser() {
        const token = Cookies.get("auth-token");

        if (!token)
            throw new Error("Token no encontrado");
        
        const res = await axios.get(`${url}/intranet/user`, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    }
}

export default Auth;