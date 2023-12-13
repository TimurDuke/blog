import React from 'react';
import {Box, Button, Container, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const AuthorizationButton = styled(Button)({
    textTransform: 'none',
    marginLeft: '20px',
    fontSize: '18px',
});

const WrapperBox = styled(Box)({
    padding: '20px 15px',
    background: '#fff',
    marginBottom: '20px'
});

const Layout = ({children}) => {
    console.log('Layout')
    return (
        <>
            <WrapperBox>
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Grid item>
                        <Typography
                            component={Link}
                            to='/'
                            sx={{textDecoration: 'none', color: '#000'}}
                            variant='h5'
                        >
                            Articles
                        </Typography>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </WrapperBox>
            <Container maxWidth="lg" style={{paddingBottom: '15px', height: '100%'}}>
                {children}
            </Container>
        </>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}