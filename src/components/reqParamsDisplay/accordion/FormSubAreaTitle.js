import FORM_DATA_MODEL from '../../../data/FormDataModel';
import { Divider, Grid, Typography } from '@material-ui/core';

// const getSubAreaForAreaAndParam = (areaId, paramArea) => (
//     FORM_DATA_MODEL.areas
//         .filter(area => area.id === paramArea[0])
//         .find(subArea => subArea.id === paramArea[1])
// );
const getSubAreasForArea = (areaId) => {
    let x = FORM_DATA_MODEL.areas
        .filter(area => area.id === areaId && area.subArea && area.subArea.length)
        .map(area => area.subArea)
    return x && x.length ? x[0] : [];
};
const getParamsForAreaAndSubArea = (areaId, subAreaId) =>
    FORM_DATA_MODEL.params
        .filter(param => param.area === areaId && param.subArea && param.subArea === subAreaId);

const FormSubAreaTitle = ({ param }) => {
    let subAreaTitle = null;

    const subAreas = getSubAreasForArea(param.area);
    if (subAreas.length) {
        // subarea title should appear before the first input from subarea            
        const firstParamsForAreaAndSubArea = getParamsForAreaAndSubArea(param.area, param.subArea)[0];

        if (param.name === firstParamsForAreaAndSubArea.name)
            subAreaTitle = subAreas.find(subArea => subArea.id === param.subArea).name;
    }

    return (
        <>
            {subAreaTitle &&
                <Grid key={param.name + (param.area.toString())} item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                        {subAreaTitle}
                    </Typography>
                    <Divider />
                </Grid>
            }
        </>
    )
};

export default FormSubAreaTitle;