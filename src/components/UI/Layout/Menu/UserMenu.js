import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import {logoutUser} from "../../../../store/actions/userActions";
import {articlesPath, logoutPath} from "../../../../routes/routePaths";

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutUserHandler = () => {
        dispatch(logoutUser());
        navigate(articlesPath, { state: { from: logoutPath } });
    };

    return (
        <Grid container alignItems='center' justifyContent='center'
              sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: {xs: 'column', sm: 'row'}
              }}
        >
            <Button
                variant='outlined'
                color='success'
                size='small'
                component={Link}
                to='/new-article'
                sx={{textTransform: 'none', color: '#52C41A', borderColor: '#52C41A', fontSize: '15px'}}
            >
                Create article
            </Button>
            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 20px'}}>
                <Button
                    onClick={handleOpenUserMenu}
                    sx={{marginRight: '10px', color: '#262626', textTransform: 'capitalize', fontSize: '18px'}}
                >
                    {user.username}
                </Button>
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Edit profile">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt={user.username} src={user.image}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography
                                textAlign="center"
                                component={Link}
                                to='/user/edit-profile'
                                sx={{ textDecoration: 'none', color: '#000' }}
                            >
                                Edit profile
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Button
                variant='outlined'
                color='inherit'
                size='medium'
                onClick={logoutUserHandler}
                sx={{textTransform: 'capitalize', fontSize: '16px'}}
            >
                Log out
            </Button>
        </Grid>
    );
};

export default UserMenu;

UserMenu.propTypes = {
    user: PropTypes.object.isRequired,
}
