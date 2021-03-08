import useAppContext from '../AppContextHook';
import { Box, ButtonGroup, Container, Select, Button } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const InputPostUrl = () => {
    const _data = useAppContext('DataContext');

    const PostURLs = _data.getPostURLs();

    return (
        <Box 
        //border={1}
        //borderColor="grey.400"            
            borderRadius={12}
            //bgcolor="text.disabled"
            //bgcolor="primary.light"
            p="1rem"
            // display="flex"
            // justifyContent="center"
            // alignItems="center"
            width="100%"

        > 
            <ButtonGroup
                size="large"
                color="primary"
                fullWidth={true}
                aria-label="large outlined primary button group"
                style={{width: "100%"}}
            >
                <Select
                    //labelId="demo-simple-select-helper-label"
                    //id="demo-simple-select-helper"
                    //IconComponent = {Person}
                    native
                    
                    style={{width: "60%"}}
                    //variant="filled"
                    margin="dense"
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
                        <option key={x.ID} value={x.URL}>{x.DisplayName} | {x.URL}</option>
                    ))}
                </Select>
                <Button
                    style={{width: "40%"}}
                    size="large"
                    variant="contained"
                    disableElevation
                    color="primary"
                    endIcon={<OpenInNewIcon color="disabled" />}
                >
                    <Box px={3}>Pay</Box>
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default InputPostUrl;
