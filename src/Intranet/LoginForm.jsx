import { useEffect, useState } from "react";
import Auth from "../servicios/Auth";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import BotonCarga from "../0 componentesGenerales/BotonCarga"

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState({ isError: false, details: null });

    const [ submitting, setSubmitting ] = useState(false);

    useEffect(() => {
        if (Cookies.get("auth-token")) {
            navigate("/intranet")
        }
    }, [])

    const tryLogin = (evt) => {
        evt.preventDefault();

        if (submitting) return;

        setSubmitting(true);
        setStatus({ isError: false, details: null });

        if (!Cookies.get("auth-token")) {
            Auth.login(username, password).then(res => {
                if (res.token) {
                    Cookies.set("auth-token", res.token, { expires: 30 * 24 * 60 * 60, path: "/" });
                    navigate("/intranet");
                }
            }).catch(err => {
                if (err.code == "ERR_NETWORK")
                    setStatus({ isError: true, details: "Conexión de red." });
                else
                    setStatus({ isError: true, details: err.response.data.error });
            }).finally(_ => {
                setSubmitting(false);
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
            <form className='d-flex flex-column align-items-center gap-3 m-4 border p-3 rounded' style={{ width: "max-content" }}
                action="/intranet" method="post" onSubmit={tryLogin}>
                { status.isError &&
                    <div className="bg-danger bg-opacity-10 border border-1 border-danger w-100 p-2">
                        <div className="text-center text-danger">{ status.details }</div>
                    </div>
                }
                <h2>Cine Agile</h2>
                <div className='d-flex flex-column'>
                    <label htmlFor="username">Usuario</label>
                    <input className='form-control' type="text" name="username" id="username" onChange={onUsernameChange} required />
                </div>

                <div className='d-flex flex-column'>
                    <label htmlFor="password">Contraseña</label>
                    <input className='form-control' type="password" name="password" id="password" onChange={onPasswordChange} required />
                </div>


                <BotonCarga submitting={submitting} type="submit" className='btn btn-primary'>
                    Enviar
                </BotonCarga>

            </form>
        </div>
    )
}

export default LoginForm;