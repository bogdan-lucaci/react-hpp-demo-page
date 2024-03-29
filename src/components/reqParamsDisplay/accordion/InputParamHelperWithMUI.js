import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
// import { ButtonGroup, FormControl, InputLabel, OutlinedInput, Tooltip } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const helperBehaviour = (select, dataLength, setInputVal) => {
    if (select) {
        // select helper value if helper list's length is 1
        if (dataLength === 1)
            setInputVal(select.options[1].value)
    }
};

const InputParamHelper = ({ name: inputName, setInputVal, postUrlName, merchantId, setShowHelper }) => {
    const DATA_ACCESS = useAppContext('DataContext');
    const helperData = DATA_ACCESS.getHelperData(inputName, postUrlName, merchantId);
    const dataLength = helperData.length;
    const helperSelect = useRef();

    // initial render
    useEffect(() => {
        // tell parent component to update markup for helpers
        setShowHelper(() => dataLength > 0);
        // deselect helper list
        if (helperSelect.current) 
            helperSelect.current.selectedIndex = -1;
    }, []);

    // helpers behavior when MerchantID changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (inputName === 'SiteID') {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelect.current, dataLength, setInputVal);
        }
    }, [merchantId]);

    // helpers behavior when POST URL changes
    useEffect(() => {
        // tell parent component to update markup for merchant and site helpers visibility
        if (['MerchantID', 'SiteID'].includes(inputName)) {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelect.current, dataLength, setInputVal);
        }
    }, [postUrlName]);

    const handleChange = (e) => {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
    };

    return (
        <>
            {dataLength > 0 &&
                <select
                    ref={helperSelect}
                    style={{
                        // width: '9%',
                        height: '100%', 
                        border: 'none', borderRadius: '.25rem',
                        backgroundColor: grey[600],
                        borderLeft: '2px solid ' + grey[500]
                    }}
                    onChange={handleChange}
                >
                    <option key="no-value" value=""></option >
                    {helperData.map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            }
        </>
    )
};

export default InputParamHelper;