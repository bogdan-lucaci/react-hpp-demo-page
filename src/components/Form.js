import SETTINGS from '../Settings';
import DATA_FORM_MODEL from '../data/DataFormModel';
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core/';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';

const getInputsForArea = (areaId) => DATA_FORM_MODEL.params.filter(param => param.area[0] === areaId);

const Form = ({ formValues, setFormValues, formTarget, setformTarget }) => {

    const hasHelper = (name) => DATA_FORM_MODEL.helpers.filter(x => x.for === name).length ? true : false;

    return (
        <form method="post" name="mainForm" id="mainForm" spellcheck="false" autocomplete="off" >
            {DATA_FORM_MODEL.areas.map((area) => {
                return (
                    <fieldset style={{ marginBottom: '.5rem', backgroundColor: grey[900], border: '2px solid ' + cyan[900], padding: '.5rem', borderRadius: '.25rem' }}>
                        <legend for={area.id} style={{ color: cyan[400], textTransform: 'uppercase', fontWeight: 'bold' }}>{area.name}</legend>

                        <Grid container spacing={1}>
                            {console.log(getInputsForArea(area.name))}
                            {getInputsForArea(area.id).map(({ name, area }) => {
                                
                                return (
                                    <>
                                        <Grid key={name + (area.toString())} item xs={12} sm={6}>

                                            <fieldset style={{ border: 'none', padding: '.25rem', borderRadius: '.25rem' }}>
                                                <legend for={name + (area.toString())} style={{ color: teal[600] }}>{name}</legend>
                                                <input
                                                    autocomplete="off"
                                                    autocomplete="new-password"
                                                    style={{
                                                        width: hasHelper(name) ? '85%' : '100%',
                                                        height: '1.5rem', border: 'none', borderRadius: '.25rem',
                                                        backgroundColor: grey[800]
                                                    }}
                                                    type="text"
                                                    id={name + (area.toString())}
                                                    name={name + (area.toString())}
                                                />
                                                {hasHelper(name) ? (
                                                    <select
                                                        style={{
                                                            width: '15%',
                                                            height: '1.5rem', border: 'none', borderRadius: '.25rem',
                                                            backgroundColor: grey[800],
                                                            borderLeft: '2px solid ' + grey[500]
                                                        }}
                                                    >
                                                        <option value="test"></option>
                                                        <option value="test">val 1</option>
                                                        <option value="test2">val 2</option>
                                                        <option value="test3">val 3</option>
                                                    </select>
                                                ) : ''}
                                            </fieldset>

                                        </Grid>
                                    </>
                                )
                            })}
                        </Grid>

                    </fieldset>
                )
            })}

        </form>
    )
};

export default Form;