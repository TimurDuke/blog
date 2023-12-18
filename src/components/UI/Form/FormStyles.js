import {Card, styled, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import myCustomStyled from "@emotion/styled";

export const FormCard = styled(Card)({
    maxWidth: '425px',
    margin: '0 auto',
});

export const FormTitle = styled(Typography)({
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '20px',
});

export const InputLabel = styled(Typography)({
    marginBottom: '5px',
    fontSize: '14px',
});

export const Input = styled(TextField)({
    marginBottom: '12px',
    fontSize: '16px',
});

export const SubmitButton = styled(LoadingButton)({
    marginBottom: '10px',
    backgroundColor: '#1890ff',
});

export const FormError = myCustomStyled.p`
    margin: 4px 0 10px 0;
    font-size: 0.75rem;
    color: #d32f2f;
`;
