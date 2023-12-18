export const getRepeatPasswordRules = (watch) => ({
    required: 'Repeat Password is required.',
    validate: value => value === watch('password') || 'Passwords must match',
});