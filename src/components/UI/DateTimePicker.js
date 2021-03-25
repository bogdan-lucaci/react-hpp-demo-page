import React, { useEffect, useState } from "react";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

function InlineDateTimePicker({ id, label, defaultValue, minDate, maxDate, onChange, disableFuture }) {
    const [selectedDate, handleDateChange] = useState(defaultValue); //"2018-01-01T00:00:00.000Z"

    useEffect(() => {
        onChange(selectedDate);
    }, [selectedDate]);

    return (
        <>
            {/* <DateTimePicker
                ampm={false}
                variant="inline"
                label="Basic example"
                value={selectedDate}
                onChange={handleDateChange}
            /> */}

            <KeyboardDateTimePicker
                id={id}
                variant="inline"
                ampm={false}
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                //onError={console.log}
                // disablePast
                disableFuture={disableFuture || false}
                format="yyyy/MM/dd HH:mm"
            />
        </>
    );
}

export default InlineDateTimePicker;