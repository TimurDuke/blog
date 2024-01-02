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
import {logoutUser} from "../../../store/actions/userActions";
import {
    articlesPath,
    logoutPath,
    newArticlePath,
    usersArticlesPath,
    usersFavoriteArticlesPath
} from "../../../routes/routePaths";
import {useIsMobile} from "../../../hooks";

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

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
                  flexDirection: {xs: 'row'}
              }}
        >
            <Grid item gap={2} sx={{display: 'flex'}}>
                {!isMobile &&
                    <>
                        <Button
                            variant='outlined'
                            color='primary'
                            size='small'
                            component={Link}
                            to={usersArticlesPath}
                            sx={{textTransform: 'none', fontSize: '15px'}}
                        >
                            My articles
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            size='small'
                            component={Link}
                            to={usersFavoriteArticlesPath}
                            sx={{textTransform: 'none', fontSize: '15px'}}
                        >
                            My favorites
                        </Button>
                        <Button
                            variant='outlined'
                            color='success'
                            size='small'
                            component={Link}
                            to={newArticlePath}
                            sx={{textTransform: 'none', fontSize: '15px'}}
                        >
                            Create article
                        </Button>
                    </>
                }
            </Grid>
            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 20px'}}>
                <Button
                    onClick={handleOpenUserMenu}
                    sx={{marginRight: '10px', color: '#262626', fontSize: '18px'}}
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
                        {isMobile &&
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component={Link}
                                    to={usersArticlesPath}
                                    sx={{ textDecoration: 'none', color: 'primary.main' }}
                                >
                                    My articles
                                </Typography>
                            </MenuItem>
                        }
                        {isMobile &&
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component={Link}
                                    to={usersFavoriteArticlesPath}
                                    sx={{ textDecoration: 'none', color: 'error.main' }}
                                >
                                    My favorites
                                </Typography>
                            </MenuItem>
                        }
                        {isMobile &&
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component={Link}
                                    to={newArticlePath}
                                    sx={{ textDecoration: 'none', color: 'success.main' }}
                                >
                                    Create article
                                </Typography>
                            </MenuItem>
                        }
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
                sx={{fontSize: '16px'}}
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
