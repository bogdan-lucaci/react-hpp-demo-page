import { useEffect, useRef, useState } from 'react';
import useAppContext from '../../../AppContextHook';
import { grey } from '@material-ui/core/colors';

const helperBehaviour = (select, dataLength, setInputVal, inputHasValue) => {
    if (select && dataLength && !inputHasValue) {
        // select helper's value if helper's list's length is 1
        if (dataLength === 1)
            setInputVal(select.options[1].value);
        // remove value if helper's list length is > 1
        else
            setInputVal(false);

        select.selectedIndex = -1;
    }
};

const InputParamHelper = ({ name: inputName, inputHasValue, setInputVal, postUrlName, merchantId, methodId, setShowHelper, transactionType }) => {
    const DATA_ACCESS = useAppContext('DataContext');
    const helperData = DATA_ACCESS.getHelperData(inputName, postUrlName, merchantId, transactionType);
    const dataLength = helperData.length;
    const helperSelectRef = useRef();
    const [logoUrl, setLogoUrl] = useState('');

    // initial render
    useEffect(() => {
        // tell parent component to update markup for helpers
        setShowHelper(() => dataLength > 0)
        // deselect helper list
        if (helperSelectRef.current)
            helperSelectRef.current.selectedIndex = -1;
    }, []);

    // helpers behavior when transaction type changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (inputName === 'ActionName') {
            //console.log(dataLength);
            setShowHelper(() => dataLength > 0);
            // inputHasValue=false because we want to clear ActionName each time transactionType changes
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, false);
        }
    }, [transactionType]);

    // helpers behavior when MerchantID changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (inputName === 'SiteID') {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, inputHasValue);
        }
    }, [merchantId]);

    // helpers behavior when POST URL changes
    useEffect(() => {
        // tell parent component to update markup for merchant and site helpers visibility
        if (['MerchantID', 'SiteID'].includes(inputName)) {
            setShowHelper(() => dataLength > 0);
            helperBehaviour(helperSelectRef.current, dataLength, setInputVal, inputHasValue);
        }
    }, [postUrlName]);

    // method logo when methodId value changes
    useEffect(() => {
        if (inputName === 'MethodID') {
            if (methodId) {
                const optionsElems = helperSelectRef.current.options;
                const foundOption = [...optionsElems].find(option => option.value === methodId);
                if (foundOption) {
                    const foundIndex = foundOption.index;
                    const newLogoUrl = 'https://apitest.smart2pay.com/' + helperSelectRef.current.options[foundIndex].getAttribute('data-logourl');
                    setLogoUrl(newLogoUrl);
                }
                else
                    setLogoUrl('');
            }
            else
                setLogoUrl('');
        }
    }, [methodId]);


    const handleChange = (e) => {
        setInputVal(e.target.value);
        helperSelectRef.current.selectedIndex = -1;
    };

    return (
        <>
            {dataLength > 0 &&
                <>
                    <select
                        id={`${inputName}_helper`}
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
                        {helperData.map(x => {
                            const helperHasDataSet = x.dataSet && x.dataSet.length ? true : false;
                            let helperDataSet = {};
                            if (helperHasDataSet)
                                helperDataSet = x.dataSet.reduce((allDataSets, currDataSet) => ({ ...allDataSets, [`data-${currDataSet.key}`]: currDataSet.val }), {});

                            return (helperHasDataSet
                                ? <option key={x.id} value={x.val} {...helperDataSet} >{x.displayVal}</option>
                                : <option key={x.id} value={x.val} >{x.displayVal}</option>
                            )
                        }
                        )}
                    </select>
                    {inputName === 'MethodID' && logoUrl &&
                        <img
                            style={{
                                position: 'absolute', top: '1.55em', right: '1.75em',
                                maxWidth: '85px', maxHeight: '30px',
                                padding: '1px',
                                borderRadius: '5px',
                                backgroundColor: '#FFF'
                            }}
                            src={logoUrl}
                        />
                    }
                </>
            }
        </>
    )
};

export default InputParamHelper;