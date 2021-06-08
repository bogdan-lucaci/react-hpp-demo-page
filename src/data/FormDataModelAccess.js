import FORM_DATA_MODEL from './FormDataModel.js';

const FDM_ACCESS = {
    // OUT  :   array of areas objects   
    getAreas: () => FORM_DATA_MODEL.areas,
    // IN   :   int representing an area ID and a string representing the POST URL Name
    // OUT  :   bool stating if the area is initially expanded or not for the give POST URL name
    areaIsCollapsedForPostUrlName: (areId, postUrlName) =>
        FORM_DATA_MODEL.areas
            .filter((area) => area.collapseFor.includes(postUrlName))
            .map((area) => area.id).includes(areId)
    ,
    // IN   :   int representing an area ID
    // OUT  :   string representing area's name
    getAreaNameById: areaId => 
        FORM_DATA_MODEL.areas
            .filter(area => area.id === areaId).map(area => area.name)
    ,
    // IN   :   int representing the area's id
    // OUT  :   array of subAreas objects
    // [ { "id": <int>, "name": <string> }, ... etc ]
    getSubAreasForArea: areaId => {
        let x = FORM_DATA_MODEL.areas
            .filter(area => area.id === areaId && area.subArea && area.subArea.length)
            .map(area => area.subArea)
        return x && x.length ? x[0] : [];
    },
    //// const getSubAreaForAreaAndParam = (areaId, paramArea) => (
    ////     FORM_DATA_MODEL.areas
    ////         .filter(area => area.id === paramArea[0])
    ////         .find(subArea => subArea.id === paramArea[1])
    //// );

    // OUT  :   array of params objects
    getParams: () => FORM_DATA_MODEL.params,
    // OUT  :   array of parameters objects
    // [ {"label":"...", "value":"..."}, {...}, ... etc ]
    getParamsForArea: areaId => 
        FORM_DATA_MODEL.params
            .filter(param => param.area === areaId)
    ,
    // IN   :   int representing area ID and an int representing the subArea's ID
    // OUT  :   array of parameters objects
    // [ "paramName1", "paramName2", ... etc ]        
    getParamsForAreaAndSubArea: (areaId, subAreaId) =>
        FORM_DATA_MODEL.params
            .filter(param => param.area === areaId && param.subArea && param.subArea === subAreaId)
    ,    
    // OUT  :   array of parameters objects
    // [ {"label":"...", "value":"..."}, {...}, ... etc ]
    getParamsForType: transactionType => 
        FORM_DATA_MODEL.params
            .filter(param => !param.onlyFor || param.onlyFor.includes(transactionType))
    ,
    // IN   :   int representing an area ID and a string representing the transaction type
    // OUT  :   array of parameters objects
    // [ "paramName1", "paramName2", ... etc ]    
    getParamsForAreaAndType: (areaId, transactionType) =>
        FORM_DATA_MODEL.params.filter(param =>
            param.area === areaId
            && (!param.onlyFor || param.onlyFor.includes(transactionType))
        )
    ,
    // IN   :   string representing the transaction type
    // OUT  :   array of parameters names
    // [ "paramName1", "paramName2", ... etc ]
    getParamsNamesForType: transactionType => 
        FORM_DATA_MODEL.params
            .filter(param => !param.onlyFor || param.onlyFor.includes(transactionType))
            .map(param => param.name)
    ,    
    // IN   :   string representing the parameter's name
    // OUT  :   string representing parameter's tooltip
    getParamTooltipByName: name => 
        FORM_DATA_MODEL.params
            .find(param => param.name === name).tooltip || ''
    ,
    // IN   :   string representing the parameter's name
    // OUT  :   bool stating if the parameter has a helper or not
    paramHasHelper: name => 
        FORM_DATA_MODEL.helpers
            .find(param => param.for === name) !== undefined
    ,
    // OUT  :   a string containing a JSON with keys sorted in the same order as params are described inside FORM_DATA_MODEL
    sortParamsByFormModel: (obj) => {
        let sortedObj = {};
        if (Object.keys(obj).length > 0) {
            FORM_DATA_MODEL.params.forEach(paramFromDataModel => {
                const x = Object.keys(obj).find(paramName => paramName === paramFromDataModel.name);
                if (x) sortedObj[x] = obj[x];
            });
        }
        return JSON.stringify(sortedObj);
    }
};

export default FDM_ACCESS;