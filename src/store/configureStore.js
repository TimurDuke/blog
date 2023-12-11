import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
})

export default store;