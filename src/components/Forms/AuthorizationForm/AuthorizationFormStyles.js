import {styled, Typography} from "@mui/material";
import myCustomStyled from "@emotion/styled";

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
