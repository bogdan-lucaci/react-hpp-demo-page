import { Box, Button } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const handleSubmit = () => {
    document.forms["HppPostForm"].requestSubmit()
};

const SubmitButton = (props) => {

    return (
        <Button
            {...props}
            style={{ width: "40%" }}
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            endIcon={<OpenInNewIcon color="disabled" />}
            onClick={handleSubmit}
        >
            <Box px={3}>Pay</Box>
        </Button>
    )
}

export default SubmitButton;