import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../0 componentesGenerales/Header.jsx'
import LoginForm from './LoginForm.jsx';
import { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from '../servicios/Auth.js';
import './Intranet.css'

const Intranet = () => {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState(null);

    useEffect(() => {
        if (Cookies.get("auth-token")) {
            Auth.getUser().then((u) => {
                setUsername(u);
            }).catch(err => {
                console.log(err);
                Cookies.remove("auth-token");
                navigate("/intranet/login");
            });

        }
        else {
            navigate("/intranet/login");
        }
    }, [ navigate ])

    const onCerrarSesion = () => {
        Cookies.remove("auth-token");
        setUsername(null);
        navigate("/intranet/login")
    }

    return (
        <>
            <Header>
                {
                    username &&
                    <div className='d-flex align-items-center gap-5 sesion-group'>
                        <h5>Usuario: { username }</h5>
                        <button className='btn btn-danger' onClick={onCerrarSesion}>Cerrar sesión</button>
                    </div>
                }
                
            </Header>

            {
                <div className="contenedor container-fluid">
                    <Outlet context={{ setUsername }} />
                </div>
            }

        </>
    );
}

export default Intranet;