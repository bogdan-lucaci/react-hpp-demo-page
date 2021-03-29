import React, { useMemo } from 'react';
import FORM_DATA_MODEL from '../data/FormDataModel';
import FormArea from './FormArea';

const Form = ({ postValues, setPostValues, postUrlData: { formAction, postUrlName }, appHelpers, setAppHelpers }) => {

    return (
        <form
            method="post"
            action={formAction}
            name="HppPostForm"
            id="HppPostForm"
            spellCheck="false"
            autoComplete="off"
        >
            {FORM_DATA_MODEL.areas.map((area) => {

                return (
                    <FormArea
                        area={area}
                        postValues={postValues}
                        setPostValues={setPostValues}
                        appHelpers={appHelpers}
                        setAppHelpers={setAppHelpers}
                        postUrlName={postUrlName}
                    />
                )
            })}
        </form>
    )
};

export default Form;