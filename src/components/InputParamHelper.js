import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import { grey } from '@material-ui/core/colors';

const InputParamHelper = ({ name: inputName, setInputVal, postUrlName, merchantId, setShowHelper }) => {
    const DATA_ACCESS = useAppContext('DataContext');
    const helperData = DATA_ACCESS.getHelperData(inputName, postUrlName, merchantId);
    const helperSelect = useRef(false);

    const helperBehaviour = () => {
        if (helperSelect.current) {
            // select helper value if helper list's length is 1
            if (helperData.length === 1)
                setInputVal(helperSelect.current.options[1].value)
            // deselect helper list
            helperSelect.current.selectedIndex = -1;
        }
    }

    // initial render
    useEffect(() => {
        // tell parent component to update markup for helpers
        setShowHelper(() => helperData.length > 0)
    }, []);

    // helpers behaviour when MerchantID changes
    useEffect(() => {
        // tell parent component to update markup for site helpers visibility
        if (['SiteID'].includes(inputName)) {
            setShowHelper(() => helperData.length > 0);
            helperBehaviour();
        }
    }, [merchantId]);

    // helpers behaviour when POST URL changes
    useEffect(() => {
        // tell parent component to update markup for merchant and site helpers visibility
        if (['MerchantID', 'SiteID'].includes(inputName)) {
            setShowHelper(() => helperData.length > 0);
            helperBehaviour();
        }
    }, [postUrlName]);

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