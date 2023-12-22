import React from 'react';
import Button from '@mui/material/Button';
import {Box, Popover, Typography} from "@mui/material";
import PropTypes from "prop-types";

const ConfirmPopover = ({title, open, onClose, anchorEl}) => (
    <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => onClose(false)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        <Box p={2}>
            <Typography sx={{marginBottom: '10px'}}>{title}</Typography>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    onClick={() => onClose(false)}
                    variant='outlined'
                    color="primary"
                    size='small'
                >
                    No
                </Button>
                <Button
                    onClick={() => onClose(true)}
                    variant='outlined'
                    color="error"
                    size='small'
                    sx={{marginLeft: '15px'}}
                >
                    Yes
                </Button>
            </Box>
        </Box>
    </Popover>
);

export default ConfirmPopover;

ConfirmPopover.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
};
