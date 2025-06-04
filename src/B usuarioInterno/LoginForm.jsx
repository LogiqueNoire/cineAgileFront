import { useEffect, useState } from "react";
import Auth from "../servicios/Auth";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import Loading from "../0 componentesGenerales/Loading";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (Cookies.get("auth-token")) {
            navigate("/intranet")
        }
    }, [])

    const tryLogin = (evt) => {
        evt.preventDefault();
        setStatus("loading");
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

 
    }

    const onUsernameChange = (evt) => {
        setUsername(evt.target.value);
    }

    const onPasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    return (
        <div className="d-flex justify-content-center">
            {status === "loading" ? <Loading></Loading> :
            <form className='d-flex flex-column align-items-center gap-3 m-4 border p-3 rounded' style={{ width: "max-content" }}
                action="/intranet" method="post" onSubmit={tryLogin}>
                <h2>Cine Agile</h2>
                <div className='d-flex flex-column align-items-center'>
                    <label htmlFor="username">Username</label>
                    <input className='form-control' type="text" name="username" id="username" onChange={onUsernameChange} required />
                </div>

                <div className='d-flex flex-column align-items-center'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name="password" id="password" onChange={onPasswordChange} required />
                </div>

                <button className='btn btn-primary' type="submit">Enviar</button>

            </form>}
        </div>
    )
}

export default LoginForm;