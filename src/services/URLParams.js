import DATA_ACCESS from '../data/DataAccess';
import FDM_ACCESS from '../data/FormDataModelAccess';

const UrlParams = {
    getNamesArray: () => {
        if (window.location.href.includes('?')) {
            let allKeysValuesString = String(document.location).split('?')[1];
            return allKeysValuesString.split('&').map(paramPair => paramPair.split('=')[0].toLowerCase());
        }
        else
            return [];
    },
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
    // OUT  :   a part of FORM_DATA_MODEL object containing key / values found in URL params or an empty object
    getFormModelObjFromUrl: () => {
        const urlParams = UrlParams.getObj();

        const urlParamsObj = FDM_ACCESS.getParams().reduce((paramsObj, param) => {
            const formModelParamFromUrl = Object.keys(urlParams).find(urlParamName =>
            urlParamName.toLowerCase() === param.name.toLowerCase()
            && param.name !== 'MerchantTransactionID'
            );
    
            if (formModelParamFromUrl)
            paramsObj[param.name] = urlParams[formModelParamFromUrl];
            return paramsObj;
        }, {});        

        return urlParamsObj;
    },
    // OUT  :   a postUrlData object created from postUrlName found inside URL params (if 'env' param is found)
    // OUT  :   false boolean if no 'env' param is found (or has no value) inside URL params 
    getPostUrlObjFromUrl: () => {
        const postUrlName = UrlParams.getObj()['env'];
        if (postUrlName) {
            const postUrlObj = DATA_ACCESS.getPostURLByName(postUrlName);
            if (postUrlObj)
                return (
                    {
                        postUrlName: DATA_ACCESS.getPostURLByName(postUrlName)['Name'],
                        formAction: DATA_ACCESS.getPostURLByName(postUrlName)['URL']
                    }
                )
        } else {
            return false;
        }
    }
};

export default UrlParams;