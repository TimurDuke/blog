import React from 'react';
import {Controller, useForm} from "react-hook-form";
import PropTypes from "prop-types";
import {CardContent} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useSelector} from "react-redux";
import {
    FormCardSm,
    FormTitle,
    Input,
    InputLabel,
    SubmitButton
} from "../FormStyles";
import FileInput from "../FileInput/FileInput";

const EditProfileForm = ({fieldConfig, submitHandler, isLoading}) => {
    const user = useSelector(state => state.user.user);
    const {
        handleSubmit ,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {password: ''}
    });

    const validateImageFile = (file) => {
        if (file.type) {
            return file.type.startsWith('image/') || 'Only images are allowed';
        }
    };

    return (
        <FormCardSm>
            <CardContent>
                <FormTitle variant="h5">
                    Edit Profile
                </FormTitle>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {fieldConfig.map(({ name, label, rules, type }) => (
                        <label key={name} htmlFor={name}>
                            <InputLabel>
                                {label}
                            </InputLabel>
                            <Controller
                                name={name}
                                control={control}
                                rules={name === 'image' ? { ...rules, validate: validateImageFile } : rules}
                                defaultValue={user[name]}
                                render={({ field }) => {
                                    if (name === 'image') {
                                        return (
                                            <FileInput
                                                field={field}
                                                name={name}
                                                placeholder={label}
                                                error={errors[name]?.message}
                                                isLoading={isLoading}
                                                initialFileName={user[name]}
                                            />
                                        )
                                    }

                                    return (
                                        <Input
                                            {...field}
                                            placeholder={label}
                                            fullWidth
                                            type={type || 'text'}
                                            hiddenLabel
                                            disabled={isLoading}
                                            error={!!errors[name]}
                                            helperText={errors[name]?.message}
                                            FormHelperTextProps={{
                                                sx: { margin: '4px 0 0' }
                                            }}
                                            size='small'
                                        />
                                    )
                                }}
                            />
                        </label>
                    ))}
                    <SubmitButton
                        fullWidth
                        size="medium"
                        loading={isLoading}
                        loadingPosition="end"
                        endIcon={<DoneIcon/>}
                        variant="contained"
                        type="submit"
                    >
                        <span>Save</span>
                    </SubmitButton>
                </form>
            </CardContent>
        </FormCardSm>
    );
};

export default EditProfileForm;

EditProfileForm.propTypes = {
    fieldConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

