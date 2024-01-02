import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    useAddFavoriteArticleMutation,
    useDeleteArticleMutation, useDeleteFavoriteArticleMutation,
    useGetArticleQuery
} from "../../services/ArticlesService";
import ArticleCard from "../../components/ArticleCard";
import {createFormattedParagraphs, formattedDate} from "../../utils/articleUtils";
import GoBackButton from "../../components/UI/GoBackButton";
import {articlesPath} from "../../routes/routePaths";
import SkeletonArticleCard from "../../components/SkeletonArticleCard";
import {clearError} from "../../store/actions/notificationActions";

const ArticleDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [finalArticleData, setFinalArticleData] = useState();

    const error = useSelector(state => state.notification.error);
    const { articles } = useSelector(state => state.articles);

    useEffect(() => {
        if (!!Object.keys(error).length) {
            navigate(articlesPath);
            dispatch(clearError());
        }
    }, [dispatch, error, navigate]);

    const articleFromCache = articles?.find(article => article.slug === slug);

    const { data: articleData, isLoading: isArticleLoading } = useGetArticleQuery(slug, {
        skip: !!articleFromCache,
    });

    const [deleteArticle, { isLoading: isDeleteLoading }] = useDeleteArticleMutation();

    const [addFavorite, {data: favoriteArticleData, isLoading: addFavoriteLoading}] = useAddFavoriteArticleMutation();
    const [deleteFavorite, {data: unFavoriteArticleData, isLoading: deleteFavoriteLoading}] = useDeleteFavoriteArticleMutation();

    useEffect(() => {
        setFinalArticleData(articleFromCache ?? articleData?.article)
    }, [articleFromCache, articleData]);

    useEffect(() => {
        if (favoriteArticleData?.article && finalArticleData !== favoriteArticleData?.article) {
            setFinalArticleData(favoriteArticleData.article);
        }
        if (unFavoriteArticleData?.article && finalArticleData !== unFavoriteArticleData?.article) {
            setFinalArticleData(unFavoriteArticleData.article);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteArticleData, unFavoriteArticleData]);

    useEffect(() => {
        const { state } = location;

        if (state?.updatedArticle) {
            setFinalArticleData(state?.updatedArticle);
        }
    }, [location]);

    const isLoading =
        isArticleLoading ||
        isDeleteLoading ||
        addFavoriteLoading ||
        deleteFavoriteLoading;

    const deleteArticleHandler = async () => {
        try {
            await deleteArticle(slug).unwrap();
            navigate(articlesPath);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    };

    const addFavoriteHandler = async slugText => {
        try {
            if (slugText) {
                await addFavorite(slugText).unwrap();
            }
            // eslint-disable-next-line no-empty
        } catch (e) {}
    };

    const deleteFavoriteHandler = async slugText => {
        try {
            if (slugText) {
                await deleteFavorite(slugText).unwrap();
            }
            // eslint-disable-next-line no-empty
        } catch (e) {}
    };

    return (
        <>
            {finalArticleData && <GoBackButton to='/articles' disabled={isLoading}/>}
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
                        addFavorite={addFavoriteHandler}
                        deleteFavorite={deleteFavoriteHandler}
                    />
                </>
            }
        </>
    );
};

export default ArticleDetails;