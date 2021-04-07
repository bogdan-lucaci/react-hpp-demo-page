import { Box, Grid, IconButton, Input, InputLabel, List, ListItem, ListItemText, Paper, Table, TableContainer, Typography } from '@material-ui/core/';
import useAppContext from '../../../AppContextHook';
import ParamsPicker from './ParamsPickerList';


const ParamsPickerSelected = ({ postValues }) => {

    const handleChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <Typography variant="caption">
        <Box width={1} padding={2}>
        {/* <pre> */}
            {'{'}<br />
            {Object.keys(postValues).map(param => {
                return (
                    <Box ml={2}>
                        <Grid container>
                            <Grid item xs={5}>
                                {param}
                            </Grid>
                            {/* <InputLabel htmlFor={param}>{param}</InputLabel> */}
                            <Grid item xs={7}>
                                <Input multiline margin="dense" id={param} value={postValues[param] || ''} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Box>
                )
            })}
            {'}'}
        {/* </pre> */}
        </Box>
        </Typography>
    )
}

export default ParamsPickerSelected;