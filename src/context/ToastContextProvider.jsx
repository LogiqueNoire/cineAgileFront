import { useState, createContext, useCallback } from "react"
import Toast from "@/components/toastt/Toast"

const ToastContext = createContext({})

const ToastContextProvider = ({ children }) => {
    const [toast, setToast] = useState({ tipo: '', titulo: '', mensaje: '', visible: '' })

    const showToast = useCallback(({tipo, titulo, mensaje, duration = 3000}) => {
        setToast({ tipo, titulo, mensaje, visible: true })
        setTimeout(() => {
            setToast(t => ({ ...t, visible: false }));
        }, duration);
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast {...toast}></Toast>
        </ToastContext.Provider>
    )
}

export { ToastContextProvider, ToastContext }