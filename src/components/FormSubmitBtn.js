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

const handleSubmit = (postValues, formAction) => {
    const postValuesSorted = JSON.parse(utils.sortParams(postValues));
    const paramsWithValueSorted = Object.keys(postValuesSorted).map(param => ({name: param, value: postValues[param]}));
    //const paramsWithValueSorted = paramsWithValue.sort( (a, b) => a.name.localeCompare(b.name) );
    // const paramsWithoutValue = [...document.forms["HppPostForm"].elements].filter(x => x.tagName !== 'FIELDSET' && !x.value);
    // paramsWithoutValue.forEach(x => x.disabled=true);

    post_to_url(formAction, paramsWithValueSorted);
};

const SubmitButton = ({postValues, formAction, ...props}) => {

    return (
        <Button
            {...props}
            style={{ width: "40%" }}
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            endIcon={<OpenInNewIcon color="disabled" />}
            onClick={() => handleSubmit(postValues, formAction)}
        >
            <Box px={3}>Pay</Box>
        </Button>
    )
}

export default SubmitButton;