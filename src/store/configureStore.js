import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import userSlice from "./slices/userSlice";
import errorSlice from "./slices/errorSlice";
import {articlesAPI} from "../services/ArticlesService";
import {userAPI} from "../services/UserService";
import {imgBbService} from "../services/imgBbService";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
    articles: articlesSlice.reducer,
    user: userSlice.reducer,
    error: errorSlice.reducer,
    [articlesAPI.reducerPath]: articlesAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [imgBbService.reducerPath]: imgBbService.reducer,
});

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(articlesAPI.middleware)
            .concat(userAPI.middleware)
            .concat(imgBbService.middleware)
});

store.subscribe(() => {
    saveToLocalStorage({
        user: store.getState().user,
    });
});

export default store;