import pelicula from '@/assets/modulos/peliculas.svg'
import sede from '@/assets/modulos/sedeIcon.svg'
import funciones from '@/assets/modulos/recorder.svg'
import genresIcon from '@/assets/modulos/genresIcon.svg'
import ajustes from '@/assets/modulos/ajustes.svg'
import passwordIcon from '@/assets/modulos/password.svg'
import usuariosInternos from '@/assets/modulos/modulo_usuario_icono.svg'
import statisticsIcon from '@/assets/modulos/statisticsIcon.svg'
import auditarIcono from '@/assets/modulos/audit.svg'
import desarrolladorIcono from '@/assets/modulos/developer.svg'
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

    const moverseHaciaOpcionesDeDesarrollador = () => { navigate(`/intranet/desarrollador`) }

    return (
        <div className="m-3 mt-4">
            <div className="row">
                <h1 className="display-5 text-center"><strong>Bienvenido a la vista interna de cineagile</strong></h1>
                <div className="d-flex p-3 justify-content-center gap-4 flex-wrap">


                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaVentanaPeliculas}>
                        <img src={pelicula} alt="" style={{ width: '90px' }} />
                        <h2 className="">Películas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaVentanaSedesYSalas}>
                        <img src={sede} alt="" style={{ width: '90px', height: "auto" }} />
                        <h2 className="text-start">Sedes, salas<br></br>y butacas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaFunciones}>
                        <img src={funciones} alt="" style={{ width: '90px' }} />
                        <h2 className="">Funciones</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaGeneros}>
                        <img src={genresIcon} alt="" style={{ width: '80px' }} />
                        <h2 className="">Géneros</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaGraficos}>
                        <img src={statisticsIcon} alt="" style={{ height: '85px' }} />
                        <h2 className="">Analíticas</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaUsuarios}>
                        <img src={usuariosInternos} alt="" style={{ width: '90px' }} />
                        <h2 className="">Usuarios</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaAuditoria}>
                        <img src={auditarIcono} alt="" style={{ height: '85px' }} />
                        <h2 className="">Auditorías</h2>
                    </button>

                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaAjustesGenerales}>
                        <img src={passwordIcon} alt="" style={{ height: '90px' }} />
                        <h2 className="">Ajustes<br />de cuenta</h2>
                    </button>
                    {/* 
                    <button className="btn btn-primary d-flex gap-3 align-items-center justify-content-center" onClick={moverseHaciaOpcionesDeDesarrollador}>
                        <img src={desarrolladorIcono} alt="" style={{ height: '90px' }} />
                        <h2 className="">Opciones de<br />desarrollador</h2>
                    </button>
                    */}
                </div>
            </div>
        </div>
    );
}
export default IntranetPanel;