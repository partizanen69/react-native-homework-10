import { RootState } from "./store";
import { Post } from "./postSlice";

export const selectPosts = (state: RootState): Post[] => state.posts.posts;
