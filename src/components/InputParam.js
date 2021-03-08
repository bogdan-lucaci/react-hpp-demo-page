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

    const handleChange = (e) => {
        setPostValues(
            handleValue(postValues, name, e.target.value)
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
                onChange={handleChange}
            />
            {showHelper ? (
                <InputParamHelper inputName={name} setShowHelper={setShowHelper} />
            ) : ''}
        </fieldset>
    )
};

export default InputParam;