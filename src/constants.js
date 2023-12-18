const usernameConfig = {
    name: 'username',
    label: 'Username',
    rules: {
        required: 'Username is required.',
        minLength: {value: 3, message: 'Your username needs to be at least 3 characters.'},
        maxLength: {value: 20, message: 'Your username must be 20 characters or less.'},
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

const passwordConfig = (name, label) => {
    let rules = {
        minLength: {value: 6, message: 'Your password needs to be at least 6 characters.'},
        maxLength: {value: 40, message: 'Your password must be 40 characters or less.'},
    };

    if (label !== 'New Password') {
        rules = {
            ...rules,
            required: 'Password is required.',
            pattern: {
                value: /^\S*$/,
                message: 'Spaces are not allowed.',
            }
        };
    }

    return {
        name,
        label,
        type: 'password',
        rules,
    };
};

const imageConfig = {
    name: 'image',
    label: 'Avatar image',
    type: 'file',
};

export const fieldRegisterConfig = [
    usernameConfig,
    emailConfig,
    passwordConfig('password', 'Password'),
    passwordConfig('repeatPassword', 'Repeat Password'),
];

export const fieldLoginConfig = [
    emailConfig,
    passwordConfig('password', 'Password'),
];

export const fieldEditProfileConfig = [
    usernameConfig,
    emailConfig,
    passwordConfig('password', 'New Password'),
    imageConfig,
];
