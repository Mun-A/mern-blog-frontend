import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (sort) => {
  const { data } = await axios.get(`/posts${sort ? '?sortBy=popular' : ''}`);

  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");

  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);

    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение статей
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.status = "success";
        state.posts.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = "error";
        state.posts.items = [];
      })
      // Получение тегов
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
        state.tags.items = [];
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.status = "success";
        state.tags.items = action.payload;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = "error";
        state.tags.items = [];
      })
      // Удаление статьи
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
      });
  },
});

export const postsByTag = (slug) => (state) => state.posts.posts.items.filter(post => post.tags.includes(slug))

export const postsReducer = postsSlice.reducer;
