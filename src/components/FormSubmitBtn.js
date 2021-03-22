import { Box, Button } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import utils from '../utils/utils';
import { addToHistory } from './PostsHistory';

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


// const saveSubmit = (postValues, formAction) => {
//     let isUnique = history.filter(x => (
//         utils.objectsAreEqual(x.value, postValues)
//     )).length ? false : true;
//     if (isUnique) {
//         setHistory(currHistory => currHistory.concat([{
//             name: new Date().toLocaleString().toString(),
//             val: { ...postValues },
//             url: formAction
//         }]));
//     }
//     else {
//         alert('This params combination is already saved!');
//         // setAlertText('This params combination is already saved!');
//         // setAlertType('info');
//         // setAlertOpen(true);
//     }
// };

const SubmitButton = ({ postValues, postUrlData, setIsLoading, ...props }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const postValuesSorted = JSON.parse(utils.sortParamsByFormModel(postValues));
        if (Object.keys(postValuesSorted).length) {
            const paramsWithValueSorted = Object.keys(postValuesSorted).map(param => ({ name: param, value: postValues[param] }));
            setIsLoading(true);
            setTimeout(() => {
                addToHistory(postValues, postUrlData);
                post_to_url(postUrlData['formAction'], paramsWithValueSorted);
            }, 0);
        }
        else {
            alert('Form must have at least one value!');
            // setAlertText('Form must have at least one value!');
            // setAlertType('warning');
            // setAlertOpen(true);
        }
    };

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
            Pay
        </Button>
    )
}

export default SubmitButton;