import DatePicker from "react-datepicker";
import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import "./DatePickerComponent.css";

const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return <div className="mydatePicker d-flex flex-column justify-content-center align-items-center">
        <h5 className="text-center">Elige fecha</h5>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='justify-content-center' />
    </div>
}
export default DatePickerComponent;
