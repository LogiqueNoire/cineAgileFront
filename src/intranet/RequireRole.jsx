import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const RequireRole = ({ rolesPermitidos, children }) => {
    const { user } = useOutletContext();

    if (!user) return null; // o spinner

    const tieneRol = rolesPermitidos.some(r =>
        user.role.includes(r)   // ojo: es role, no roles
    );

    if (!tieneRol) {
        return <Navigate to="/intranet" replace />;
    }

    return React.cloneElement(children, {
        user: user
    });
};

export default RequireRole;
