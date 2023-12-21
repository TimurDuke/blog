export const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
};

export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return undefined;
    }
};

export const getToken = () => {
    try {
        const user = JSON.parse(localStorage.getItem('state'));

        return user?.user?.user?.token;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return undefined;
    }
};
