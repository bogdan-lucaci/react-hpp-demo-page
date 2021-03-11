import { useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import DATA_FORM_MODEL from '../data/DataFormModel';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';


const getHelperData = (_data, inputName, postUrlName) => {
    switch (inputName) {
        case 'Country':
            return (
                _data.getCountries().map(country => (
                    {
                        id: country.Code,
                        val: (country.Code + ' | ' + country.Name)
                    }
                ))
            )
            break;
        case 'Currency':
            return (
                _data.getCurrencies().map(currency => (
                    {
                        id: currency.Code,
                        val: (currency.Code + ' | ' + currency.Name)
                    }
                ))
            )
            break;
        case 'MerchantID':
            return (
                _data.getMerchantsForEnv(postUrlName).map(merchant => (
                    {
                        id: merchant.ID,
                        val: (merchant.ID + ' | ' + merchant.Alias)
                    }
                ))
            )
            break;


        default:
            return []
            break;

    }

};


const InputParamHelper = ({ name: inputName, setShowHelper, setInputVal, postUrlName }) => {
    const _data = useAppContext('DataContext');
    const inputHasHelper = DATA_FORM_MODEL.helpers.filter(x => x.for === inputName).length ? true : false;
    const inputHasData = getHelperData(_data, inputName, postUrlName).length ? true : false;
    const inputHelperData = getHelperData(_data, inputName, postUrlName);
    const helperSelect = useRef();

    useEffect(() => {
        if (postUrlName)
            setShowHelper(inputHasHelper && inputHasData);

        if (helperSelect.current) {
            if (inputHelperData.length === 1) {
                setInputVal(helperSelect.current.value)
            }

            helperSelect.current.selectedIndex = -1;
        }
    }, [postUrlName]);

    const handleChange = (e) => {
        // if (e.target.value) {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
        //}
    };

    return (
        <>
            {!inputHasData ? '' :
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
                    {inputHelperData.map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            }
        </>
    )
};

export default InputParamHelper;