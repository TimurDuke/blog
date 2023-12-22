import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {ARTICLES_LIMIT_COUNT} from "../components/constants";
import {getHeaders} from "../utils/headerUtils";
import {showNotification} from "../store/actions/notificationActions";
import {handleNotification} from "../notificationHelper";

const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

const baseQueryWithRejection = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        api.dispatch(showNotification({
            message: result.error.data?.message || `An error occurred: ${result.error.status}`,
            type: 'error'
        }));
    }
    return result;
};

export const articlesAPI = createApi({
    reducerPath: 'articlesAPI',
    baseQuery: baseQueryWithRejection,
    tagTypes: ['Articles'],
    endpoints: (build) => ({
        getAllArticles: build.query({
            query: (page = 1) => ({
                url: `articles?limit=${ARTICLES_LIMIT_COUNT}&offset=${page}`,
                headers: getHeaders()
            }),
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
    }),
});

export const {
    useGetAllArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useDeleteArticleMutation
} = articlesAPI;