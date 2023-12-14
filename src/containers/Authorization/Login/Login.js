import React from 'react';
import {fieldLoginConfig} from "../../../constants";
import AuthorizationForm from "../../../components/AuthorizationForm";

const Login = () => {
    console.log('Login')
    return (
        <>
            <AuthorizationForm
                isRegister={false}
                fieldConfig={fieldLoginConfig}
            />
        </>
    );
};

export default Login;