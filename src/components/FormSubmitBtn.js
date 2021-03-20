import { Box, Button } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import utils from '../utils/utils';

const post_to_url = (action, params, method) => {
    method = method || "post";

    const form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", action);

    params.forEach(param => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', param.name);
        hiddenField.setAttribute('value', param.value);
        form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
}

const handleSubmit = (postValues, formAction, setIsLoading) => {
    const postValuesSorted = JSON.parse(utils.sortParamsByFormModel(postValues));
    const paramsWithValueSorted = Object.keys(postValuesSorted).map(param => ({name: param, value: postValues[param]}));

    setIsLoading(true);
    setTimeout(() => {
        post_to_url(formAction, paramsWithValueSorted);
    }, 0);
};

const SubmitButton = ({postValues, formAction, setIsLoading, ...props}) => {

    return (
        <Button
            {...props}
            style={{ width: "40%" }}
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            endIcon={<OpenInNewIcon color="disabled" />}
            onClick={() => handleSubmit(postValues, formAction, setIsLoading)}
        >
            <Box px={3}>Pay</Box>
        </Button>
    )
}

export default SubmitButton;