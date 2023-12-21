import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {articlesPath} from "./routePaths";

const ProtectedRoute = ({isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to={articlesPath} replace />;
    }

    return children;
}


export default ProtectedRoute;

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
