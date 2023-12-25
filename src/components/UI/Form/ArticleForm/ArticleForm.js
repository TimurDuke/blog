import React, {useEffect, useState} from 'react';
import {Button, CardContent, styled} from "@mui/material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
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

const ArticleForm = ({
    fieldConfig = [],
    submitHandler,
    isLoading,
    mode = 'create',
    initialValues,
}) => {
    const {
        handleSubmit ,
        control,
        watch,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: initialValues || {
            ...fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
            tags: [{ tag: '' }]
        }
    });

    const [lastTag, setLastTag] = useState('');

    const notificationError = useSelector(state => state.notification.error);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tags",
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);

            if (initialValues.tags && initialValues.tags.length > 0) {
                setLastTag(initialValues.tags[initialValues.tags.length - 1].tag);
            } else {
                setLastTag('');
            }
        }
    }, [initialValues, reset]);

    useEffect(() => {
        // Avoiding unnecessary renders
        const subscription = watch((value, { name }) => {
            if (name === `tags[${fields.length - 1}].tag`) {
                setLastTag(value[name]);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, fields.length]);

    const formSubmitHandler = data => {
        const tagsArray = data.tags
            .map(tagObj => tagObj.tag)
            .filter(tag => tag.trim() !== '')

        const article = {
            ...data,
            tagList: tagsArray
        };

        delete article.tags;

        submitHandler(article);
    };

    return (
        <FormCardLg>
            <CardContent sx={{padding: '24px'}}>
                <FormTitle variant="h6">
                    {mode === 'create' ? 'Create new article' : 'Update article'}
                </FormTitle>
                <form onSubmit={handleSubmit(formSubmitHandler)}>
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
                                        error={!!errors[name] || !!notificationError[name]}
                                        multiline={name === 'body'}
                                        rows={12}
                                        helperText={errors[name]?.message || notificationError[name]}
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
                        sx={{width: '30%'}}
                    >
                        <span>{mode === 'create' ? 'Send' : 'Update'}</span>
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
    initialValues: PropTypes.object,
    mode: PropTypes.string,
};
