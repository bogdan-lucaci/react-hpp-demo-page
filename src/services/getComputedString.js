import utils from '../utils/utils';

const getComputedString = (postValues, signature) => {
    const postValuesSorted = JSON.parse(utils.sortParams(postValues));
    const computedString = Object.keys(postValuesSorted)
        .filter(param => param !== 'Hash')
        .reduce((computedString, param) => {
            const computedStringWithoutSig = computedString + param.toLowerCase() + postValues[param].toLowerCase();
            // signature must be added at the end
            return (computedStringWithoutSig || '')
        }, '') + (signature || '')

    return computedString;
}

export default getComputedString;