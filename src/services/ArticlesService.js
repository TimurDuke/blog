import {createApi} from "@reduxjs/toolkit/query/react";
import {ARTICLES_LIMIT_COUNT} from "../components/constants";
import {getHeaders} from "../utils/headerUtils";
import {handleNotification} from "../notificationHelper";
import {baseQueryWithRejection} from "../utils/baseQueryWithRejection";

export const articlesAPI = createApi({
    reducerPath: 'articlesAPI',
    baseQuery: baseQueryWithRejection,
    tagTypes: ['Articles'],
    endpoints: (build) => ({
        getAllArticles: build.query({
            query: (page = 1) => {
                const requestPage = page === 1 ? 0 : (page * ARTICLES_LIMIT_COUNT) - ARTICLES_LIMIT_COUNT;

                return {
                    url: `articles?limit=${ARTICLES_LIMIT_COUNT}&offset=${requestPage}`,
                    headers: getHeaders()
                }
            },
            keepUnusedDataFor: 5,
            providesTags: (result) => result?.articles
                ? [
                    ...result?.articles.map(({slug}) => ({type: 'Articles', slug})),
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'The article has been successfully created!',
                    'success'
                );
            },
        }),
        updateArticle: build.mutation({
            query: (payload) =>
            {
                const { slug, article } = payload;

                return {
                    url: `articles/${slug}`,
                    method: 'PUT',
                    body: {article},
                    headers: getHeaders()
                }
            },
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'The article has been successfully updated!',
                    'success'
                );
            },
        }),
        deleteArticle: build.mutation({
            query: (slug) => ({
                url: `articles/${slug}`,
                method: 'DELETE',
                headers: getHeaders()
            }),
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'The article has been successfully deleted!',
                    'success'
                );
            },
        }),
        addFavoriteArticle: build.mutation({
            query: (slug) => ({
                url: `articles/${slug}/favorite`,
                method: 'POST',
                headers: getHeaders()
            }),
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'The article has been successfully added to favorites!',
                    'success'
                );
            },
        }),
        deleteFavoriteArticle: build.mutation({
            query: (slug) => ({
                url: `articles/${slug}/favorite`,
                method: 'DELETE',
                headers: getHeaders()
            }),
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'The article has been successfully removed from favorites!',
                    'success'
                );
            },
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useAddFavoriteArticleMutation,
    useDeleteFavoriteArticleMutation,
} = articlesAPI;