import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { Login, Register } from './containers/Authorization';
import Articles from "./containers/Articles";
import Layout from "./components/UI/Layout";
import ArticleDetails from "./components/ArticleDetails";

const App = () => (
    <Provider store={store}>
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/articles" replace />}/>
                <Route path="/articles" element={<Articles/>} />
                <Route path="/articles/:slug" element={<ArticleDetails/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Layout>
    </Provider>
);

export default App;