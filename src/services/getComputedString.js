import utils from '../utils/utils';

const useComputedString = (postValues, signature) => {
    const postValuesSorted = JSON.parse(utils.sortParams(postValues));
    const computedString = Object.keys(postValuesSorted).reduce((computedString, param) => {
        const computedStringWithoutSig = computedString + param.toLowerCase() + postValues[param].toLowerCase();
        // signature must be added at the end
        return (computedStringWithoutSig || '')
    }, '') + (signature || '')

    return computedString;
}

export default useComputedString;