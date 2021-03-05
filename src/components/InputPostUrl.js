import { useContext } from 'react';
import { Select } from '@material-ui/core';
import { DataContext } from '../App';

const InputPostUrl = () => {
    const _data = useContext(DataContext);
    
    console.log(_data.getPostURLs());

    const PostURLs = _data.getPostURLs();

    return (
        <Select
            //labelId="demo-simple-select-helper-label"
            //id="demo-simple-select-helper"
            //IconComponent = {Person}
            native
            variant="outlined"
            margin="dense"
            inputProps={{
                style: {
                    fontFamily: 'monospace',
                    height: 'auto'
                }
            }}
            //MenuProps=""
            value=""
            //onChange={handleChange}
            onClose={(e) => { console.log(e.target) }}

        >
            {PostURLs.map(x => (
                <option aria-label="" value="{x.URL}">{x.Name} | {x.URL}</option>
            ))}
        </Select>
    )
}

export default InputPostUrl;
