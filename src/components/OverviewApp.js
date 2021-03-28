import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import useAppContext from '../AppContextHook';
import utils from '../utils/utils';

const OverviewApp = ({ appState }) => {
    const palette = useAppContext('ThemeContext')['theme']['palette'];
    return (
        <>
            <Box>
                <Typography variant="h6">
                    <Box color="text.disabled">
                        App helpers
                </Box>
                </Typography>
                <Divider light={true} />
                <pre>
                    {utils.getJsonColoredMarkup(
                        utils.sortParamsByName(appState), {
                        keyColor: palette.success.main,
                        valColor: palette.text.icon
                    }
                    )}
                </pre>
            </Box>
            <Box mt={2}>
                <Typography variant="h6">
                    <Box color="text.disabled">
                        URL params
                    </Box>
                </Typography>
                <Divider light={true} />
                <pre>
                    {utils.getJsonColoredMarkup(
                        JSON.stringify(utils.getUrlParamsObj()), {
                        keyColor: palette.success.main,
                        valColor: palette.text.icon
                    }
                    )}
                </pre>
            </Box>
        </>
    )
};

// 
export default OverviewApp;
//export default React.memo(OverviewApp, (prevVal, nextVal) => {console.log(JSON.stringify(prevVal.appState) == JSON.stringify(nextVal).appState, prevVal.appState, nextVal.appState); return prevVal.appState === nextVal.appState});