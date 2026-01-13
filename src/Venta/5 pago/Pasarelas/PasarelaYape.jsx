import { useState, useEffect, useRef, useContext } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import "../pago.css"
import { env, publicKeyMercadoPago } from "@/configuracion/backend";
import { VentaContext } from "../../3 componentesVenta/VentaContextProvider";
import PagoService from "@/services/PagoService";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "@/context/ToastContextProvider";

const PasarelaYape = ({ generarBodyRequest }) => {
    const { showToast } = useContext(ToastContext)
    const contexto = useContext(VentaContext)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [mp, setMp] = useState(null);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [email, setEmail] = useState("")
    const inputsRef = useRef([])
    const [visible, setVisible] = useState(contexto.totalContext.total != 0)
    const navigate = useNavigate()

    useEffect(() => {
        const initMercadoPago = async () => {
            await loadMercadoPago();
            const instance = new globalThis.MercadoPago(publicKeyMercadoPago, { locale: "es-PE", });
            setMp(instance);
        };

        initMercadoPago();
    }, []);

    const handleYape = async (e) => {
        e.preventDefault();
        if (!mp) return;
        if (otp.some((e) => !e || e === "")) {
            showToast({ tipo: 'toast-danger', titulo: 'Código de aprobación incompleto', mensaje: '' });
            return
        }

        try {
            contexto.general.setSubmitting(true)
            const otpConcat = `${otp[0]}${otp[1]}${otp[2]}${otp[3]}${otp[4]}${otp[5]}`
            env === "dev" && console.log(otpConcat)
            const yapeToken = await mp.yape({ otp: otpConcat, phoneNumber }).create();
            env === "dev" && console.log(yapeToken)
            const bodyEntradas = generarBodyRequest()
            const bodyPago = {
                token: yapeToken.id,
                email: email,
                transaction_amount: Number(contexto.totalContext.total.toFixed(2)),
                payment_method_id: "yape",
            }
            env === "dev" && console.log(bodyPago)
            const data = await PagoService.procesarPago(bodyPago, bodyEntradas)
            env === "dev" && console.log(data)
            if (data.status === "Pago aprobado" && data.statusDetail === "Pago recibido") {
                showToast({ tipo: 'toast-info', titulo: 'Pago exitoso', mensaje: '' });
                setTimeout(() => {
                    contexto.general.setSubmitting(false)
                    setVisible(false);
                    navigate("/entradas", {
                        state: { entradas: data.resultadoRegistroEntradas.entradasCompradasDTO }
                    });
                }, 3000);
            } else {
                showToast({ tipo: 'toast-danger', titulo: 'Error en el pago', mensaje: data.statusDetail });
            }
        } catch (err) {
            console.error("Error generando token Yape:", err);
            showToast({ tipo: 'toast-danger', titulo: 'Error en el pago', mensaje: `Código de error: ${err.status}` });
        } finally {
            contexto.general.setSubmitting(false)
        }
    };

    return (
        visible && <div className="d-flex flex-column gap-3 p-3">
            <h3 className="ancizar-sans-regular fs-4">Pago con Yape</h3>
            <div className="d-flex flex-column gap-2">
                <label htmlFor="payerPhone">Número de teléfono</label>
                <input type="tel" inputMode="numeric" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-secondary-subtle text-center rounded ancizar-sans-regular fs-4" style={{ borderStyle: "solid" }} />
            </div>
            <div className="d-flex flex-column gap-1">
                <span>Código de aprobación</span>
                <div className="d-flex flex-row gap-2 justify-content-center">
                    {otp.map((d, i) => (
                        <input key={`D${i}`} type="text" inputMode="numeric" ref={(d) => (inputsRef.current[i] = d)}
                            className="border-secondary-subtle text-center rounded ancizar-sans-regular fs-4"
                            style={{ width: "35px", height: "50px", borderStyle: "solid" }}
                            value={d} onChange={(e) => {
                                if (e.target.value.length > 1) {
                                    const lista = e.target.value.replaceAll(/\D/g, "").slice(0, 6).split("")
                                    const newOtp = [lista[0] || "", lista[2] || "", lista[2] || "",
                                    lista[3] || "", lista[4] || "", lista[5] || ""]
                                    setOtp(newOtp)
                                } else {
                                    if (!/^\d?$/.test(e.target.value)) return;
                                    const newOtp = [...otp]; newOtp[i] = e.target.value;
                                    setOtp(newOtp);
                                    (e.target.value && i < 5) && inputsRef.current[i + 1].focus();
                                }
                            }}
                            onKeyDown={(e) => { (e.key === "Backspace" && !otp[i] && i > 0) && inputsRef.current[i - 1]?.focus() }}
                        />
                    ))}
                </div>
                <span style={{fontSize:"13px"}}>Encuéntralo en tu app de Yape</span>
            </div>

            <div className="border-start border-4 border-primary px-3 py-2 bg-light">
                <span style={{fontSize:"13px"}}>Verifica en Yape que la opción compras por internet esté activada.</span>
            </div>
            <div className="d-flex flex-column gap-2">
                <label htmlFor="email">Email para envío de constancia</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="border-secondary-subtle text-center rounded ancizar-sans-regular fs-5" style={{ borderStyle: "solid" }} />
            </div>
            <div>
                <button className="btn-primary btn-primary-gradient w-100" onClick={(e) => handleYape(e)}>Pagar con Yape</button>
            </div>
        </div>
    );
};

export default PasarelaYape;