import React, { useState, useEffect } from 'react';
import FDM_ACCESS from '../../../data/FormDataModelAccess';
import FormArea from './FormArea';

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName }, transactionType }) => {

    // delete from "postValues" all params that do not belong to current transaction type
    useEffect(() => {
        const paramsToRemove = Object.keys(postValues).filter(paramName => !FDM_ACCESS.getParamsNamesForType(transactionType).includes(paramName));
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
            action={formAction}s
            name="HppPostForm"
            id="HppPostForm"
            spellCheck="false"
            autoComplete="off"
        >
            {FDM_ACCESS.getAreas()
                .filter(area => FDM_ACCESS.getParamsForAreaAndType(area.id, transactionType).length)
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