import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BottomMenu } from "../../components/BottomMenu/BottomMenu";
import { PostItem } from "../ProfileScreen/PostItem";
import { posts } from "../../fixtures/posts";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const PostsScreen = () => {
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
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15.23,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 12.89,
    color: "#212121CC",
  },
  postsWrap: {
    width: "100%",
    gap: 32,
  },
});