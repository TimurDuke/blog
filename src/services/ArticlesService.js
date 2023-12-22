import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {ARTICLES_LIMIT_COUNT} from "../components/constants";
import {getHeaders} from "../utils/headerUtils";
import {setError} from "../store/actions/errorActions";

const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

const baseQueryWithRejection = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        api.dispatch(setError(result.error.data?.message || result.error.status));
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
        deleteArticle: build.mutation({
            query: (slug) => ({
                url: `articles/${slug}`,
                method: 'DELETE',
                headers: getHeaders()
            }),
            invalidatesTags: [{type: 'Articles', slug: 'LIST'}],
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useDeleteArticleMutation
} = articlesAPI;