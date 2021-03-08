import { useState } from 'react';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import InputParamHelper from './InputParamHelper';


const InputParam = ({ id, name }) => {
    const [showHelper, setShowHelper] = useState(true);

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
            />
            {showHelper ? (
                <InputParamHelper inputName={name} setShowHelper={setShowHelper} />
            ) : ''}
        </fieldset>
    )
};

export default InputParam;