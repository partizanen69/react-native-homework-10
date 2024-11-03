import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BottomMenu } from "../../components/BottomMenu/BottomMenu";
import { PostItem } from "../ProfileScreen/PostItem";
import { FC, useEffect, useState } from "react";
import { selectPosts } from "../../store/postSelectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPosts } from "../../firebase/firestore";
import { postSliceActions } from "../../store/postSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const PostsScreen: FC = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(posts.length === 0);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts().then((posts) => {
        console.log("posts", posts);
        dispatch(postSliceActions.setPosts(posts));
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.postsScreenWrap}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Image source={require("../../assets/images/avatar.png")} />
            </View>
            <View style={styles.userText}>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>Natalia@gmail.com</Text>
            </View>
          </View>

          <View style={styles.postsWrap}>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 100,
    position: "relative",
  },
  postsScreenWrap: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    backgroundColor: "white",
    alignItems: "center",
    gap: 32,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
    paddingTop: 32,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userText: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15.23,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
    color: "#212121CC",
  },
  postsWrap: {
    width: "100%",
    gap: 32,
  },
});
