import { useEffect, useState } from "react";
import Auth from "../servicios/Auth";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ status, setStatus ] = useState("loading");
    
    useEffect(() => {
        if (Cookies.get("auth-token")) {
            navigate("/intranet")
        }
    }, [ ])

    const tryLogin = (evt) => {
        evt.preventDefault();
        
        if (!Cookies.get("auth-token")) {
            Auth.login(username, password).then(res => {
                if (res.token) {
                    Cookies.set("auth-token", res.token, { expires: 30 * 24 * 60 * 60, path: "/" });
                    setStatus("ok");
                    navigate("/intranet");
                }
            }).catch(_ => {
                setStatus("error");
            })
        }

        setStatus("loading");
    }

    const onUsernameChange = (evt) => {
        setUsername(evt.target.value);
    }
    
    const onPasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    return (
        <>
            <form action="/intranet" method="post" onSubmit={tryLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={onUsernameChange} required />
                </div>
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={onPasswordChange} required />
                </div>

                <button type="submit">Enviar</button>

            </form>
        </>
    )
}

export default LoginForm;