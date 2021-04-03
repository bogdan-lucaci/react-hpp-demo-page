import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import { grey } from '@material-ui/core/colors';

const helperBehaviour = (select, dataLength, setInputVal, inputHasValue) => {
    if (select && !inputHasValue) {
        // select helper value if helper list's length is 1
        if (dataLength === 1) {
            setInputVal(select.options[1].value)
            select.selectedIndex = -1;
        }
    }
};

const InputParamHelper = ({ name: inputName, inputHasValue, setInputVal, postUrlName, merchantId, setShowHelper, transactionType}) => {
    const DATA_ACCESS = useAppContext('DataContext');
    const helperData = DATA_ACCESS.getHelperData(inputName, postUrlName, merchantId, transactionType);
    const dataLength = helperData.length;
    const helperSelectRef = useRef();

    // initial render
    useEffect(() => {
        // tell parent component to update markup for helpers
        setShowHelper(() => dataLength > 0)
        // deselect helper list
        if (helperSelectRef.current) 
            helperSelectRef.current.selectedIndex = -1;
    }, []);

    // helpers behaviour when transaction type changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (inputName === 'ActionName') {
            console.log(dataLength);
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, inputHasValue);
        }
    }, [transactionType]);

    // helpers behaviour when MerchantID changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (inputName === 'SiteID') {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, inputHasValue);
        }
    }, [merchantId]);

    // helpers behaviour when POST URL changes
    useEffect(() => {
        // tell parent component to update markup for merchant and site helpers visibility
        if (['MerchantID', 'SiteID'].includes(inputName)) {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, inputHasValue);
        }
    }, [postUrlName]);



    const handleChange = (e) => {
        setInputVal(e.target.value);
        helperSelectRef.current.selectedIndex = -1;
    };

    return (
        <>
            {dataLength > 0 &&
                <select
                    ref={helperSelectRef}
                    style={{
                        width: '9%',
                        height: '1.5rem', border: 'none', borderRadius: '.25rem',
                        backgroundColor: grey[600],
                        borderLeft: '2px solid ' + grey[500]
                    }}
                    onChange={handleChange}
                >
                    <option key="no-value" value=""></option >
                    {helperData.map(x =>
                        <option key={x.id} value={x.val}>{x.displayVal}</option >
                    )}
                </select>
            }
        </>
    )
};

export default InputParamHelper;