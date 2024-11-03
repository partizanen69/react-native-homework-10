import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

const initialPosts: Post[] = [
  {
    id: 1,
    image: require("../assets/images/post-1.png"),
    name: "Ліс",
    commentsCount: 8,
    likesCount: 153,
    location: "50.4972293, 30.2422488",
  },
  {
    id: 2,
    image: require("../assets/images/post-2.png"),
    name: "Захід на Чорному морі",
    commentsCount: 3,
    likesCount: 200,
    location: "50.4972293, 30.2422488",
  },
  {
    id: 3,
    image: require("../assets/images/post-3.png"),
    name: "Старий будинок у Венеції",
    commentsCount: 50,
    likesCount: 200,
    location: "50.4972293, 30.2422488",
  },
].reverse();

interface PostsState {
  posts: Post[];
}

export interface NewPost {
  image: ImageSourcePropType;
  name: string;
  commentsCount: number;
  likesCount: number;
  location: string;
}

export interface Post extends NewPost {
  id: number;
}

const initialState: PostsState = {
  posts: initialPosts,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createNewPost: (state, { payload: post }: PayloadAction<NewPost>) => {
      const newPost: Post = {
        id: state.posts.length + 1,
        ...post,
      };

      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    },
  },
});

export const { createNewPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
