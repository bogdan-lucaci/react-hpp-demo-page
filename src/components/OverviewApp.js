import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import useAppContext from '../AppContextHook';
import utils from '../utils/utils';
import UrlParams from '../services/URLParams';

const OverviewApp = ({ appHelpers }) => {
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
                        utils.sortParamsByName(appHelpers), {
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
                        JSON.stringify(UrlParams.getObj()), {
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
//export default React.memo(OverviewApp, (prevVal, nextVal) => {console.log(JSON.stringify(prevVal.appHelpers) == JSON.stringify(nextVal).appHelpers, prevVal.appHelpers, nextVal.appHelpers); return prevVal.appHelpers === nextVal.appHelpers});