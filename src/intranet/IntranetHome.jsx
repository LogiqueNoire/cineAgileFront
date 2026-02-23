import { auditIcon, funcionesIcon, genresIcon, passwordIcon, peliculaIcon, sedeIcon, statisticsIcon, usuariosInternosIcon } from "@/assets/modulos"
import { useNavigate, useOutletContext } from 'react-router-dom';

const IntranetHome = () => {
    const { user } = useOutletContext();

    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center">
            <div className="container-lg px-4 my-5">
                <div className="d-flex flex-column gap-3">
                    <h1 className="display-5 text-center ancizar-sans-regular mb-0">Bienvenido a la vista interna de cineagile</h1>
                    <h2 className="ancizar-sans-regular mb-0 text-center border-2 border-top pt-3">Operaciones</h2>
                    <div className="d-flex justify-content-center gap-4 flex-wrap pb-3">
                        {(user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SEDE_ADMIN") || user?.role.includes("ROLE_PLANIFICADOR")) &&
                            <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                                onClick={() => navigate(`/intranet/peliculas`)}>
                                <img src={peliculaIcon} alt="" style={{ width: '90px' }} />
                                <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Películas</h2>
                            </button>}

                        {(user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SEDE_ADMIN") || user?.role.includes("ROLE_PLANIFICADOR")) &&
                            <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-1"
                                onClick={() => navigate(`/intranet/sedesysalas`)}>
                                <img src={sedeIcon} alt="" style={{ width: '85px', height: "auto" }} />
                                <h2 className="ancizar-sans-regular mb-0 fs-4 text-center" style={{ lineHeight: "0.9" }}>Sedes, salas<br></br>y butacas</h2>
                            </button>}

                        <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                            onClick={() => navigate(`/intranet/funciones`)}>
                            <img src={funcionesIcon} alt="" style={{ width: '95px' }} />
                            <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Funciones</h2>
                        </button>

                        {user?.role.includes("ROLE_ADMIN") &&
                            <button className="btn btn-primary btn-primary-gradient px-4 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                                onClick={() => navigate(`/intranet/generos`)}>
                                <img src={genresIcon} alt="" style={{ width: '90px' }} />
                                <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Géneros</h2>
                            </button>}
                    </div>
                    {(user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SEDE_ADMIN")) &&
                        <h2 className="ancizar-sans-regular mb-0 text-center border-2 border-top pt-3">Insights</h2>}
                    <div className="d-flex justify-content-center gap-4 flex-wrap pb-3">

                        {(user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SEDE_ADMIN")) &&
                            <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                                onClick={() => navigate(`/intranet/analiticas`)}>
                                <img src={statisticsIcon} alt="" style={{ height: '90px' }} />
                                <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Analíticas</h2>
                            </button>}

                        {user?.role.includes("ROLE_ADMIN") &&
                            <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                                onClick={() => navigate(`/intranet/usuarios`)}>
                                <img src={usuariosInternosIcon} alt="" style={{ width: '90px' }} />
                                <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Usuarios</h2>
                            </button>}

                        {user?.role.includes("ROLE_ADMIN") &&
                            <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2"
                                onClick={() => navigate(`/intranet/auditoria`)}>
                                <img src={auditIcon} alt="" style={{ height: '90px' }} />
                                <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Auditorías</h2>
                            </button>}

                    </div>
                    <h2 className="ancizar-sans-regular mb-0 text-center border-2 border-top pt-3">Personal</h2>
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                        <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-1"
                            onClick={() => navigate(`/intranet/ajustes`)}>
                            <img src={passwordIcon} alt="" style={{ height: '90px' }} />
                            <h2 className="ancizar-sans-regular mb-0" style={{ lineHeight: "0.8" }}>Cuenta</h2>
                        </button>
                    </div>
                    {/* 
                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaOpcionesDeDesarrollador}>
                        <img src={desarrolladorIcono} alt="" style={{ height: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0">Opciones de<br />desarrollador</h2>
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
}
export default IntranetHome;