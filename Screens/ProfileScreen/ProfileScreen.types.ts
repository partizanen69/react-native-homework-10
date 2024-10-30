import { ImageSourcePropType } from "react-native";

export type Post = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  commentsCount: number;
  likesCount: number;
  location: string;
};
