import { Typography, Box, Divider } from '@material-ui/core';
import utils from '../utils/utils';

const OverviewPost = ({ postValues, postUrlData }) => (
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
            {utils.sortParams(postValues)}
        </pre>
    </>
);

export default OverviewPost;