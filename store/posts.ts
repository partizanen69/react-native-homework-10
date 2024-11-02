import { useState } from "react";
import { Post } from "../Screens/ProfileScreen/ProfileScreen.types";

export const postsStore: Post[] = [
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

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(postsStore);

  const createPost = (post: Omit<Post, "id">): Post => {
    const newPost: Post = {
      id: posts.length + 1,
      ...post,
    };

    postsStore.unshift(newPost);
    setPosts([...postsStore]);

    return newPost;
  };

  return { posts, createPost };
};
