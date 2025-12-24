import { useState } from "react";
import FormularioUsuario from "./FormularioUsuario";
import ListaUsuarios from "./ListaUsuarios";

const VentanaUsuario = () => {
    const [ actualizado, setActualizado ] = useState(true);

    const actualizar = () => {
        setActualizado(!actualizado);
    }

    return (
    <div className="container-fluid col-11 p-2">
        <FormularioUsuario actualizar={actualizar} />
        <ListaUsuarios actualizado={actualizado} />
    </div>
    )
};

export default VentanaUsuario;