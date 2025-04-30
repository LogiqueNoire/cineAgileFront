import React from 'react';
import './ScreeningButton.css';

const ScreeningButton = ({ funcion }) => {
    return (
        <div className='w-auto'>
            <button className="btn btn-outline-primary" type='button'>{funcion.horaInicio}</button>
        </div>
    );
}

export default ScreeningButton;