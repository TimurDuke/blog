import React from 'react';
import {Box, Container, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import {articlesPath} from "../../../routes/routePaths";

const WrapperBox = styled(Box)({
    padding: '20px 15px',
    background: '#fff',
    marginBottom: '20px'
});

const Layout = ({children}) => {
    const user = useSelector(state => state.user.user);

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
                            to={articlesPath}
                            state={{ articlesPage: 1 }}
                            sx={{textDecoration: 'none', color: '#000'}}
                            variant='h5'
                        >
                            Articles
                        </Typography>
                    </Grid>
                    <Grid item>
                        {user ? <UserMenu user={user}/> : <Anonymous/>}
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