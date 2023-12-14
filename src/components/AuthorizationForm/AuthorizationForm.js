import React from 'react';
import {CardContent} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import {Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import PropTypes from "prop-types";
import {
    AuthCard,
    AuthTitle,
    InputLabel,
    Input,
    SubmitButton,
    AccountCheckBlock,
    TermsDiv,
    TermsDivInner,
    InputCheckbox,
    TermsText,
    TermsError,
} from './AuthorizationFormStyles';
import {getRepeatPasswordRules} from "../../utils/authUtils";

const AuthorizationForm = ({isRegister, fieldConfig}) => {

    const {
        register,
        handleSubmit ,
        control,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            ...fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
            isAgree: false,
        }
    });

    if (isRegister) {
        fieldConfig.find(field => field.name === 'repeatPassword').rules = getRepeatPasswordRules(watch);
    }

    const submitHandler = data => {
        console.log(data);
    };

    return (
        <AuthCard>
            <CardContent sx={{padding: '24px'}}>
                <AuthTitle variant="h5">
                    {isRegister ? 'Create new account' : 'Sign In'}
                </AuthTitle>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {fieldConfig.map(({ name, label, rules, type }) => (
                        <label key={name} htmlFor={name}>
                            <InputLabel>
                                {label}
                            </InputLabel>
                            <Controller
                                name={name}
                                control={control}
                                rules={rules}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder={label}
                                        fullWidth
                                        type={type || 'text'}
                                        hiddenLabel
                                        id={name}
                                        error={!!errors[name]}
                                        helperText={errors[name]?.message}
                                        FormHelperTextProps={{
                                            sx: { margin: '4px 0 0' }
                                        }}
                                        size='small'
                                    />
                                )}
                            />
                        </label>
                    ))}
                    {isRegister &&
                        <TermsDiv>
                            <TermsDivInner>
                                <InputCheckbox
                                    {
                                        ...register(
                                            "isAgree",
                                            {required: "You must agree to the terms and conditions."}
                                        )
                                    }
                                    type="checkbox"
                                />
                                <TermsText>
                                    I agree to the processing of my personal
                                    information
                                </TermsText>
                            </TermsDivInner>
                            {errors.isAgree && <TermsError>{errors.isAgree.message}</TermsError>}
                        </TermsDiv>
                    }
                    <SubmitButton
                        fullWidth
                        size="medium"
                        loading={false}
                        loadingPosition="end"
                        variant="contained"
                        endIcon={isRegister ? <AppRegistrationIcon/> : <LoginIcon/>}
                        type="submit"
                    >
                        <span>{isRegister ? 'Create' : 'Login'}</span>
                    </SubmitButton>
                    <AccountCheckBlock fontSize="14px">
                        {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
                        {isRegister ?
                            <Link to='/login' style={{color: '#1890ff', textDecoration: 'none', marginLeft: '6px'}}>
                                Sign In
                            </Link> :
                            <Link to='/register' style={{color: '#1890ff', textDecoration: 'none', marginLeft: '6px'}}>
                                Sign Up
                            </Link>
                        }
                    </AccountCheckBlock>
                </form>
            </CardContent>
        </AuthCard>
    );
}

export default AuthorizationForm;

AuthorizationForm.propTypes = {
    isRegister: PropTypes.bool.isRequired,
    fieldConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};
