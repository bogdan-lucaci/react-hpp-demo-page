import { useEffect, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { grey, teal } from '@material-ui/core/colors';
import SETTINGS from '../Settings';
import FORM_DATA_MODEL from '../data/FormDataModel';
import InputParamHelper from './InputParamHelper';

const { noValueString } = SETTINGS;

// append or delete (if no val) param to postValues
const handleValue = (currObj, name, val) => {
    let updatedValues;
    if (val) {
        const newPostValues = {};
        // when we need to simulate a parameter sent with no value
        newPostValues[name] = val.toLowerCase() !== noValueString ? val : '';
        updatedValues = { ...currObj, ...newPostValues };
    }
    else {
        const newPostValues = { ...currObj };
        delete newPostValues[name];
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
    const hasHelper = FORM_DATA_MODEL.helpers.find(x => x.for === name) !== undefined;
    const [showHelper, setShowHelper] = useState(false);

    const setInputVal = (val) => {
        if (isPaymentParam)
            setPostValues(postValues => handleValue(postValues, name, val))
        else
            setAppState(appState => handleValue(appState, name, val))
    };

    // generate new MTID and clear MerchantID and SiteID when POST URL value changes
    const generateNewMTID = () => {
        if (name === 'MerchantTransactionID') 
            setInputVal(Math.floor((Math.random() * 1000000000000) + 1).toString())
    };    
    useEffect(() => {
        generateNewMTID();
        return () => {
            if (['MerchantID', 'SiteID'].includes(name)) 
                setInputVal(false);
        }
    }, [postUrlName]);

    // clear SiteID when MerchantID value changes
    useEffect(() => {
        return () => {
            if (name === 'SiteID') 
                setInputVal(false);
        }
    }, [postValues['MerchantID']]);


    return (
        <>
            <Tooltip title={handleTooltip(name, isPaymentParam)} placement="bottom" arrow>
                <fieldset style={{ border: (!isPaymentParam ? `1px dotted ${grey[700]}` : 'none'), padding: '.25rem', borderRadius: '.25rem' }}>
                    <legend htmlFor={id} style={{ cursor: (name === 'MerchantTransactionID' ? 'pointer' : 'inherit'), color: teal[600] }} onClick={name === 'MerchantTransactionID' ? generateNewMTID : null} >
                        {name}
                    </legend>
                    <input
                        //autoComplete="off"
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
                    {hasHelper &&
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