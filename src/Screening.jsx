import React from 'react';
import './Screening.css';

const Screening = ({ funcion }) => {
    return (
        <div className='w-auto'>
            <button className="btn btn-outline-primary" type='button'>{funcion.horaInicio}</button>
        </div>
    );
}

export default Screening;