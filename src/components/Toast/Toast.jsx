import './Toast.css'

const Toast = ({ tipo, titulo, mensaje, visible }) => {

    return (
        visible && (
            <div className={`${tipo} mx-4 ancizar-sans-regular`}>
                <div className='fs-5'>{titulo}</div>
                <div className='fs-6'>{mensaje}</div>
            </div>
        )
    );
}

export default Toast