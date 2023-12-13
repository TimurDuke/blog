import React from 'react';
import PropTypes from "prop-types";
import {Avatar, Box, Card, CardContent, styled, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from "react-router-dom";

const CardInnerContent = styled(CardContent)({
    display: "flex",
    justifyContent: 'space-between',
    textDecoration: 'none',
    color: '#404040',
});

const LeftBlock = styled(Box)({
    width: '70%'
});

const RightBlock = styled(Box)({
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
});

const ArticleTitleBlock = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: '10px',
});

const TagsBlock = styled(Box)({
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
});

const Tag = styled(Typography)({
    padding: '3px 4px',
    border: '1px solid #404040',
    borderRadius: '3px',
});

const ArticleCard = (
    {
        slug,
        title,
        description,
        favoritesCount,
        author,
        tagList,
        date,
        body = [],
    }
) => (
    <Card style={{marginBottom: !body.length ? '20px' : '0' }}>
        <CardInnerContent>
            <LeftBlock>
                <ArticleTitleBlock>
                    <Typography
                        variant="h5"
                        color="primary"
                        style={{marginRight: '15px', textDecoration: 'none'}}
                        component={Link}
                        to={`/articles/${slug}`}
                    >
                        {title}
                    </Typography>
                    <Box style={{display: "flex"}}>
                        <FavoriteBorderIcon
                            color="action"
                            style={{marginRight: '3px', cursor: 'pointer'}}
                        />
                        <Typography>
                            {favoritesCount}
                        </Typography>
                    </Box>
                </ArticleTitleBlock>
                <TagsBlock>
                    {!!tagList?.length && tagList.map(tagName => (
                        <Tag key={tagName}>
                            {tagName}
                        </Tag>
                    ))}
                </TagsBlock>
                <Typography style={{fontSize: '14px'}}>
                    {description}
                </Typography>
            </LeftBlock>
            <RightBlock>
                <Box>
                    <Typography variant='h6'>
                        {author['username']}
                    </Typography>
                    <Typography fontSize="small" style={{color: '#808080'}}>
                        {date}
                    </Typography>
                </Box>
                <Avatar
                    alt="Remy Sharp"
                    src={author['image']}
                    sx={{width: 46, height: 46}}
                    style={{marginLeft: '15px'}}
                />
            </RightBlock>
        </CardInnerContent>
        {!!body.length &&
            <CardContent>
                {body}
            </CardContent>
        }
    </Card>
);

export default ArticleCard;

ArticleCard.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.object.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
};
