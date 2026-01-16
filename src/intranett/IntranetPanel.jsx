import { auditIcon, funcionesIcon, genresIcon, passwordIcon, peliculaIcon, sedeIcon, statisticsIcon, usuariosInternosIcon } from "@/assets/modulos"
import { useNavigate } from 'react-router-dom';

const IntranetPanel = () => {
    const navigate = useNavigate();

    const moverseHaciaVentanaPeliculas = () => { navigate(`/intranet/peliculas`) }

    const moverseHaciaVentanaSedesYSalas = () => { navigate(`/intranet/sedesysalas`) }

    const moverseHaciaFunciones = () => { navigate(`/intranet/funciones`) }

    const moverseHaciaUsuarios = () => { navigate(`/intranet/usuarios`) }

    const moverseHaciaAjustesGenerales = () => { navigate(`/intranet/ajustes`) }

    const moverseHaciaGraficos = () => { navigate(`/intranet/analiticas`) }

    const moverseHaciaGeneros = () => { navigate(`/intranet/generos`) }

    const moverseHaciaAuditoria = () => { navigate(`/intranet/auditoria`) }

    return (
        <div className="d-flex justify-content-center">
            <div className="container-lg px-4 my-5">
                <div className="d-flex flex-column gap-3">
                <h1 className="display-5 text-center ancizar-sans-regular mb-0">Bienvenido a la vista interna de cineagile</h1>
                <h2 className="ancizar-sans-regular mb-0">Operaciones</h2>
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaVentanaPeliculas}>
                        <img src={peliculaIcon} alt="" style={{ width: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Películas</h2>
                    </button>

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-1" onClick={moverseHaciaVentanaSedesYSalas}>
                        <img src={sedeIcon} alt="" style={{ width: '85px', height: "auto" }} />
                        <h2 className="ancizar-sans-regular mb-0 fs-4 text-center"style={{lineHeight: "0.9"}}>Sedes, salas<br></br>y butacas</h2>
                    </button>

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaFunciones}>
                        <img src={funcionesIcon} alt="" style={{ width: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Funciones</h2>
                    </button>

                    <button className="btn btn-primary btn-primary-gradient px-4 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaGeneros}>
                        <img src={genresIcon} alt="" style={{ width: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Géneros</h2>
                    </button>
                </div>
                <h2 className="ancizar-sans-regular mb-0">Insights</h2>
                <div className="d-flex justify-content-center gap-4 flex-wrap">

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaGraficos}>
                        <img src={statisticsIcon} alt="" style={{ height: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Analíticas</h2>
                    </button>

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaUsuarios}>
                        <img src={usuariosInternosIcon} alt="" style={{ width: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Usuarios</h2>
                    </button>

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-2" onClick={moverseHaciaAuditoria}>
                        <img src={auditIcon} alt="" style={{ height: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Auditorías</h2>
                    </button>

                </div>
                <h2 className="ancizar-sans-regular mb-0">Otros</h2>
                <div className="d-flex justify-content-center gap-4 flex-wrap">

                    <button className="btn btn-primary btn-primary-gradient px-3 d-flex flex-column align-items-center justify-content-center rounded-4 py-3 gap-1" onClick={moverseHaciaAjustesGenerales}>
                        <img src={passwordIcon} alt="" style={{ height: '90px' }} />
                        <h2 className="ancizar-sans-regular mb-0" style={{lineHeight: "0.8"}}>Cuenta</h2>
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
export default IntranetPanel;