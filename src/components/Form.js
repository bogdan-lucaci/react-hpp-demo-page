import React, { useEffect, useMemo } from 'react';
import FORM_DATA_MODEL from '../data/FormDataModel';
import FormArea from './FormArea';

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName } }) => {

    return (
        <form
            method="post"
            action={formAction}
            name="HppPostForm"
            id="HppPostForm"
            spellCheck="false"
            autoComplete="off"
        >
            {FORM_DATA_MODEL.areas.map((area) => 
                <FormArea
                    key={area.id}
                    area={area}
                    postValues={postValues}
                    setPostValues={setPostValues}
                    postUrlName={postUrlName}
                />
            )}
        </form>
    )
};

export default Form;