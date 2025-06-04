import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../0 componentesGenerales/Header.jsx'
import LoginForm from './LoginForm.jsx';
import { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from '../servicios/Auth.js';

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
    }, [ ])

    return (
        <>
            <Header>
                <h5>Usuario: { username }</h5>
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