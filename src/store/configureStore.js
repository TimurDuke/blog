import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {articlesAPI} from "../services/ArticlesService";
import articlesSlice from "./slices/articlesSlice";

const rootReducer = combineReducers({
    articles: articlesSlice.reducer,
    [articlesAPI.reducerPath]: articlesAPI.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articlesAPI.middleware)
})

export default store;