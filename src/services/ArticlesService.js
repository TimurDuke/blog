import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {ARTICLES_LIMIT_COUNT} from "../components/constants";

export const articlesAPI = createApi({
    reducerPath: 'articlesAPI',
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    tagTypes: ['Articles'],
    endpoints: (build) => ({
        getAllArticles: build.query({
            query: (page = 1) => ({
                url: `articles?limit=${ARTICLES_LIMIT_COUNT}&offset=${page}`
            }),
            providesTags: (result) =>
                result.articles
                    ? [
                        ...result.articles.map(({slug}) => ({type: 'Articles', slug})),
                        { type: 'Articles', slug: 'LIST' },
                      ]
                    : [{ type: 'Articles', slug: 'LIST' }],
        }),
        getArticle: build.query({
            query: (slug) => ({
                url: `articles/${slug}`
            }),
        }),
    }),
});

export const {useGetAllArticlesQuery, useGetArticleQuery} = articlesAPI;