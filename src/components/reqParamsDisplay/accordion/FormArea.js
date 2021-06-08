import React, { useState, useMemo, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core/';
//import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import FDM_ACCESS from '../../../data/FormDataModelAccess';
import InputParam from './InputParam';
import FormSubAreaTitle from './FormSubAreaTitle';


const useStyles = makeStyles({
    expanded: {
        '&$expanded': {
            margin: '0'
        }
    }
});

const FormArea = ({ area, transactionType, postValues, setPostValues, postUrlName }) => {
    const [isCollapsed, setIsCollapsed] = useState(FDM_ACCESS.areaIsCollapsedForPostUrlName(area.id, postUrlName));
    const classes = useStyles();

    useEffect(() => {
        setIsCollapsed(FDM_ACCESS.areaIsCollapsedForPostUrlName(area.id, postUrlName));
    }, [postUrlName]);

    return (
        <Accordion key={area.id}
            expanded={!isCollapsed}
            // TransitionProps={{ unmountOnExit: true }}
            onChange={() => setIsCollapsed(!isCollapsed)}
            classes={{expanded: classes.expanded}}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{area.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* {isCollapsed === false && */}
                <Grid container spacing={1}>
                    {FDM_ACCESS.getParamsForAreaAndType(area.id, transactionType).map((param) => {
                        return (
                            <React.Fragment key={param.name + (param.area.toString())} >
                                {/* check if a form sub-area starts and if we should display a title */}
                                {area.id === param.area && param.subArea &&
                                    <FormSubAreaTitle param={param} />
                                }
                                <Grid item xs={12} sm={6}>

                                    <InputParam
                                        id={param.name + (param.area.toString())}
                                        name={param.name}
                                        postValues={postValues}
                                        setPostValues={setPostValues}
                                        postUrlName={postUrlName}
                                        transactionType={transactionType}
                                    />

                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                {/* } */}
            </AccordionDetails>
        </Accordion>
    )
};

export default FormArea;
// export default React.memo(FormArea, (prevVal, nextVal) => {
//     // find out from which form aras belong the params that changed value from prevVal.postValues and nextVal.postValues
//     console.log();
//     return false
// });