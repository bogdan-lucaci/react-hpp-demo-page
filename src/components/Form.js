import React, { useState, useEffect } from 'react';
import FORM_DATA_MODEL from '../data/FormDataModel';
import FormTransactionTypeSelector from './FormTransactionTypeSelector';
import FormArea from './FormArea';

const getParamsForArea = (areaId) => FORM_DATA_MODEL.params.filter(param => param.area[0] === areaId);
const getParamsForAreaAndType = (areaId, transactionType) =>
    FORM_DATA_MODEL.params.filter(param =>
        param.area[0] === areaId
        && (!param.onlyFor || param.onlyFor.includes(transactionType))
    );

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName } }) => {
    const [transactionType, setTransactionType] = useState('payment');

    useEffect(() => {
        // delete from "postValues" all params that do not belong to current transaction type
        FORM_DATA_MODEL.areas.forEach(area => {
            const areaHasInputs = getParamsForAreaAndType(area.id, transactionType).length;
            if (!areaHasInputs) {
                setPostValues(prevPostValues => {
                    const updatedPostValues = { ...prevPostValues };
                    getParamsForArea(area.id).forEach(param => { delete updatedPostValues[param.name] })
                    return { ...updatedPostValues }
                })
            }
        });
    }, [transactionType]);

    return (
        <>
            <FormTransactionTypeSelector
                setTransactionType={setTransactionType}
            />
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
        </>
    )
};

export default Form;