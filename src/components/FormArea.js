import React, { useState, useMemo, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core/';
//import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FORM_DATA_MODEL from '../data/FormDataModel';
import InputParam from './InputParam';
import FormSubAreaTitle from './FormSubAreaTitle';

const getInputsForArea = (areaId) => FORM_DATA_MODEL.params.filter(param => param.area[0] === areaId);
const areaIsCollapsedForPostUrlName = (areId, postUrlName) => FORM_DATA_MODEL.areas.filter((area) => area.collapseFor.includes(postUrlName)).map((area) => area.id).includes(areId);

const FormArea = ({ area, postValues, setPostValues, appState, setAppState, postUrlName }) => {
    const [isCollapsed, setIsCollapsed] = useState(areaIsCollapsedForPostUrlName(area.id, postUrlName));

    useEffect(() => {
        setIsCollapsed(areaIsCollapsedForPostUrlName(area.id, postUrlName));
    }, [postUrlName]);

    return (
        <Accordion key={area.id}
            expanded={!isCollapsed}
            onChange={() => setIsCollapsed(!isCollapsed)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{area.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* {isCollapsed === false &&
                    <> */}
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
                    {/* </>
                } */}
            </AccordionDetails>
        </Accordion>
    )
};

export default FormArea;
// export default React.memo(FormArea, (prevVal, nextVal) => {
//     console.log();
// });