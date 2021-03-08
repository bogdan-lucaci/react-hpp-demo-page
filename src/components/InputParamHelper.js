import { useEffect } from 'react';
import useAppContext from '../AppContextHook';
import DATA_FORM_MODEL from '../data/DataFormModel';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';



const getHelperData = (_data, inputName) => {

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
                _data.getMerchantsForEnv("test").map(merchant => (
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

const hasHelper = (name) => DATA_FORM_MODEL.helpers.filter(x => x.for === name).length ? true : false;

const InputParamHelper = ({ inputName, setShowHelper }) => {
    const _data = useAppContext('DataContext');
    const helperHasData = getHelperData(_data, inputName).length ? true : false;
    console.log(getHelperData(_data, inputName));

    useEffect(() => {
        return setShowHelper(helperHasData)
    }, []);

    return (
        <>
            {!helperHasData ? '' :
                <select
                    style={{
                        width: '10%',
                        height: '1.5rem', border: 'none', borderRadius: '.25rem',
                        backgroundColor: grey[600],
                        borderLeft: '2px solid ' + grey[500]
                    }}
                >
                    {
                        getHelperData(_data, inputName).map(x =>
                            <option key={x.id} value={x.id}>{x.val}</option >
                        )
                    }
                </select>
            }
        </>
    )
};

export default InputParamHelper;