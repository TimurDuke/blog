import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    articleDetailPath,
    articlesPath,
    editProfilePath,
    loginPath,
    newArticlePath,
    registerPath
} from "./routePaths";
import Articles from "../containers/Articles";
import ArticleDetails from "../containers/ArticleDetails";
import {Login, Register} from "../containers/Authorization";
import EditProfile from "../containers/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import CreateArticle from "../containers/CreateArticle";

const AppRoutes = () => {
    const user = useSelector(state => state.user.user);

    return (
        <Routes>
            <Route path="/" element={<Navigate to={articlesPath} replace/>}/>
            <Route path={articlesPath} element={<Articles/>}/>
            <Route path={articleDetailPath} element={<ArticleDetails/>}/>
            <Route
                path={loginPath}
                element={
                    <ProtectedRoute isAllowed={!user}>
                        <Login/>
                    </ProtectedRoute>
                }
            />
            <Route
                path={registerPath}
                element={
                    <ProtectedRoute isAllowed={!user}>
                        <Register/>
                    </ProtectedRoute>
                }
            />
            <Route
                path={editProfilePath}
                element={
                    <ProtectedRoute isAllowed={!!user}>
                        <EditProfile/>
                    </ProtectedRoute>
                }
            />
            <Route
                path={newArticlePath}
                element={
                    <ProtectedRoute isAllowed={!!user}>
                        <CreateArticle/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
