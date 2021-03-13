import { useEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import SETTINGS from '../Settings';
import FORM_DATA_MODEL from '../data/FormDataModel';
import InputParamHelper from './InputParamHelper';

const { noValueString } = SETTINGS;

const handleValue = (postValues, inputName, inputValue) => {
    let updatedValues;
    if (inputValue) {
        const newPostValues = {};
        // when we need to simulate a parameter sent with no value
        newPostValues[inputName] = inputValue.toLowerCase() !== noValueString ? inputValue : '';
        updatedValues = { ...postValues, ...newPostValues };
    }
    else {
        const newPostValues = { ...postValues };
        delete newPostValues[inputName];
        updatedValues = { ...newPostValues };
    }

    return updatedValues;
};

const handleTooltip = (name, isPaymentParam) => {
    if (!isPaymentParam)
        return 'NOT a payment param!'
    else
        return FORM_DATA_MODEL.params.find(param => param.name === name).tooltip || ''
};

const InputParam = ({ id, name, isPaymentParam, postValues, setPostValues, postUrlName, appState, setAppState }) => {
    const hasHelper = useState(FORM_DATA_MODEL.helpers.find(x => x.for === name) !== undefined);
    const [showHelper, setShowHelper] = useState(false);

    const generateNewMTID = () => {
        if (name === 'MerchantTransactionID') 
            setInputVal(Math.floor((Math.random() * 1000000000000) + 1).toString())
    };

    const setInputVal = (val) => (
        isPaymentParam
            ? setPostValues((postValues) => (handleValue(postValues, name, val)))
            : setAppState((postValues) => (handleValue(postValues, name, val)))
    );

    useEffect(() => {
        generateNewMTID();
        return (() => {
            // clear merchant ID value wen POST URL val changes
            if (['MerchantID', 'SiteID'].includes(name)) {
                setInputVal(false);
            }
        })
    }, [postUrlName]);

    return (
        <>
            <Tooltip title={handleTooltip(name, isPaymentParam)} placement="bottom" arrow>
                <fieldset style={{ border: 'none', padding: '.25rem', borderRadius: '.25rem', border: (!isPaymentParam ? `1px dotted ${grey[700]}` : 'none') }}>
                    <legend htmlFor={id} style={{ cursor: (name === 'MerchantTransactionID' ? 'pointer' : 'inherit'), color: teal[600] }} onClick={generateNewMTID} >
                        {name}
                    </legend>
                    <input
                        autoComplete="off"
                        autoComplete="new-password"
                        style={{
                            width: showHelper ? '91%' : '100%',
                            height: '1.5rem', border: 'none', borderRadius: '.25rem',
                            backgroundColor: grey[600]
                        }}
                        type="text"
                        id={id}
                        name={id}
                        value={(isPaymentParam ? postValues[name] : appState[name]) || ''}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    {!hasHelper ? '' :
                        <InputParamHelper
                            name={name}
                            setInputVal={setInputVal}
                            postUrlName={postUrlName}
                            merchantId={postValues['MerchantID']}
                            setShowHelper={setShowHelper}
                        />
                    }
                </fieldset>
            </Tooltip>
        </>
    )
};

export default InputParam;