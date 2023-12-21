import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {ARTICLES_LIMIT_COUNT} from "../components/constants";
import {getHeaders} from "../utils/headerUtils";

export const articlesAPI = createApi({
    reducerPath: 'articlesAPI',
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    tagTypes: ['Articles'],
    endpoints: (build) => ({
        getAllArticles: build.query({
            query: (page = 1) => ({
                url: `articles?limit=${ARTICLES_LIMIT_COUNT}&offset=${page}`,
                headers: getHeaders()
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) => result.articles
                ? [
                    ...result.articles.map(({slug}) => ({type: 'Articles', slug})),
                    {type: 'Articles', slug: 'LIST'},
                ]
                : [{type: 'Articles', slug: 'LIST'}],
        }),
        getArticle: build.query({
            query: (slug) => ({
                url: `articles/${slug}`,
                headers: getHeaders()
            }),
        }),
        createArticle: build.mutation({
            query: (body) => ({
                url: 'articles',
                method: 'POST',
                body,
                headers: getHeaders()
            }),
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
        }),
    }),
});

export const {useGetAllArticlesQuery, useGetArticleQuery, useCreateArticleMutation} = articlesAPI;