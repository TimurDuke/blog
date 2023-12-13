import React from 'react';
import {Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useGetAllArticlesQuery} from "../../services/ArticlesService";
import ArticleCard from "../../components/ArticleCard";
import {formattedDate} from "../../utils/articleUtils";
import {setPage} from "../../store/actions/articlesActions";

const Articles = () => {
    const dispatch = useDispatch();

    const { page } = useSelector(state => state.articles);

    const {data, isFetching} = useGetAllArticlesQuery(page);

    if (isFetching) {
        return <h2>Loading...</h2>
    }

    const paginationHandler = (_, selectedPage) => {
        dispatch(setPage(selectedPage));
    };

    return (
        <>
            {data.articles && data.articles.map(article => (
                <ArticleCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    description={article.description}
                    favoritesCount={article.favoritesCount}
                    author={article.author}
                    tagList={article.tagList}
                    date={formattedDate(article['createdAt'])}
                />
            ))}
            {data['articlesCount'] &&
                <Pagination
                    style={{display: 'flex', justifyContent: 'center'}}
                    count={data['articlesCount']}
                    shape="rounded"
                    color="primary"
                    onChange={paginationHandler}
                    page={page}
                />
            }
        </>
    );
};

export default Articles;
