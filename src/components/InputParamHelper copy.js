import { useState, useEffect, useRef } from 'react';
import useAppContext from '../AppContextHook';
import DATA_FORM_MODEL from '../data/FormDataModel';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';


const InputParamHelper = ({ name: inputName, showHelper, setShowHelper, postUrlName, setInputVal }) => {
    //console.log('-- <InputParamHelper> : Post URL changed to ' + postUrlName);
    const [helperData, setHelperData] = useState([]);
    //const [showHelper, setShowHelper] = useState(false)
    //if (inputName === 'SiteID') alert(inputName);
    const _data = useAppContext('DataContext');
    const helperSelect = useRef();

    //const getInputHelperData = (inputName, postUrlName) => _data.getHelperData(inputName, postUrlName);

    const getShowHelper = (inputName, helperData) => {
        const inputHasHelper = DATA_FORM_MODEL.helpers.filter(x => x.for === inputName).length ? true : false;
        const inputHasData = helperData.length ? true : false;
        return inputHasHelper && inputHasData
    }

    useEffect(() => {


    }, []);

    useEffect(() => {
        if (helperData.length) console.log(`Helper ${inputName} has ${helperData.length}`);
        setHelperData(() => _data.getHelperData(inputName, postUrlName));

        setShowHelper(() => {
            //if (helperData.length) console.log(inputName);
            return getShowHelper(inputName, helperData)
        });
        

        //console.log('-- <InputParamHelper> : Post URL changed to ' + postUrlName);
        //if (helperData.length) console.log(inputName, helperData.length);
        // if (postUrlName)


        if (helperSelect.current) {
            if (helperData.length === 1) {
                setInputVal(helperSelect.current.value)
            }

            helperSelect.current.selectedIndex = -1;
        }

        return (() => {
            //console.log('-- <InputParamHelper> : Post URL changed to ' + postUrlName);
        })

    }, [inputName, postUrlName]);

    const handleChange = (e) => {
        // if (e.target.value) {
        setInputVal(e.target.value);
        helperSelect.current.selectedIndex = -1;
        //}
    };

    return (
        <>
            {/* {!showHelper ? '' : */}
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
                    {helperData.map(x =>
                        <option key={x.id} value={x.id}>{x.val}</option >
                    )}
                </select>
            {/* } */}
        </>
    )
};

export default InputParamHelper;