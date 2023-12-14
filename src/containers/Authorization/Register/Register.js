import React from 'react';
import {useNavigate} from "react-router-dom";
import AuthorizationForm from "../../../components/AuthorizationForm";
import {fieldRegisterConfig} from "../../../constants";
import {useRegisterUserMutation} from "../../../services/UserService";

const Register = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleRegister = async userData => {
        const user = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
        };

        await registerUser({user}).unwrap();
        navigate('/');
    };

    return (
        <>
            <AuthorizationForm
                isRegister
                submitHandler={handleRegister}
                fieldConfig={fieldRegisterConfig}
                isLoading={isLoading}
                error={error?.data}
            />
        </>
    );
};

export default Register;