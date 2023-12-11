import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetAllArticlesQuery, useGetArticleQuery} from "../../services/ArticlesService";

const ArticlesItem = () => {
    const { slug } = useParams();

    const { articles } = useSelector(state => state.articles)

    const { data: allArticlesData } = useGetAllArticlesQuery(undefined, {
        skip: !articles.length
    });

    const articleFromCache = allArticlesData?.articles?.find(article => article.slug === slug);

    const { data: articleData, isLoading } = useGetArticleQuery(slug, {
        skip: !!articleFromCache,
    });

    const finalArticleData = articleFromCache ?? articleData;

    return (
        <p>
            {isLoading && <h1>Loading</h1>}
            {JSON.stringify(finalArticleData)}
        </p>
    );
}

export default ArticlesItem;