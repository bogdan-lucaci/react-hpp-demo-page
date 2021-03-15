import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';

const InputParamHelper = ({ name: inputName, setInputVal, postUrlName, merchantId, setShowHelper }) => {
    const DATA_ACCESS = useAppContext('DataContext');
    const helperData = DATA_ACCESS.getHelperData(inputName, postUrlName, merchantId);
    const helperSelect = useRef(false);

    // initial render
    useEffect(() => {
        // tell parent component to update markup for helpers
        setShowHelper(() => helperData.length > 0)
    }, []);

    // helpers behaviour when POST URL or MerchantID changes
    useEffect(() => {
        // tell parent component to update markup for merchant and site helpers visibility
        if (['MerchantID', 'SiteID'].includes(inputName))
            setShowHelper(() => helperData.length > 0);

        if (helperSelect.current) {
            // select helper value if helper list's length is 1
            if (helperData.length === 1)
                setInputVal(helperSelect.current.options[1].value)
            // deselect helper list
            helperSelect.current.selectedIndex = -1;
        }
    }, [postUrlName, merchantId]);

    const handleChange = (e) => {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
    };

    return (
        <>
            {helperData.length > 0 &&
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
                    <option key="no-value" value=""></option >
                    {helperData.map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            }
        </>
    )
}

export default InputParamHelper;