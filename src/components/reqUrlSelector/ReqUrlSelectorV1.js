import { useEffect, useRef } from 'react';
import useAppContext from '../../AppContextHook';
import { Select } from '@material-ui/core';

const setFormActionAndName = (select, setPostUrlData) => {
    if (setPostUrlData) {
        const optionName = select.options[select.selectedIndex].getAttribute('data-name');
        if (optionName !== 'custom') {
            setPostUrlData({
                formAction: select.value,
                postUrlName: optionName
            })
        } else {
            alert('not implemented yet!');
        }
    }
};

const ReqUrlSelectorV1 = ({ setPostUrlData, ...childProps }) => {
    const DATA_access = useAppContext('DataContext');
    const PostURLs = DATA_access.getPostURLs();
    const urlList = useRef(false);

    useEffect(() => {
        if (urlList.current)
            setFormActionAndName(urlList.current, setPostUrlData);
        else
            urlList.current = true;
    }, [urlList.current.selectedIndex]);

    return (

        <Select
            {...childProps}
            onChange={(e) => setFormActionAndName(e.target, setPostUrlData)}
            //labelId="demo-simple-select-helper-label"
            //id="demo-simple-select-helper"
            //IconComponent = {Person}
            native
            style={{ width: "60%" }}
            //variant="filled"
            margin="dense"
            inputRef={urlList}
            inputProps={{
                style: {
                    fontFamily: 'monospace',
                    height: 'auto'
                }
            }}
        //MenuProps=""
        //value=""
        //onChange={handleChange}
        //onClose={(e) => { console.log(e.target) }}
        //style={{width: "75%"}}
        >
            {PostURLs.map(x => (
                <option key={x.ID} data-name={x.Name} value={x.URL}>{x.DisplayName} | {x.URL}</option>
            ))}
        </Select>

    )
};

export default ReqUrlSelectorV1;