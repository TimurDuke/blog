import {getToken} from "../store/localStorage";

export const getHeaders = () => {
    const token = getToken();

    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Token ${token}` } : {}),
    };
};