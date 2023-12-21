import {Box, CardContent, styled, Typography} from "@mui/material";

export const CardInnerContent = styled(CardContent)({
    display: "flex",
    justifyContent: 'space-between',
    textDecoration: 'none',
    color: '#404040',
});

export const LeftBlock = styled(Box)({
    width: '70%'
});

export const RightBlock = styled(Box)({
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
});

export const ArticleTitleBlock = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: '10px',
});

export const TagsBlock = styled(Box)({
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
});

export const Tag = styled(Typography)({
    padding: '3px 4px',
    border: '1px solid #404040',
    borderRadius: '3px',
});