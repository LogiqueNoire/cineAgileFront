import React from "react";
import { Outlet } from "react-router";

import Header from '@/components/Header/Header.jsx'
import { ToastContextProvider } from "./context/ToastContextProvider";

function App() {
    return (
        <ToastContextProvider>
            <Header></Header>
            <div className="contenedor container-fluid">
                <Outlet />
            </div>
            {/*<Footer></Footer>*/}
        </ToastContextProvider>
    );
}
export default App;
