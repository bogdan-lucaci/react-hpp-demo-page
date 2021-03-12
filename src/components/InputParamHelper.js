import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';

const InputParamHelper = ({ name: inputName, setInputVal, postUrlName, merchantId, setShowHelper }) => {
    const _data = useAppContext('DataContext');
    const getHelperData = () => _data.getHelperData(inputName, postUrlName, merchantId);
    const helperHasData = getHelperData().length > 0 ? true : false;
    const helperSelect = useRef();

    // what happens when POST URL changes
    useEffect(() => {
        setShowHelper(() => helperHasData);

        if (helperSelect.current) {
            if (getHelperData().length === 1) {
                setInputVal(helperSelect.current.value)
            }

            helperSelect.current.selectedIndex = -1;
        }
    }, [postUrlName]);

    // what happens when MerchantID changes
    useEffect(() => {
        if (inputName === 'SiteID') {
            setShowHelper(() => getHelperData().length > 0);

            if (helperSelect.current) {
                if (getHelperData().length === 1) {
                    setInputVal(helperSelect.current.value)
                }
            }
        }
    }, [merchantId]);

    const handleChange = (e) => {
        // if (e.target.value) {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
        //}
    };

    return (
        <>
            {!helperHasData ? '' :
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
                    {getHelperData().map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            }
        </>
    )
}

export default InputParamHelper;