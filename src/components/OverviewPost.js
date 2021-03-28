import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
//import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import useAppContext from '../AppContextHook';
import utils from '../utils/utils';

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
                {utils.getJsonColoredMarkup(
                    utils.sortParamsByFormModel(postValues), {
                        keyColor: palette.success.main,
                        valColor: palette.text.icon
                    }
                )}
            </pre>
        </>
    )
};
// <OverviewPost> should not update when appState changes for e.g.
export default React.memo(OverviewPost, (prevVal, nextVal) => prevVal.postValues === nextVal.postValues);
//export default OverviewPost;