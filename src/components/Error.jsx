import { useLocation } from "react-router-dom"

const Error = () => {
    const location = useLocation();
    const { errorInfo = null } = location.state || {};

    console.log(errorInfo);

    return (
        <div className="my-5">
            <h2 className="display-2 text-center">Lo sentimos.</h2>
            { errorInfo && 
            <div className="display-6 fw-bold text-danger text-center">
                { errorInfo }
            </div>
             }
        </div>
    );
    
}

export default Error;