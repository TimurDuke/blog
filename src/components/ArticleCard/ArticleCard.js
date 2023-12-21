import React from 'react';
import PropTypes from "prop-types";
import {Avatar, Box, Card, CardContent, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from "react-router-dom";
import {
    CardInnerContent,
    LeftBlock,
    RightBlock,
    ArticleTitleBlock,
    TagsBlock,
    Tag,
} from "./ArticleCardStyles";

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
                        <FavoriteIcon
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
