
const Permiso = ({ title, isTrue }) => {
    return (
        <div className="align-items-center">
            <label className="switch m-2">
                <input type="checkbox" checked={isTrue} /*onChange={{}}*/ />
                <span className="slider round"></span>
            </label>
            <span className="d-block-inline">{title}</span>
        </div>
    )
}
export default Permiso