import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from "prop-types";

const GoBackButton = ({disabled = false}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
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
};
