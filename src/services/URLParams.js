import FORM_DATA_MODEL from '../data/FormDataModel';

const UrlParams = {
    getNamesArray: () => String(document.location).split('?')[1].split('&').map(paramPair => paramPair.split('=')[0].toLowerCase()),
    // OUT  :   an object containing the keys and values found inside the URL
    getObj: () => {
        const url = String(document.location);

        if (url.indexOf('?') !== -1) {
            const paramPairs = String(url.split('?')[1]).split('&');
            // add params found in url to  params obj
            return (
                paramPairs.reduce((paramObj, paramPair) => {
                    paramObj[paramPair.split('=')[0].toLowerCase()] = paramPair.split('=')[1];
                    return paramObj;
                }, {})
            );
        }
        return {};
    },    
    // OUT  :   a part of FORM_DATA_MODEL object containing key / values found in URL params
    getFormModelObjFromUrl: () => {
        const urlParams = UrlParams.getObj();

        const urlParamsObj = FORM_DATA_MODEL.params.reduce((paramsObj, param) => {
            const formModelParamFromUrl = Object.keys(urlParams).find(urlParamName =>
            urlParamName.toLowerCase() === param.name.toLowerCase()
            && param.name !== 'MerchantTransactionID'
            );
    
            if (formModelParamFromUrl)
            paramsObj[param.name] = urlParams[formModelParamFromUrl];
            return paramsObj;
        }, {});        

        return urlParamsObj;
    }
};

export default UrlParams;