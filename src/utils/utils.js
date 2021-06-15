import React from 'react';

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
    // sort the values of a select
    // selElement = selector's ID ; if sortByText is FALSE we sort by the option's value else by option's text
    sortSelect: function(selElement, sortByText) {
        //let options = $('select#' + selElement + ' option');
        let options = document.getElementById(selElement).options;
        options = [...options];
        options = options.filter(o => o.dataset);
        let arr = options.map(function(o) {
            return {
                t: o.innerText,
                v: o.value,
                l: o.dataset.logourl
            };
        });
        arr.sort(function(o1, o2) {
            if (sortByText) {
                let t1 = o1.t.toLowerCase();
                let t2 = o2.t.toLowerCase();
                return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
            } else {
                return o1.v - o2.v;
            }
        });
        options.forEach(function(o, i) {
            o.value = arr[i].v;
            o.dataset.logourl = arr[i].l;
            o.innerText = arr[i].t;
        });
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
    // IN   :   an array of objects with same keys and a string representing an object's key
    // OUT  :   an array of objects sorted alphabetically by the given keyName
    sortArrayByObjKey: (arrayOfObjects, keyName) => arrayOfObjects.sort((a, b) => a[keyName].toLowerCase().localeCompare(b[keyName].toLowerCase()))
}

export default utils;