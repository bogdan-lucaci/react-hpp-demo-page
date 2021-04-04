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
        .filter(param => param.area[0] === areaId && param.area[1] && param.area[1] === subAreaId);

const FormSubAreaTitle = ({ param }) => {
    let subAreaTitle = null;
    const areaId = param.area[0];
    const subAreaId = param.area[1];

    const subAreas = getSubAreasForArea(areaId);
    if (subAreas.length) {
        // subarea title should appear before the first input from subarea            
        const firstParamsForAreaAndSubArea = getParamsForAreaAndSubArea(areaId, subAreaId)[0];

        if (param.name === firstParamsForAreaAndSubArea.name)
            subAreaTitle = subAreas.find(subArea => subArea.id === subAreaId).name;
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