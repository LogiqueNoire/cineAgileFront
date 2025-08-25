import engranajes from "../../assets/engranajes.gif"

const Auditoria = () => {

    return (
        <div className="mt-4">
            <h2 className="fw-bold text-center" style={{ fontSize: '40px' }}>Auditorías</h2>
            <figure className="m-0 d-flex justify-content-center align-items-center">
                <img src={engranajes} alt="" style={{ width: '200px' }} />
                <h2 className="fw-bold text-start" style={{ fontSize: '40px', width: 'min-content' }}>Muy pronto...</h2>
            </figure>
        </div>
    )
}
export default Auditoria