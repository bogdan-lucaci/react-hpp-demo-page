import { Box, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Table, TableContainer } from '@material-ui/core/';
import ParamsPickerList from './ParamsPickerList';
import ParamsPickerSelected from './ParamsPickerSelected';
import { makeStyles } from '@material-ui/core/styles'
import X from '../../../_learning-examples/centerItemsMUI';

const useStyles = makeStyles((theme) => ({
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.primary.main,
        border: '1px solid red'
    },
  }));

const ParamsPicker = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName }, transactionType }) => {
    const classes = useStyles();
    return (
        <Paper>
            <Box p={2}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item xs={5}>
                        {/* <Paper> */}
                            <ParamsPickerList 
                                postValues={postValues}
                                transactionType={transactionType}
                            />
                        {/* </Paper> */}
                        {/* <Divider orientation="vertical" classes={{root: classes.divider}} /> */}
                    </Grid>
                    <Grid item xs={7}>

                        <Paper >
                            <ParamsPickerSelected
                                postValues={postValues} 
                            />
                        </Paper>

                    </Grid>
                </Grid>

            </Box>
        </Paper>
    )
}

export default ParamsPicker;