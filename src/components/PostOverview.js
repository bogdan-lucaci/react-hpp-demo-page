import { Typography, Box, Divider } from '@material-ui/core';

// sort params alphabetically
const sortParams = text => {
    if (Object.keys(text).length > 0) {
        let x = JSON.stringify(text);
        x = x.substring(1, x.length - 1).split(',').sort();
        x = JSON.parse("{" + x + "}");
        return JSON.stringify(x, null, "    ");
    }
    else
        return "{}";
};

const PostOverview = ({ postValues, postUrlData, appState }) => (
    <>
        <Typography variant="h6">
            <Box color="text.disabled">
                Request URL (form action)
            </Box>
        </Typography>
        <Divider />
        <Box mb={2}>
            <pre>
                {postUrlData.formAction}
            </pre>
        </Box>
        <Typography variant="h6">
            <Box color="text.disabled">
                Request Form Data
            </Box>
        </Typography>
        <Divider />
        <pre>
            {sortParams(postValues)}
        </pre>
        <Box mt={5}>
            <Divider />
            <Typography variant="h6">
                <Box color="text.disabled">
                    App state
            </Box>
            </Typography>
            <Divider />
            <pre>
                {sortParams(appState)}
            </pre>
        </Box>
    </>
);

export default PostOverview;