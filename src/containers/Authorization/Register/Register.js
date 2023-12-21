import React from 'react';
import {useNavigate} from "react-router-dom";
import AuthorizationForm from "../../../components/UI/Form/AuthorizationForm";
import {fieldRegisterConfig} from "../../../utils/inputRuleUtils";
import {useRegisterUserMutation} from "../../../services/UserService";
import {articlesPath, registerPath} from "../../../routes/routePaths";

const Register = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const handleRegister = async userData => {
        const user = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
        };

        try {
            await registerUser({user}).unwrap();
            navigate(articlesPath, { state: { from: registerPath } });

            // eslint-disable-next-line no-empty
        } catch (e) {}
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