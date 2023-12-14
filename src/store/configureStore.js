import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import userSlice from "./slices/userSlice";
import {articlesAPI} from "../services/ArticlesService";
import {userAPI} from "../services/UserService";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";

const rootReducer = combineReducers({
    articles: articlesSlice.reducer,
    user: userSlice.reducer,
    [articlesAPI.reducerPath]: articlesAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
});

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(articlesAPI.middleware)
            .concat(userAPI.middleware)
});

store.subscribe(() => {
    saveToLocalStorage({
        user: store.getState().user,
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().user.user.token;
        // eslint-disable-next-line no-empty
    } catch (e) {}

    return config;
});

export default store;