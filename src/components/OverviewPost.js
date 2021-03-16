import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import useAppContext from '../AppContextHook';
import utils from '../utils/utils';

const getJsonMarkup = (jsonString, { keyColor, valColor }) => {
    let json = JSON.parse(jsonString);
    return (
        <>
            {"{"}
            {Object.keys(json).map(param => (
                <Box key={param}>
                    &nbsp;&nbsp;&nbsp;<span style={{ color: keyColor }}>{param}</span> : <span style={{ color: valColor }}>{json[param]}</span>
                </Box>
            ))}
            {"}"}
        </>
    )
};

const OverviewPost = ({ postValues, postUrlData }) => {
    const palette = useAppContext('ThemeContext')['theme']['palette'];
    return (
        <>
            <Typography variant="h6">
                <Box color="text.disabled">
                    Request URL (form action)
            </Box>
            </Typography>
            <Divider light={true} />
            <Box mb={3}>
                <pre>
                    {postUrlData.formAction}
                </pre>
            </Box>
            <Typography variant="h6">
                <Box color="text.disabled">
                    Request Form Data
            </Box>
            </Typography>
            <Divider light={true} />
            <pre>
                {getJsonMarkup(
                    utils.sortParams(postValues), {
                        keyColor: palette.success.main,
                        valColor: palette.text.icon
                    }
                )}
            </pre>
        </>
    )
};
// <OverviewPost> should not update when appState changes for e.g.
export default React.memo(OverviewPost);