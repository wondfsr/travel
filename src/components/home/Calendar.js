import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    return (
        <DatePicker
            dateFormat={"yyyy년 MM월 dd일"}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            onChange={(update) => {
                setDateRange(update);
            }}
            withPortal
            locale={ko}
        />
    );
}

export default Calendar;
