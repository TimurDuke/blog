import React from 'react';
import {Link} from "react-router-dom";
import {Button, styled} from "@mui/material";

const AuthorizationButton = styled(Button)({
    textTransform: 'none',
    marginLeft: '20px',
    fontSize: '18px',
});

const Anonymous = () => (
    <>
        <AuthorizationButton
            component={Link}
            to="/login"
            color="primary"
            variant="outlined"
        >
            Sign In
        </AuthorizationButton>
        <AuthorizationButton
            component={Link}
            to="/register"
            color="success"
            variant="outlined"
        >
            Sign Up
        </AuthorizationButton>
    </>
);

export default Anonymous;