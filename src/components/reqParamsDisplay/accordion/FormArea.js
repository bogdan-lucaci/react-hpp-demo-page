import React, { useState, useMemo, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core/';
//import { grey, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import FORM_DATA_MODEL from '../../../data/FormDataModel';
import InputParam from './InputParam';
import FormSubAreaTitle from './FormSubAreaTitle';


const getParamsForArea = (areaId) => FORM_DATA_MODEL.params.filter(param => param.area[0] === areaId);
const getParamsForAreaAndType = (areaId, transactionType) =>
    FORM_DATA_MODEL.params.filter(param =>
        param.area[0] === areaId
        && (!param.onlyFor || param.onlyFor.includes(transactionType))
    );
const areaIsCollapsedForPostUrlName = (areId, postUrlName) => FORM_DATA_MODEL.areas.filter((area) => area.collapseFor.includes(postUrlName)).map((area) => area.id).includes(areId);


const useStyles = makeStyles({
    expanded: {
        '&$expanded': {
            margin: '0'
        }
    }
});

const FormArea = ({ area, transactionType, postValues, setPostValues, postUrlName }) => {
    const [isCollapsed, setIsCollapsed] = useState(areaIsCollapsedForPostUrlName(area.id, postUrlName));
    const classes = useStyles();

    useEffect(() => {
        setIsCollapsed(areaIsCollapsedForPostUrlName(area.id, postUrlName));
    }, [postUrlName]);

    useEffect(() => {
        // delete from "postValues" all params that do not belong to current transaction type
        setPostValues(prevPostValues => {
            const updatedPostValues = { ...prevPostValues };
            getParamsForArea(area.id)
                .filter(param => param.onlyFor && !param.onlyFor.includes(transactionType))
                .forEach(param => { delete updatedPostValues[param.name] });
            return { ...updatedPostValues }
        })
    }, [transactionType]);

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
                    {getParamsForAreaAndType(area.id, transactionType).map((param) => {
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