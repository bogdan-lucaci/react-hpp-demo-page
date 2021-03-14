import { Typography, Box, Divider } from '@material-ui/core';
import utils from '../utils/utils';

const OverviewPost = ({ appState }) => (
    <Box>
        <Typography variant="h6">
            <Box color="text.disabled">
                App helpers
        </Box>
        </Typography>
        <Divider light={true}/>
        <pre>
            {utils.sortParams(appState)}
        </pre>
    </Box>
);

export default OverviewPost;