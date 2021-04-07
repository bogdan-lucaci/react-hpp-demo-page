import React, { useState, useEffect } from 'react';
import FORM_DATA_MODEL from '../../../data/FormDataModel';
import FormArea from './FormArea';

const getParamsForArea = (areaId) => FORM_DATA_MODEL.params.filter(param => param.area === areaId);
const getParamsForAreaAndType = (areaId, transactionType) =>
    FORM_DATA_MODEL.params.filter(param =>
        param.area === areaId
        && (!param.onlyFor || param.onlyFor.includes(transactionType))
    );
const getParamsForType = (transactionType) => FORM_DATA_MODEL.params.filter(param => !param.onlyFor || param.onlyFor.includes(transactionType));
const getParamsNamesForType = (transactionType) => FORM_DATA_MODEL.params.filter(param => !param.onlyFor || param.onlyFor.includes(transactionType)).map(param => param.name);

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName }, transactionType }) => {

    // delete from "postValues" all params that do not belong to current transaction type
    useEffect(() => {
        const paramsToRemove = Object.keys(postValues).filter(paramName => !getParamsNamesForType(transactionType).includes(paramName));
        if (paramsToRemove.length) {
            setPostValues(prevPostValues => {
                const updatedPostValues = { ...prevPostValues };
                paramsToRemove.forEach(paramName => { delete updatedPostValues[paramName] })
                return { ...updatedPostValues }
            });
        }
    }, [postValues, transactionType]);

    return (
        <form
            method="post"
            action={formAction}
            name="HppPostForm"
            id="HppPostForm"
            spellCheck="false"
            autoComplete="off"
        >
            {FORM_DATA_MODEL.areas
                .filter(area => getParamsForAreaAndType(area.id, transactionType).length)
                .map(area =>
                    <FormArea
                        key={area.id}
                        area={area}
                        postValues={postValues}
                        setPostValues={setPostValues}
                        postUrlName={postUrlName}
                        transactionType={transactionType}
                    />
                )}
        </form>
    )
};

export default Form;