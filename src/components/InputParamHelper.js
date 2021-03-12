import { useState, useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import DATA_FORM_MODEL from '../data/DataFormModel';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';

const InputParamHelper = ({ name: inputName, setInputVal, postUrlName, merchantId, setShowHelper }) => {
    const _data = useAppContext('DataContext');
    const inputHasHelper = DATA_FORM_MODEL.helpers.find(x => x.for === inputName) !== undefined;
    const getHelperData = (inputName, postUrlName) => _data.getHelperData(inputName, postUrlName);
    const helperHasData = getHelperData(inputName, postUrlName).length > 0 ? true : false;
    const helperSelect = useRef();

    useEffect(() => {
        setShowHelper(() => (inputHasHelper && helperHasData));

        if (helperSelect.current) {
            if (getHelperData(inputName, postUrlName).length === 1) {
                setInputVal(helperSelect.current.value)
            }
    
            helperSelect.current.selectedIndex = -1;
        }
    }, [postUrlName]);

    const handleChange = (e) => {
        // if (e.target.value) {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
        //}
    };
    
    return (
        <>
            {!(inputHasHelper && helperHasData) ? '' :
                <select
                    ref={helperSelect}
                    style={{
                        width: '9%',
                        height: '1.5rem', border: 'none', borderRadius: '.25rem',
                        backgroundColor: grey[600],
                        borderLeft: '2px solid ' + grey[500]
                    }}
                    onChange={handleChange}
                >
                    {/* <option key="no-value" value=""></option > */}
                    {getHelperData(inputName, postUrlName).map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            }
        </>
    )
}

export default InputParamHelper;