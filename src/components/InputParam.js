import { useState } from 'react';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import SETTINGS from '../Settings';
import InputParamHelper from './InputParamHelper';

const { noValueString } = SETTINGS;

const handleValue = (postValues, inputName, inputValue) => {
    let updatedValues;
    if (inputValue) {
        const newPostValues = {};
        // when we need to simulate a parameter sent with no value
        newPostValues[inputName] = inputValue.toLowerCase() !== noValueString ? inputValue : '';
        updatedValues = {...postValues, ...newPostValues};
    }
    else {
        const newPostValues = { ...postValues };
        delete newPostValues[inputName];
        updatedValues = { ...newPostValues };
    }

    return updatedValues;
}; 

const InputParam = ({ id, name, postValues, setPostValues }) => {
    const [showHelper, setShowHelper] = useState(true);

    // we do this so we may pass down to InputParaamHelper this action
    const setInputVal = (val) => {
        setPostValues(
            handleValue(postValues, name, val)
        );
    };

    return (
        <fieldset style={{ border: 'none', padding: '.25rem', borderRadius: '.25rem' }}>
            <legend htmlFor={id} style={{ color: teal[600] }}>{name}</legend>
            <input
                autoComplete="off"
                autoComplete="new-password"
                style={{
                    width: showHelper ? '90%' : '100%',
                    height: '1.5rem', border: 'none', borderRadius: '.25rem',
                    backgroundColor: grey[600]
                }}
                type="text"
                id={id}
                name={id}
                value={postValues[name] || ''}
                onChange={(e) => setInputVal(e.target.value)}
            />
            {showHelper ? (
                <InputParamHelper name={name} setShowHelper={setShowHelper} setInputVal={setInputVal} />
            ) : ''}
        </fieldset>
    )
};

export default InputParam;