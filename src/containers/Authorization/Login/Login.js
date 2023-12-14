import React from 'react';
import {useNavigate} from "react-router-dom";
import {fieldLoginConfig} from "../../../constants";
import AuthorizationForm from "../../../components/AuthorizationForm";
import {useLoginUserMutation} from "../../../services/UserService";

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const handleLogin = async userData => {
        const user = {
            email: userData.email,
            password: userData.password,
        };

        try {
            await loginUser({ user }).unwrap();

            navigate('/');
            // eslint-disable-next-line no-empty
        } catch (e) {}
    };
    return (
        <>
            <AuthorizationForm
                isRegister={false}
                fieldConfig={fieldLoginConfig}
                submitHandler={handleLogin}
                isLoading={isLoading}
                error={error?.data}
            />
        </>
    );
};

export default Login;