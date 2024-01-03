import React from 'react';
import {Box, Container, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import {articlesPath} from "../../routes/routePaths";

const WrapperBox = styled(Box)({
    padding: '20px 15px',
    background: '#fff',
    marginBottom: '20px',
    '@media (max-width:400px)': {
        padding: '10px 15px',
    },
});

const GridContainer = styled(Grid)({
   justifyContent: 'space-between',
   alignItems: 'center',
    '@media (max-width:400px)': {
        flexDirection: 'column',
    },
});

const Layout = ({children}) => {
    const user = useSelector(state => state.user.user);

    return (
        <>
            <WrapperBox>
                <GridContainer
                    container
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
                    <Grid item alignSelf={user ? 'flex-end' : 'center'}>
                        {user ? <UserMenu user={user}/> : <Anonymous/>}
                    </Grid>
                </GridContainer>
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