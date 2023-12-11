import {createSlice} from "@reduxjs/toolkit";
import {articlesAPI} from "../../services/ArticlesService";

const initialState = {
    articles: [],
};

const articlesSlice = createSlice({
    name: "articlesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            articlesAPI.endpoints.getAllArticles.matchFulfilled,
            (state, action) => {
                const { articles } = action.payload;
                state.articles = articles;
            },
        );
    },
});

export default articlesSlice;