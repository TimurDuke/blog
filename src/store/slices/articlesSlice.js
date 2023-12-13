import {createSlice} from "@reduxjs/toolkit";
import {articlesAPI} from "../../services/ArticlesService";

const initialState = {
    articles: [],
    page: 1,
};

const articlesSlice = createSlice({
    name: "articlesSlice",
    initialState,
    reducers: {
        setPage(state, {payload: selectedPage}) {
            state.page = selectedPage;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            articlesAPI.endpoints.getAllArticles.matchFulfilled,
            (state, action) => {
                const { articles } = action.payload;
                state.articles = articles
            },
        );
    },
});

export default articlesSlice;