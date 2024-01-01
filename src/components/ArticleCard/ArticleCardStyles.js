import {Box, CardContent, styled, Typography} from "@mui/material";

export const CardInnerContent = styled(CardContent)({
    display: "flex",
    justifyContent: 'space-between',
    textDecoration: 'none',
    color: '#404040',
    paddingBottom: '0',
    marginBottom: '10px',
    '@media (max-width:600px)': {
        flexDirection: 'column-reverse',
    },
});

export const CardBottomContent = styled(CardContent)({
    paddingTop: '0',
    '@media (max-width:600px)': {
        paddingBottom: '16px !important',
    },
});


export const LeftBlock = styled(Box)({
    width: '70%',
    '@media (max-width:600px)': {
        width: '100%',
    },
});

export const RightBlock = styled(Box)({
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width:600px)': {
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: '8px',
    },
});

export const ArticleTitleBlock = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: '10px',
});

export const ArticleTitle = styled(Typography)({
    marginRight: '15px',
    wordBreak: 'break-all',
});

export const ArticleDescription = styled(Typography)({
    fontSize: '14px',
    marginBottom: '10px',
    cursor: 'pointer',
});

export const TagsBlock = styled(Box)({
    display: 'flex',
    gap: '10px',
});

export const Tag = styled(Typography)({
    padding: '3px 4px',
    border: '1px solid #00000080',
    color: '#00000080',
    borderRadius: '3px',
});