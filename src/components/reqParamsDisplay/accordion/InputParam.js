import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { grey, teal } from '@material-ui/core/colors';
import SETTINGS from '../../../Settings';
import FDM_ACCESS from '../../../data/FormDataModelAccess';
import InputParamHelper from './InputParamHelper';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import utils from '../../../utils/utils';

const { noValueString } = SETTINGS;

// append or delete (if no val) param to postValues
const handleValue = (name, val, setPostValues) => {
    setPostValues(prevPostValues => {
        if (val) {
            //console.log({ ...prevPostValues, [name]: (val.toLowerCase() !== noValueString ? val : '') });
            return ({ ...prevPostValues, [name]: (val.toLowerCase() !== noValueString ? val : '') })
        }
        else {
            const updatedPostValues = { ...prevPostValues };
            delete updatedPostValues[name];
            return { ...updatedPostValues }
        }
    });
};

const InputParam = ({ id, name, postValues, setPostValues, postUrlName, transactionType }) => {
    const hasHelper = FDM_ACCESS.paramHasHelper(name);
    const [showHelper, setShowHelper] = useState(false);

    const setInputVal = (val) => handleValue(name, val, setPostValues);

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

    const handleLegendClick = (e) => {
        switch (e.target.innerText) {
            case 'MerchantTransactionID':
                return generateNewMTID()
            case 'MethodID':
                return utils.sortSelect('MethodID_helper', true);
            default:
                return null
        }
    }

    return (
        <>
            <Tooltip title={FDM_ACCESS.getParamTooltipByName(name)} placement="top-start" arrow>
                <fieldset style={{ border: 'none', padding: '.25rem', borderRadius: '.25rem', position:'relative' }}>
                    <Box display="flex">
                    <legend 
                        htmlFor={id}
                        style={{ cursor: (['MerchantTransactionID', 'MethodID'].includes(name) ? 'pointer' : 'inherit'), color: teal[600] }}
                        onClick={handleLegendClick} 
                    >
                        {name}
                    </legend>
                    {['MerchantTransactionID', 'MethodID'].includes(name) && <InfoOutlinedIcon style={{ fontSize: 18, position: 'relative', top: '-.25em' }} color="secondary" />}
                    </Box>
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
                        value={postValues[name] || ''}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    {hasHelper &&
                        <InputParamHelper
                            name={name}
                            inputHasValue={postValues[name] ? true : false}
                            setInputVal={setInputVal}
                            postUrlName={postUrlName}
                            merchantId={postValues['MerchantID']}
                            methodId={postValues['MethodID']}
                            setShowHelper={setShowHelper}
                            transactionType={transactionType}
                        />
                    }
                </fieldset>
            </Tooltip>
        </>
    )
};

// export default React.memo(InputParam, (prevVal, nextVal) => {

//     if (prevVal.postValues[prevVal.name] !== nextVal.postValues[nextVal.name]) {
//         console.log('---', prevVal.name, nextVal.name,     prevVal.name === nextVal.name && prevVal.postValues[prevVal.name] === nextVal.postValues[nextVal.name]);
//         console.log('---', prevVal.postValues[prevVal.name], nextVal.postValues[nextVal.name]);
//     }
//     // prevVal.name === nextVal.name &&    
//     // prevVal.postValues[prevVal.name] === nextVal.postValues[nextVal.name]
//     console.log(nextVal.name, prevVal.postValues[prevVal.name] === nextVal.postValues[nextVal.name]);
//     return prevVal.postValues[prevVal.name] === nextVal.postValues[nextVal.name];
// }
// );
export default InputParam;