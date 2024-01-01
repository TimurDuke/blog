import React from 'react';
import {Box, Card, Skeleton} from "@mui/material";
import {
    ArticleTitleBlock, CardBottomContent,
    CardInnerContent,
    LeftBlock,
    RightBlock,
    TagsBlock
} from "../ArticleCard/ArticleCardStyles";

const SkeletonArticleCard = () => (
    <>
        <Card sx={{marginBottom: '20px'}}>
            <CardInnerContent>
                <LeftBlock>
                    <ArticleTitleBlock sx={{gap: '30px'}}>
                        <Skeleton animation='wave' width='90%' height={50}/>
                        <Skeleton animation='wave' width={50} height={50}/>
                    </ArticleTitleBlock>
                    <TagsBlock>
                        <Skeleton animation='wave' width={50} height={40}/>
                        <Skeleton animation='wave' width={50} height={40}/>
                    </TagsBlock>
                </LeftBlock>
                <RightBlock>
                    <Box>
                        <Skeleton animation='wave' width={100} height={30}/>
                        <Skeleton animation='wave' width={70} height={30}/>
                    </Box>
                    <Skeleton sx={{marginLeft: '15px'}} animation="wave" variant="circular" width={46} height={46} />
                </RightBlock>
            </CardInnerContent>
            <CardBottomContent sx={{paddingTop: '0'}}>
                <Skeleton animation='wave' width='100%' height={30}/>
            </CardBottomContent>
        </Card>
    </>
);

export default SkeletonArticleCard;