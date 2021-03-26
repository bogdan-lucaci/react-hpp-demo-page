import React, { useEffect, useState } from "react";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

function InlineDateTimePicker({ id, label, defaultValue, minDate, maxDate, onChange, setHasError, disableFuture }) {
    const [selectedDate, handleDateChange] = useState(defaultValue); //"2018-01-01T00:00:00.000Z"

    useEffect(() => {
        onChange(selectedDate);
    }, [selectedDate]);

    const handleError = (err) => {
        setHasError(err ? true : false);
    }

    return (
        <>
            {/* <DateTimePicker
                id={id}
                variant="inline"
                ampm={false}
                label="Basic example"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                disableFuture={disableFuture || false}
                format="dd/MM/yyyy HH:mm"
                onError={handleError}
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
                format="dd/MM/yyyy HH:mm"
                onError={handleError}
            />
        </>
    );
}

export default InlineDateTimePicker;