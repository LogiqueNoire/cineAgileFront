import engranajes from "../../assets/engranajes.gif"

const Auditoria = () => {

    return (
        <div className="mt-4">
            <div className="d-flex flex-row align-items-center mb-3 gap-3 justify-content-center">
                <h2 className="fs-1" style={{ color: '#01217B' }}>Auditorías</h2>
                <img src="/src/assets/modulos/audit.svg" alt="Password" className="" style={{ filter: "invert(90%) sepia(70%) saturate(25000%) hue-rotate(225deg) brightness(52.5%) contrast(100%)", height: '70px' }} />
            </div>
            <figure className="m-0 d-flex justify-content-center align-items-center">
                <img src={engranajes} alt="" style={{ width: '200px' }} />
                <h2 className="fw-bold text-start" style={{ fontSize: '40px', width: 'min-content' }}>Muy pronto...</h2>
            </figure>
        </div>
    )
}
export default Auditoria