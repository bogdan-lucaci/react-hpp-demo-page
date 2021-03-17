import React from 'react';
import FORM_DATA_MODEL from '../data/FormDataModel';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core/';
//import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputParam from './InputParam';
import FormSubAreaTitle from './FormSubAreaTitle';
import { useState, useEffect } from 'react';

const getInputsForArea = (areaId) => FORM_DATA_MODEL.params.filter(param => param.area[0] === areaId);


const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName }, appState, setAppState }) => {
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
            FORM_DATA_MODEL.areas
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
            {FORM_DATA_MODEL.areas.map((area) => (
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
                                    <React.Fragment key={param.name + (param.area.toString())} >
                                        {/* check if a form sub-area starts and if we should display a title */}
                                        {area.id === param.area[0] && param.area[1] &&
                                            <FormSubAreaTitle param={param} />
                                        }
                                        <Grid item xs={12} sm={6}>

                                            <InputParam
                                                id={param.name + (param.area.toString())}
                                                name={param.name}
                                                isPaymentParam={param.isPaymentParam}
                                                postValues={postValues}
                                                setPostValues={setPostValues}
                                                postUrlName={postUrlName}
                                                appState={appState}
                                                setAppState={setAppState}
                                            />

                                        </Grid>
                                    </React.Fragment>
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