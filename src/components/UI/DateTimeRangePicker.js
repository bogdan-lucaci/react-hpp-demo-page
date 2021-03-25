import { useState, useEffect } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import InlineDateTimePicker from './DateTimePicker';
import useAppContext from '../../AppContextHook';


const DateTimeRangePicker = ({ idStart, idEnd, x, setVisibleHistoryPeriod }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [hasError, setHasError] = useState(false);
    const palette = useAppContext('ThemeContext')['theme']['palette'];

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const hasError = start > end ? true : false;
        setHasError(hasError);
        if (!hasError)
            setVisibleHistoryPeriod(prevHistory => {
                // check for valid date: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
                if (!hasError)
                    return ({ start, end })
                else
                    return ({ start: prevHistory.start, end: prevHistory.end })
            });
    }, [startDate, endDate]);

    return (
        <>
            <InlineDateTimePicker
                id={idStart}
                label="Start"
                defaultValue={new Date(Date.now() - 86400000)}
                maxDate={new Date()}
                onChange={(val) => setStartDate(val)}
            /><br /><br />
            <InlineDateTimePicker
                id={idEnd}
                label="End"
                defaultValue={new Date()}
                disableFuture={true}
                maxDate={new Date()}
                onChange={(val) => setEndDate(val)}
            />
            {hasError &&
                <Box mt={1}>
                    <Typography variant="caption" display="block" gutterBottom={true} style={{ color: palette.error.main }}>
                        Please enter an End date AFTER Start date!
                        </Typography>
                </Box>
                // {/* <Alert severity="warning">This will delete <span style={{ color: palette.error.main }}><b>ALL</b></span> history!</Alert> */}
            }
        </>
    )
};

export default DateTimeRangePicker;