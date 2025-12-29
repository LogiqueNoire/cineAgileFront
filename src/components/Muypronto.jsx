import engranajes from "@/assets/engranajes.gif"

const MuyPronto = () => {
    return (
        <figure className="m-0 d-flex justify-content-center align-items-center">
            <img src={engranajes} alt="" style={{ width: '200px' }} />
            <h2 className="fw-bold text-start ancizar-sans-regular mb-0" style={{ fontSize: '40px', width: 'min-content' }}>Muy pronto...</h2>
        </figure>
    )
}

export default MuyPronto