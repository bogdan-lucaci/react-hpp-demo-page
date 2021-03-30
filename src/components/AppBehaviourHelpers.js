import React, { useState } from 'react';
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grow, Paper, TextField } from '@material-ui/core';
import ThemeSwitch from '../components/UI/ThemeSwitch';

const DisplayInIframeHelper = ({ appHelpers, setAppHelpers }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        setIsChecked(prevState => !prevState);

        setAppHelpers(prevAppHelper => {
            if (e.target.checked)
                return ({ ...prevAppHelper, [e.target.name]: e.target.checked.toString() })
            else {
                const updatedAppHelper = { ...prevAppHelper };
                delete updatedAppHelper[e.target.name];
                delete updatedAppHelper['IframeOverlaySource'];
                return { ...updatedAppHelper }
            }
        });
    };
    return (
        <Box mt={2}>
            <FormGroup column>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isChecked}
                            onChange={handleChange}
                            name="DisplayInsideIframe"
                            color="primary"
                        />
                    }
                    label="Display Inside Iframe"
                />
                {isChecked &&
                    <Grow in={isChecked}>
                        <Box mt={1}>
                            <TextField
                                id="outlined-basic"
                                label="Iframe Overlay Source"
                                name="IframeOverlaySource"
                                variant="outlined"
                                placeholder="e.g. 'http://site.com'"
                                margin="dense"
                                onChange={e => setAppHelpers(prevAppHelper => ({ ...prevAppHelper, [e.target.name]: e.target.value }))}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Box>
                    </Grow>
                }
            </FormGroup>
        </Box>
    )
}

const AppBehaviourHelpers = ({ appHelpers, setAppHelpers }) => {

    return (
        <>
            <ThemeSwitch />
            <Divider />
            <DisplayInIframeHelper
                appHelpers={appHelpers}
                setAppHelpers={setAppHelpers}
            />
        </>
    )
}

export default AppBehaviourHelpers;