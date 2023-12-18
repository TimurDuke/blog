import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Articles from "../containers/Articles";
import ArticleDetails from "../components/ArticleDetails";
import {Login, Register} from "../containers/Authorization";
import EditProfile from "../containers/EditProfile";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    const user = useSelector(state => state.user.user);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/articles" replace/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/articles/:slug" element={<ArticleDetails/>}/>
            <Route
                path="/login"
                element={
                    <ProtectedRoute isAllowed={!user}>
                        <Login/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <ProtectedRoute isAllowed={!user}>
                        <Register/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/edit_profile"
                element={
                    <ProtectedRoute isAllowed={!!user}>
                        <EditProfile/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
