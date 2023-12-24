import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Avatar, Box, Button, Card, CardContent, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    CardInnerContent,
    LeftBlock,
    RightBlock,
    ArticleTitleBlock,
    TagsBlock,
    Tag,
} from "./ArticleCardStyles";
import PromptModal from "../UI/ConfirmPopover";

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
        isDetails = false,
        deleteArticle = () => {},
    }
) => {
    const { user } = useSelector(state => state.user);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (didConfirm) => {
        if (didConfirm) {
            deleteArticle();
        }
        setAnchorEl(null);
    };

    const showActionButton = () => isDetails && author['username'] === user?.username;

    const showArticleBody = () => isDetails && !!body.length;

    return (
        <Card style={{marginBottom: !body.length ? '20px' : '0' }}>
            <CardInnerContent>
                <LeftBlock>
                    <ArticleTitleBlock>
                        <Typography
                            variant="h5"
                            color="primary"
                            style={{marginRight: '15px', textDecoration: 'none'}}
                            component={!isDetails ? Link : Typography}
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
            <CardContent sx={{paddingTop: '0'}}>
                <Box sx={{display: isDetails ? 'flex' : 'block', justifyContent: 'space-between'}}>
                    <Typography
                        style={{
                            fontSize: '14px',
                            color: isDetails ? '#00000080' : '#000',
                            marginBottom: '10px',
                            width: isDetails ? '70%' : '100%',
                        }}
                    >
                        {description}
                    </Typography>
                    {showActionButton() &&
                        <Box>
                            <Button
                                variant='outlined'
                                color='error'
                                size='small'
                                sx={{fontSize: '14px'}}
                                onClick={handleClick}
                            >
                                Delete
                            </Button>
                            <Button
                                variant='outlined'
                                color='success'
                                sx={{marginLeft: '15px', fontSize: '14px'}}
                                size='small'
                                component={Link}
                                to={`/articles/${slug}/edit`}
                            >
                                Edit
                            </Button>
                            <PromptModal
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                title='Are you sure to delete this article?'
                            />
                        </Box>
                    }
                </Box>
                {showArticleBody() &&
                    <div>
                        {body}
                    </div>
                }
            </CardContent>
        </Card>
    );
}

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
    isDetails: PropTypes.bool,
    deleteArticle: PropTypes.func,
};
