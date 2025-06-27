import './Loading.css'

const Loading = ({ className, style }) => {
    return <span style={style} className={` ${className} loader m-4`}></span>
}

export default Loading;