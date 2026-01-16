import React from "react";
import { Outlet } from "react-router";

import Header from '@/components/headert/Header.jsx'

function Venta() {
    return (
        <>
            <Header></Header>
            <div className="contenedor container-fluid px-0">
                <Outlet />
            </div>
            {/*<Footer></Footer>*/}
        </>
    );
}
export default Venta;
