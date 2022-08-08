import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import { PostType } from '../../models';
import { RootState } from '../store';

type PostsStateType = {
  posts: {
    items: PostType[];
    status: string;
  },
  tags: {
    items: string[];
    status: string;
  }
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (sort: string) => {
  const { data } = await axios.get(`/posts${sort ? '?sortBy=popular' : ''}`);

  return data as PostType[];
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");

  return data as string[];
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string) => {
    const { data } = await axios.delete(`/posts/${id}`);

    return data as PostType;
  }
);

const initialState: PostsStateType = {
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

export const postsByTag = (slug: string) => (state: RootState) => state.posts.posts.items.filter(post => post.tags.includes(slug))

export const postsReducer = postsSlice.reducer;
