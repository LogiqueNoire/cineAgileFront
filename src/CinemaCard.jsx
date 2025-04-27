import './CinemaCard.css';
import React from 'react';
import Screening from './Screening.jsx';

const CinemaCard = ({ sede, funciones }) => {
    return (
        <div className='mx-3'>
            <div className="card">
                <button className="card-header" type="button" data-bs-toggle="collapse" data-bs-target={"#" + sede.replace(/\s+/g, '')}
                    aria-expanded="false" aria-controls={sede.replace(/\s+/g, '')}>
                    <h5 className='text-start'>
                        {sede}
                    </h5>
                </button>
                <div className="card-body collapse" id={sede.replace(/\s+/g, '')}>
                    {funciones.some((funcion) => funcion.dimension === "2D" && funcion.categoria === "Regular")
                        ?
                        <>
                            <h5 className="card-title">2D Regular</h5>
                            <div className="d-flex row mb-2">
                                {Object.keys(funciones).map((key) => {
                                    if (funciones[key].dimension === "2D" && funciones[key].categoria === "Regular") {
                                        return <Screening funcion={funciones[key]}></Screening>

                                    }
                                })}
                            </div>
                        </>
                        :
                        <></>
                    }
                    {funciones.some((funcion) => funcion.dimension === "2D" && funcion.categoria === "Premium")
                        ?
                        <>
                            <h5 className="card-title">2D Premium</h5>
                            <div className="d-flex row mb-2">
                                {Object.keys(funciones).map((key) => {
                                    if (funciones[key].dimension === "2D" && funciones[key].categoria === "Premium") {
                                        return <Screening funcion={funciones[key]}></Screening>

                                    }
                                })}
                            </div>
                        </>
                        :
                        <></>
                    }
                    {funciones.some((funcion) => funcion.dimension === "3D" && funcion.categoria === "Regular")
                        ?
                        <>
                            <h5 className="card-title">3D Regular</h5>
                            <div className="row mb-2">
                                {Object.keys(funciones).map((key) => {
                                    if (funciones[key].dimension === "3D" && funciones[key].categoria === "Regular") {
                                        return <Screening funcion={funciones[key]}></Screening>



                                    }
                                })}
                            </div>
                        </>
                        :
                        <></>
                    }
                    {funciones.some((funcion) => funcion.dimension === "3D" && funcion.categoria === "Premium")
                        ?
                        <>
                            <h5 className="card-title">3D Premium</h5>
                            <div className="row mb-2">
                                {Object.keys(funciones).map((key) => {
                                    if (funciones[key].dimension === "3D" && funciones[key].categoria === "Premium") {
                                        return <Screening funcion={funciones[key]}></Screening>

                                    }
                                })}
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default CinemaCard;