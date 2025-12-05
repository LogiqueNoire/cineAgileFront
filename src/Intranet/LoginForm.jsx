import { useEffect, useState } from "react";
import Auth from "../servicios/Auth";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import BotonCarga from "../0 componentesGenerales/BotonCarga"
import videoFondo from "../assets/fondoLogin.mp4"
import imagenFondo from "../assets/fondoLogin.png"
import "./Intranet.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState({ isError: false, details: null });

    const [submitting, setSubmitting] = useState(false);

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
                //console.log("Intentando login con", err)
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
        <div className="d-flex justify-content-center align-items-center bg-dark" style={{ marginTop: '25vh', marginBottom: '25vh' }}>
            <img src={imagenFondo} alt="" style={{ position: 'fixed', zIndex: '-30' }}/>
            <video src={videoFondo} loop autoPlay muted playsInline style={{ position: 'fixed', zIndex: '-20' }}></video>
            <form className='m-4 mt-0 border border-1 p-5 rounded rounded-4'
                style={{
                    width: "max-content", height: 'min-content',
                    backdropFilter: 'blur(10px)', boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                }}
                action="/intranet" method="post" onSubmit={tryLogin}>
                <div className="d-flex flex-column justify-self-center align-items-center gap-3 m-2">
                    <span className="saira-semibold text-white" style={{ fontSize: '40px'}}>cineagile</span>
                    <div className='d-flex flex-column gap-4'>
                        <input className='form-control text-white bg-transparent fw-bold placeholder-white py-2 px-3 rounded rounded-5' type="text" name="username" id="username"
                            placeholder="Usuario" onChange={onUsernameChange} required />
                        <input className='form-control text-white bg-transparent fw-bold placeholder-white py-2 px-3 rounded rounded-5' type="password" name="password" id="password"
                            placeholder="Contraseña" onChange={onPasswordChange} required />
                        <BotonCarga submitting={submitting} type="submit" className='btn btn-primary fw-bold rounded rounded-5'
                            style={{ backgroundColor: '#FFFFFF', color: '#2F0022' }}>
                            Enviar
                        </BotonCarga>
                    </div>
                </div>
                {status.isError &&
                    <div className="bg-danger bg-opacity-50 border border-1 border-danger w-100 p-2 mt-3 rounded rounded-5">
                        <div className="text-center fw-bold text-white">{status.details != "" ? status.details : "Servicio no disponible"}</div>
                    </div>
                }
            </form>

        </div>
    )
}

export default LoginForm;