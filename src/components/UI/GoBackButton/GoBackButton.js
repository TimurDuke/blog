import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from "prop-types";

const GoBackButton = ({disabled = false, to = -1}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(to);
    };

    return (
        <Button
            variant='outlined'
            color='primary'
            onClick={goBack}
            startIcon={<ArrowBackIcon/>}
            disabled={disabled}
            sx={{fontSize: '16px', background: '#fff', marginBottom: '10px'}}
        >
            Back
        </Button>
    );
};

export default GoBackButton;

GoBackButton.propTypes = {
    disabled: PropTypes.bool,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};
