import DATA_FORM_MODEL from '../data/DataFormModel';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@material-ui/core/';
import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputParam from './InputParam';
import { useState, useEffect } from 'react';

const getInputsForArea = (areaId) => DATA_FORM_MODEL.params.filter(param => param.area[0] === areaId);

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName } }) => {
    const [collapsedAreas, setCollapsedAreas] = useState([]);

    const handleChange = (areaId) => (e, isExpanded) => {
        setCollapsedAreas(isExpanded
            ? collapsedAreas.filter(x => x !== areaId)
            : collapsedAreas.concat([areaId])
        );
    };

    useEffect(() => {
        // on InputPostUrl change get which areas should be collapsed
        setCollapsedAreas(
            DATA_FORM_MODEL.areas
                .filter((area) => area.collapseFor.includes(postUrlName))
                .map((area) => area.id)
        );
    }, [postUrlName]);

    return (
        <form
            method="post"
            action={formAction}
            name="HppPostForm"
            id="HppPostForm"
            spellCheck="false"
            autoComplete="off"
        >
            {DATA_FORM_MODEL.areas.map((area) => (
                    <Accordion key={area.id}
                        expanded={!collapsedAreas.includes(area.id)}
                        onChange={handleChange(area.id)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{area.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1}>
                                {getInputsForArea(area.id).map((param) => {
                                    return (
                                        <Grid key={param.name + (param.area.toString())} item xs={12} sm={6}>

                                            <InputParam
                                                id={param.name + (param.area.toString())}
                                                name={param.name}
                                                postValues={postValues}
                                                setPostValues={setPostValues}
                                                postUrlName={postUrlName}
                                            />

                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            )}
        </form>
    )
};

export default Form;