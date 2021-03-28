import React from 'react';
import FORM_DATA_MODEL from '../data/FormDataModel';

const utils = {
    // OUT  :   true if the objects are shallow equal
    objectsAreEqual: (object1, object2) => {
        if (!object1)
            if (object2)
                return false;


        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    },
    getUrlParamsNamesArray: () => String(document.location).split('?')[1].split('&').map(paramPair => paramPair.split('=')[0].toLowerCase()),
    // OUT  :   an object containing the keys and values found inside the URL
    getUrlParamsObj: () => {
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
    renderHTML: (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } }),
    // OUT  :   HTML markup that displays a JSON
    getJsonColoredMarkup: (jsonString, { keyColor, valColor }) => {
        let json = JSON.parse(jsonString);
        return (
            <>
                {"{"}
                {Object.keys(json).map(param => (
                    <div key={param}>
                        &nbsp;&nbsp;&nbsp;<span style={{ color: keyColor }}>{param}</span> : <span style={{ color: valColor }}>{json[param]}</span>
                    </div>
                ))}
                {"}"}
            </>
        )
    },    
    // OUT  :   a string containing a JSON with keys sorted alphabetically (only first level)
    sortParamsByName: obj => {
        if (Object.keys(obj).length > 0) {
            let x = JSON.stringify(obj);
            x = x.substring(1, x.length - 1).split(',').sort();
            x = JSON.parse('{' + x + '}');
            return JSON.stringify(x, null, '    ');
        }
        else
            return '{}';
    },
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
}

export default utils;