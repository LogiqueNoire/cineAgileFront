import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header.jsx'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from '@/services/Auth.js';
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
                        <h5 className='ancizar-sans-regular mb-0'>Usuario: { username }</h5>
                        <button className='btn btn-danger btn-danger-gradient fs-5' onClick={onCerrarSesion}>Cerrar sesión</button>
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