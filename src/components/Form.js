import DATA_FORM_MODEL from '../data/DataFormModel';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@material-ui/core/';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputParam from './InputParam';

const getInputsForArea = (areaId) => DATA_FORM_MODEL.params.filter(param => param.area[0] === areaId);

const Form = () => {

    return (
        <form method="post" name="mainForm" id="mainForm" spellCheck="false" autoComplete="off" >
            {DATA_FORM_MODEL.areas.map((area) => {
                return (
                    <Accordion key={area.id} defaultExpanded="true">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{area.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {getInputsForArea(area.id).map((param) => {
                                    return (
                                        <Grid key={param.name + (param.area.toString())} item xs={12} sm={6}>

                                            <InputParam id={param.name + (param.area.toString())} name={param.name} />

                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            })}

        </form>
    )
};

export default Form;