import React, {useEffect} from 'react';
import {Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useGetAllArticlesQuery} from "../../services/ArticlesService";
import ArticleCard from "../../components/ArticleCard";
import {formattedDate} from "../../utils/articleUtils";
import {setPage} from "../../store/actions/articlesActions";
import {loginPath, logoutPath, registerPath} from "../../routes/routePaths";

const Articles = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { page } = useSelector(state => state.articles);
    const { user } = useSelector(state => state.user);

    const { data, isFetching, refetch} = useGetAllArticlesQuery(page);

    const fromPath = location.state?.from;

    useEffect(() => {
        const authPaths = [registerPath, loginPath, logoutPath];

        if (authPaths.includes(fromPath)) {
            // Re-fetch if user has performed some auth actions
            refetch();
        }

    }, [fromPath, refetch, user]);

    useEffect(() => {
        if (location.state?.articlesPage) {
            const { articlesPage } = location.state;

            dispatch(setPage(articlesPage));

            // Clear location state
            navigate(location.pathname, { replace: true, state: {} });
        }

    }, [dispatch, location, navigate]);

    if (isFetching) {
        return <h2>Loading...</h2>
    }

    const paginationHandler = (_, selectedPage) => {
        dispatch(setPage(selectedPage));
    };

    return (
        <>
            {data?.articles && data?.articles.map(article => (
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
            {data?.articlesCount &&
                <Pagination
                    style={{display: 'flex', justifyContent: 'center'}}
                    count={data.articlesCount}
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
