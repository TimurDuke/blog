import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { Login, Register } from './containers/Authorization';
import Articles from "./containers/Articles";
import ArticlesItem from "./components/ArticlesItem";

const App = () => (
    <Provider store={store}>
        <Routes>
            <Route path="/" element={<Navigate to="/articles" replace />}/>
            <Route path="/articles" element={<Articles/>} />
            <Route path="/articles/:slug" element={<ArticlesItem/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </Provider>
);

export default App;