import { useEffect, useMemo } from 'react';
import useAppContext from '../AppContextHook';
import FDM_ACCESS from '../data/FormDataModelAccess';

const getComputedString = (postValues, signature) => {
    const postValuesSorted = JSON.parse(FDM_ACCESS.sortParamsByFormModel(postValues));
    const computedString = Object.keys(postValuesSorted)
        .filter(param => param !== 'Hash')
        .reduce((computedString, param) => {
            const computedStringWithoutSig = computedString + param.toLowerCase() + postValues[param].toLowerCase();
            // signature must be added at the end
            return (computedStringWithoutSig || '')
        }, '') + (signature || '')

    return computedString;
}

const useComputedString = (postUrlData, postValues, appHelpers, setAppHelpers) => {
    const sha256 = require('hash.js/lib/hash/sha/256');
    const DATA_ACCESS = useAppContext('DataContext');
    // get signature only when MerchantID / SiteID val changes
    const signature = useMemo(() =>
        DATA_ACCESS.getSignatureForEnvAndMerchantAndSite(postUrlData['postUrlName'], postValues['MerchantID'], postValues['SiteID']),
        [postValues['MerchantID'], postValues['SiteID']]
    );
    // get computedString only when postValues or signature changes 
    // (not when theme context changes for e.g.)
    const computedString = useMemo(() =>
        getComputedString(postValues, signature),
        [postValues, signature]
    );

    useEffect(() => {
        setAppHelpers({
            ...appHelpers,
            'Signature': signature,
            'Computed String': computedString
        });
    }, [signature, computedString]);

    // return hash based on computedString
    return sha256().update(computedString).digest('hex');
};

export default useComputedString;