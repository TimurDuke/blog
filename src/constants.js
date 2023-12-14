const usernameConfig = {
    name: 'username',
    label: 'Username',
    rules: {
        required: 'Username is required.',
        minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
        maxLength: { value: 20, message: 'Your username must be 20 characters or less.' },
        pattern: {
            value: /^\S*$/,
            message: 'Spaces are not allowed.',
        },
    },
};

const emailConfig = {
    name: 'email',
    label: 'Email address',
    type: 'email',
    rules: {
        required: 'Email is required.',
        validate: {
            containsValidCharacters: value => /^[a-zA-Z0-9._-]+@/.test(value) || 'Email contains invalid characters.',
            hasValidDomain: value => /@(mail\.ru|gmail\.com|yandex\.ru)$/.test(value) || 'Email must end with mail.ru, gmail.com, or yandex.ru.',
        }
    },
}

const passwordConfig = {
    name: 'password',
    label: 'Password',
    type: 'password',
    rules: {
        required: 'Password is required.',
        minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
        maxLength: { value: 40, message: 'Your password must be 40 characters or less.' },
        pattern: {
            value: /^\S*$/,
            message: 'Spaces are not allowed.',
        },
    },
}

const repeatPasswordConfig = {
    name: 'repeatPassword',
    label: 'Repeat Password',
    type: 'password',
    // Rules will be added later, using the watch function
}

export const fieldRegisterConfig = [
    usernameConfig,
    emailConfig,
    passwordConfig,
    repeatPasswordConfig
];

export const fieldLoginConfig = [
    emailConfig,
    passwordConfig,
];
