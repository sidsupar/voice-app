import { createSlice } from "@reduxjs/toolkit";
import { BlogType } from "@repo/types";
import { RootState } from "./store";

const initialState: Array<BlogType> = [];

const blogsSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        storeBlog: (state, action) => {
            state = [...state, action.payload];
        },
        deleteBlog: (state, action) => {
            state = state.filter((blog) => blog.id != action.payload);
        }
    }
});

export const { storeBlog, deleteBlog } = blogsSlice.actions;
export const blogReducer = blogsSlice.reducer;
export const setUserDetailsState = (state:RootState) => state.blogs;

