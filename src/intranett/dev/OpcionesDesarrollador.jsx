import { useContext } from "react";
import axios from "axios";
import { env, backend_url } from "@/configuracion/backend";
import Cookies from "js-cookie";
import MuyPronto from "@/components/MuyPronto";
import truncateDBicon from "@/assets/modulos/truncateDB.svg"
import { dbIcon, developerIcon } from "@/assets/modulos";
import payPalIcon from "@/assets/pasarelas/paypal.svg"
import mercadoPagoIcon from "@/assets/pasarelas/mercado_pago.png"
import "./OpcionesDevPanel.css"
import { ToastContext } from "@/context/ToastContextProvider";

const OpcionesDesarrollador = () => {
    const { showToast } = useContext(ToastContext)

    const poblarBD = async () => {
        let response;
        try {
            response = await axios.post(`${backend_url}/api/intranet/v1/dev/poblarBD`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

        } catch (error) {
            console.log(error)
            showToast({ tipo: "toast-danger", title: 'Datos cargados', mensaje: '¡Ya puede empezar a usar el sistema!' })
        } finally {
            env === "dev" && console.log(response)
            showToast({ tipo: "toast-info", title: 'Base de datos reiniciada', mensaje: 'Se dejó el superusuario.' })
        }
    }

    const reiniciarBD = async () => {
        let response;
        try {
            response = await axios.post(`${backend_url}/api/intranet/v1/dev/reiniciarBD`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get("auth-token")}` }
            });

        } catch (error) {
            console.log(error)
            showToast({ title: "toast-danger", mensaje: 'INSERTS DE PRUEBA EJECUTADOS' })
        } finally {
            env === "dev" && console.log(response)
            showToast({ title: "toast-danger", mensaje: 'INSERTS DE PRUEBA EJECUTADOS' })
        }
    }

    return (
        <div className="container-fluid col-11 p-2 d-flex flex-column gap-4 align-items-center mt-4">
            <div className="d-flex justify-content-center align-items-center gap-2">
                <h2 className="fs-1 fw-bold ancizar-sans-regular mb-0">Funciones de desarrollador</h2>
                <img src={developerIcon} alt="" style={{ height: '90px', filter: 'invert(99%)' }} />
            </div>
            <div className="d-flex gap-4 opcionesDevPanel">
                <div className="d-flex flex-column gap-4">
                    <h2 className="ancizar-sans-regular text-start mb-0 w-100">Acciones peligrosas</h2>
                    <button className="btn btn-primary btn-primary-gradient d-flex gap-3 align-items-center justify-content-center" onClick={poblarBD} style={{ width: 'max-content' }}>
                        <h2 className="ancizar-sans-regular mb-0 fs-3">Poblar la BD con<br></br> datos de prueba</h2>
                        <img src={dbIcon} alt="" style={{ height: '50px' }} />
                    </button>
                    <button className="btn btn-danger btn-danger-gradient d-flex gap-3 align-items-center justify-content-center" onClick={reiniciarBD} style={{ width: 'max-content' }}>
                        <h2 className="ancizar-sans-regular mb-0">Reiniciar la BD</h2>
                        <img src={truncateDBicon} alt="" style={{ height: '50px' }} />
                    </button>

                </div>
                <div className="bg-secondary-subtle lineaVertical" style={{ width: "3px" }}></div>
                <div className="d-flex flex-column gap-4 align-items-center">
                    <h2 className="ancizar-sans-regular text-start mb-0 w-100">Credenciales de prueba</h2>
                    <div className="border-secondary-subtle border border-3 rounded-4 p-4 w-100">
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-3 text-secondary">Tarjeta 1</div>
                            <div className="ancizar-sans-regular fs-4">
                                <img src={payPalIcon} alt="paypal icon" style={{ height: "30px" }} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Type</div>
                            <div className="ancizar-sans-regular fs-4">VISA</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Card Number</div>
                            <div className="ancizar-sans-regular fs-4">4461 7134 3735 9120</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Expiry</div>
                            <div className="ancizar-sans-regular fs-4">03/2030</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">CVC Code</div>
                            <div className="ancizar-sans-regular fs-4">Any 3 digits</div>
                        </div>
                    </div>

                    <div className="border-secondary-subtle border border-3 rounded-4 p-4 w-100">
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-3 text-secondary">Tarjeta 2</div>
                            <div className="ancizar-sans-regular fs-4">
                                <img src={mercadoPagoIcon} alt="mercado icon" style={{ height: "30px" }} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Type</div>
                            <div className="ancizar-sans-regular fs-4">Mastercard</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Card Number</div>
                            <div className="ancizar-sans-regular fs-4">5031 7557 3453 0604</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Expiry</div>
                            <div className="ancizar-sans-regular fs-4">11/2030</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">CVC Code</div>
                            <div className="ancizar-sans-regular fs-4">123</div>
                        </div>
                    </div>

                    <div className="border-secondary-subtle border border-3 rounded-4 p-4 w-100">
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-3 text-secondary">Tarjeta 3</div>
                            <div className="ancizar-sans-regular fs-4">
                                <img src={mercadoPagoIcon} alt="mercado icon" style={{ height: "30px" }} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Type</div>
                            <div className="ancizar-sans-regular fs-4">Visa</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Card Number</div>
                            <div className="ancizar-sans-regular fs-4">4009 1753 3280 6176</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Expiry</div>
                            <div className="ancizar-sans-regular fs-4">11/2030</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">CVC Code</div>
                            <div className="ancizar-sans-regular fs-4">123</div>
                        </div>
                    </div>

                    <div className="border-secondary-subtle border border-3 rounded-4 p-4 w-100">
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-3 text-secondary">Tarjeta 4</div>
                            <div className="ancizar-sans-regular fs-4">
                                <img src={mercadoPagoIcon} alt="mercado icon" style={{ height: "30px" }} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Type</div>
                            <div className="ancizar-sans-regular fs-4">American Express</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Card Number</div>
                            <div className="ancizar-sans-regular fs-4">3711 803032 57522</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">Expiry</div>
                            <div className="ancizar-sans-regular fs-4">11/2030</div>
                        </div>
                        <div className="d-flex justify-content-between gap-3">
                            <div className="ancizar-sans-regular fs-4">CVC Code</div>
                            <div className="ancizar-sans-regular fs-4">1234</div>
                        </div>
                    </div>
                </div>

            </div>
            <MuyPronto></MuyPronto>
        </div >
    )
};

export default OpcionesDesarrollador;