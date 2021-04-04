import React, { useEffect, useState, useCallback } from 'react';
import { ButtonGroup, FormControl, InputLabel, OutlinedInput, TextField, Tooltip } from '@material-ui/core';
import { grey, teal } from '@material-ui/core/colors';
import SETTINGS from '../Settings';
import FORM_DATA_MODEL from '../data/FormDataModel';
import InputParamHelper from './InputParamHelper';

const { noValueString } = SETTINGS;

const getTooltip = name => FORM_DATA_MODEL.params.find(param => param.name === name).tooltip || '';

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

const InputParam = ({ id, name, postValues, setPostValues, postUrlName, appHelpers, setAppHelpers }) => {
    const hasHelper = FORM_DATA_MODEL.helpers.find(x => x.for === name) !== undefined;
    const [showHelper, setShowHelper] = useState(false);

    const setInputVal = (val) => {
        setPostValues(postValues => handleValue(postValues, name, val))
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

            <Tooltip title={getTooltip(name)} placement="bottom" arrow>
                <ButtonGroup 
                    disableElevation={true} 
                    size="large" 
                    variant="contained" 
                    color="primary" 
                    aria-label="split button" 
                    fullWidth={true}
                    //style={{ width: "100%" }}
                >
                    {/* <FormControl elevation="0"> */}
                        <TextField type="text" variant="outlined"
                            id={id}
                            name={id}
                            autoComplete="new-password"
                            // margin="dense"
                            // style={{ width: showHelper ? '91%' : '100%' }}
                            value={postValues[name] || ''}
                            onChange={(e) => setInputVal(e.target.value)}
                            label={name}
                            InputLabelProps={
                                onclick= (name === 'MerchantTransactionID' ? generateNewMTID : null)
                            }
                        />
                        {/* <InputLabel htmlFor={id} onClick={name === 'MerchantTransactionID' ? generateNewMTID : null}>
                            {name}
                        </InputLabel>                         */}
                    {/* </FormControl> */}
                    {hasHelper &&
                        <FormControl style={{ width: showHelper ? '9%' : 0 }}>
                            <InputParamHelper
                                name={name}
                                setInputVal={setInputVal}
                                postUrlName={postUrlName}
                                merchantId={postValues['MerchantID']}
                                setShowHelper={setShowHelper}
                            />
                        </FormControl>
                    }
                </ButtonGroup>

            </Tooltip>
        </>
    )
};

// export default React.memo(InputParam, 
//     // render the input only if the value changed from the previous render
//     (prevVal, nextVal) => (prevVal.name === nextVal.name && prevVal.postValues[prevVal.name] === nextVal.postValues[nextVal.name])
// );

export default InputParam;