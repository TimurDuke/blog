import {createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../../services/UserService";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userAPI.endpoints.registerUser.matchFulfilled,
                (state, {payload}) => {
                    state.user = payload.user;
                },
            )
            .addMatcher(
                userAPI.endpoints.loginUser.matchFulfilled,
                (state, {payload}) => {
                    state.user = payload.user;
                },
            )
            .addMatcher(
                userAPI.endpoints.editUser.matchFulfilled,
                (state, {payload}) => {
                    state.user = payload.user;
                },
            )
    }
});

export default userSlice;