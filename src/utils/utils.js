import React from 'react';

const utils = {
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
    renderHTML: (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } }),
    // OUT  :   a string containing a JSON sorted alphabetically (only first level)
    sortParams: obj => {
        if (Object.keys(obj).length > 0) {
            let x = JSON.stringify(obj);
            x = x.substring(1, x.length - 1).split(',').sort();
            x = JSON.parse("{" + x + "}");
            return JSON.stringify(x, null, "    ");
        }
        else
            return "{}";
    }
}

export default utils;