import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to="/" replace />;
    }

    return children;
}


export default ProtectedRoute;

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
