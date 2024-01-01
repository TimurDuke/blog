import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDeleteArticleMutation, useGetArticleQuery} from "../../services/ArticlesService";
import ArticleCard from "../../components/ArticleCard";
import {createFormattedParagraphs, formattedDate} from "../../utils/articleUtils";
import GoBackButton from "../../components/UI/GoBackButton";
import {articlesPath} from "../../routes/routePaths";
import SkeletonArticleCard from "../../components/SkeletonArticleCard";

const ArticleDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { articles } = useSelector(state => state.articles)

    const articleFromCache = articles?.find(article => article.slug === slug);

    const { data: articleData, isLoading: isArticleLoading } = useGetArticleQuery(slug, {
        skip: !!articleFromCache,
    });

    const [deleteArticle, { isLoading: isDeleteLoading }] = useDeleteArticleMutation();

    const finalArticleData = articleFromCache ?? articleData?.article;

    const isLoading = isArticleLoading || isDeleteLoading;

    const deleteArticleHandler = async () => {
        try {
            await deleteArticle(slug).unwrap();
            navigate(articlesPath);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    };

    return (
        <>
            {finalArticleData && <GoBackButton disabled={isLoading}/>}
            {isLoading && <SkeletonArticleCard/>}
            {finalArticleData && !isLoading &&
                <>
                    <ArticleCard
                        isDetails
                        deleteArticle={deleteArticleHandler}
                        slug={finalArticleData?.slug}
                        title={finalArticleData?.title}
                        description={finalArticleData?.description}
                        favoritesCount={finalArticleData?.favoritesCount}
                        isFavorite={finalArticleData?.favorited}
                        tagList={finalArticleData?.tagList}
                        date={formattedDate(finalArticleData['createdAt'])}
                        author={finalArticleData?.author}
                        body={createFormattedParagraphs(finalArticleData?.body)}
                    />
                </>
            }
        </>
    );
};

export default ArticleDetails;