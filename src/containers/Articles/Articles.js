import React from 'react';
import {Link} from "react-router-dom";
import {useGetAllArticlesQuery} from "../../services/ArticlesService";

const Articles = () => {
    const { data, isLoading } = useGetAllArticlesQuery();

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            {data.articles && data.articles.map(articles => (
               <p key={articles.slug}>
                   <Link to={`/articles/${articles.slug}`}>
                       {articles.slug}
                   </Link>
               </p>
            ))}
        </div>
    );
};

export default Articles;
