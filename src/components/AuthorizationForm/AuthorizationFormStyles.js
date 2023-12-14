import {Card, styled, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import myCustomStyled from "@emotion/styled";

export const AuthCard = styled(Card)({
    maxWidth: '425px',
    margin: '0 auto',
});

export const AuthTitle = styled(Typography)({
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

export const AccountCheckBlock = styled(Typography)({
    color: '#8c8c8c',
    textAlign: 'center',
});

export const TermsDiv = myCustomStyled.div`
    border-top: 1px solid #e8e8e8;
    margin: 10px 0 20px;
    padding-top: 20px;
`;

export const TermsDivInner = myCustomStyled.div`
    display: flex;
`;

export const InputCheckbox = myCustomStyled.input`
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0 10px 0 0;
`;

export const TermsText = myCustomStyled.p`
    margin: 0;
    font-size: 14px;
`;

export const FormError = myCustomStyled.p`
    margin: 4px 0 10px 0;
    font-size: 0.75rem;
    color: #d32f2f;
`;