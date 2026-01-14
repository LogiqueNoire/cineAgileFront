import React from "react";
import { Outlet } from "react-router";

import Header from '@/components/Header/Header.jsx'

function App() {
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
export default App;
