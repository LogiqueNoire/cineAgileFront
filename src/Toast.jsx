import './inicio.css'

const Toast = ({tipo, titulo, mensaje, visible}) => {

    return (
            visible && (
                <div className={`${tipo} mx-4`}>
                    <div>{titulo}</div>
                    <div>{mensaje}</div>
                </div>
            )
        
    );
}

export default Toast