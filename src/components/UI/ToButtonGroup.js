import { useRef, useState } from 'react';
import { ButtonGroup, Paper } from '@material-ui/core';

const ToButtonGroup = ({ children }) => {
    const anchorRef = useRef(null);
    const [elevation, setElevation] = useState(1);

    return (
        <Paper
            elevation={elevation}
            onMouseEnter={() => setElevation(5)}
            onMouseLeave={() => setElevation(1)}
        >
            <ButtonGroup 
                size="large"
                variant="contained"
                color="primary"
                ref={anchorRef}
                aria-label="split button"
                fullWidth={true}
                style={{ width: "100%" }}
            >
                {children}
            </ButtonGroup>
        </Paper>
    )
};

export default ToButtonGroup;