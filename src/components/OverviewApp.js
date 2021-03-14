import { Typography, Box, Divider } from '@material-ui/core';
import useAppContext from '../AppContextHook';
import utils from '../utils/utils';

const getJsonMarkup = (jsonString, { keyColor, valColor }) => {
    let json = JSON.parse(jsonString);
    return (
        <>
            {"{"}
            {Object.keys(json).map(param => (
                <Box>
                    &nbsp;&nbsp;&nbsp;<span style={{ color: keyColor }}>{param}</span> : <span style={{ color: valColor }}>{json[param]}</span>
                </Box>
            ))}
            {"}"}
        </>
    )
};

const OverviewPost = ({ appState }) => {
    const palette = useAppContext('ThemeContext')['theme']['palette'];
    return (
        <Box>
            <Typography variant="h6">
                <Box color="text.disabled">
                    App helpers
        </Box>
            </Typography>
            <Divider light={true} />
            <pre>
                {getJsonMarkup(
                    utils.sortParams(appState), {
                    keyColor: palette.success.main,
                    valColor: palette.text.icon
                }
                )}
            </pre>
        </Box>
    )
};

export default OverviewPost;