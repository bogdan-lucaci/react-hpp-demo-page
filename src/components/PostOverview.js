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

const PostOverview = ({ postValues }) => (
    <>
        <Typography variant="h6">
            <Box color="text.disabled">
                Params to be submitted
            </Box>
        </Typography>
        <Divider />
        <pre>
            {sortParams(postValues)}
        </pre>
    </>
);

export default PostOverview;