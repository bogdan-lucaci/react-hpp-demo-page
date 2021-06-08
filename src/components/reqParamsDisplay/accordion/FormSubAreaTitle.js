import FDM_ACCESS from '../../../data/FormDataModelAccess';
import { Divider, Grid, Typography } from '@material-ui/core';


const FormSubAreaTitle = ({ param }) => {
    let subAreaTitle = null;

    const subAreas = FDM_ACCESS.getSubAreasForArea(param.area);
    if (subAreas.length) {
        // subarea title should appear before the first input from subarea            
        const firstParamsForAreaAndSubArea = FDM_ACCESS.getParamsForAreaAndSubArea(param.area, param.subArea)[0];

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