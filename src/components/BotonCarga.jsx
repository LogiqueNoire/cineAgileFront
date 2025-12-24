const BotonCarga = ({ className, type, style, submitting, onClick, children }) => {
    return (
        <button className={className} type={type} style={ style } onClick={ onClick }>
            { submitting ? 
            <span className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Cargando...</span>
            </span> : children
            }
        </button>
    )
}

export default BotonCarga;