import React from 'react';
import AuthorizationForm from "../../../components/AuthorizationForm";
import {fieldRegisterConfig} from "../../../constants";

const Register = () => {
    console.log('register')
    return (
        <>
            <AuthorizationForm
                isRegister
                fieldConfig={fieldRegisterConfig}
            />
        </>
    );
};

export default Register;