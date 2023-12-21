import React, {useEffect, useState} from 'react';
import {Button, CardContent, styled} from "@mui/material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import PropTypes from "prop-types";
import SendIcon from '@mui/icons-material/Send';
import myCustomStyled from "@emotion/styled";
import {FormCardLg, FormTitle, Input, InputLabel, SubmitButton} from "../FormStyles";

const TagWrapper = myCustomStyled.div`
    display: flex;
    align-items: center;
`;

const ActionButton = styled(Button)({
    margin: '0 0 12px 12px',
    fontSize: '16px',
});

const ArticleForm = ({fieldConfig, submitHandler, isLoading}) => {
    const {
        handleSubmit ,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
            tags: [{tag: ''}]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags",
    });

    const [lastTag, setLastTag] = useState('');

    useEffect(() => {
        // Avoiding unnecessary renders
        const subscription = watch((value, { name }) => {
            if (name === `tags[${fields.length - 1}].tag`) {
                setLastTag(value[name]);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, fields.length]);

    return (
        <FormCardLg>
            <CardContent sx={{padding: '24px'}}>
                <FormTitle variant="h6">
                    Create new article
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
                                rules={rules}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder={label}
                                        fullWidth
                                        type={type || 'text'}
                                        hiddenLabel
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
                    {!!fields.length &&
                        <InputLabel>
                            Tags
                        </InputLabel>
                    }
                    {fields.map((item, index) => (
                        <TagWrapper key={item.id}>
                            <Controller
                                control={control}
                                name={`tags[${index}].tag`}
                                rules={{ maxLength: 30 }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled={index < fields.length - 1 || isLoading}
                                        sx={{width: '30%'}}
                                        type='text'
                                        hiddenLabel
                                        placeholder="Tag"
                                        error={!!errors[name]}
                                        helperText={errors[name]?.message}
                                        FormHelperTextProps={{
                                            sx: { margin: '4px 0 0' }
                                        }}
                                        size='small'
                                    />
                                )}
                            />
                            {fields.length > 1 &&
                                <ActionButton
                                    variant='outlined'
                                    color='error'
                                    onClick={() => remove(index)}
                                    sx={{textTransform: 'capitalize'}}
                                    disabled={isLoading}
                                >
                                    Delete
                                </ActionButton>
                            }
                            {index === fields.length - 1 &&
                                <ActionButton
                                    variant='outlined'
                                    color='primary'
                                    onClick={() => append({tag: ''})}
                                    sx={{textTransform: 'capitalize'}}
                                    disabled={lastTag === '' || isLoading}
                                >
                                    Add Tag
                                </ActionButton>
                            }
                        </TagWrapper>
                    ))}
                    <SubmitButton
                        fullWidth
                        size="medium"
                        loading={isLoading}
                        loadingPosition="end"
                        endIcon={<SendIcon/>}
                        variant="contained"
                        type="submit"
                    >
                        <span>Send</span>
                    </SubmitButton>
                </form>
            </CardContent>
        </FormCardLg>
    );
};

export default ArticleForm;

ArticleForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fieldConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};
