import { Post } from "../Screens/ProfileScreen/ProfileScreen.types";

export const posts: Post[] = [
  {
    id: 1,
    image: require("../assets/images/post-1.png"),
    name: "Ліс",
    commentsCount: 8,
    likesCount: 153,
    location: "Ukraine",
  },
  {
    id: 2,
    image: require("../assets/images/post-2.png"),
    name: "Захід на Чорному морі",
    commentsCount: 3,
    likesCount: 200,
    location: "Ukraine",
  },
  {
    id: 3,
    image: require("../assets/images/post-3.png"),
    name: "Старий будинок у Венеції",
    commentsCount: 50,
    likesCount: 200,
    location: "Italy",
  },
];
