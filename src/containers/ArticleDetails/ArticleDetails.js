import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetArticleQuery} from "../../services/ArticlesService";
import ArticleCard from "../../components/ArticleCard";
import {createFormattedParagraphs, formattedDate} from "../../utils/articleUtils";

const ArticleDetails = () => {
    const { slug } = useParams();

    const { articles } = useSelector(state => state.articles)

    const articleFromCache = articles?.find(article => article.slug === slug);

    const { data: articleData, isLoading } = useGetArticleQuery(slug, {
        skip: !!articleFromCache,
    });

    const finalArticleData = articleFromCache ?? articleData?.article;

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return finalArticleData && (
        <ArticleCard
            slug={finalArticleData?.slug}
            title={finalArticleData?.title}
            description={finalArticleData?.description}
            favoritesCount={finalArticleData?.favoritesCount}
            tagList={finalArticleData?.tagList}
            date={formattedDate(finalArticleData['createdAt'])}
            author={finalArticleData?.author}
            body={createFormattedParagraphs(finalArticleData?.body)}
        />
    );
};

export default ArticleDetails;