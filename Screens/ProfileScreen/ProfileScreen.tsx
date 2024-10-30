import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Post } from "./ProfileScreen.types";
import { PostItem } from "./PostItem";
import { CrossIcon } from "../../icons/cross-icon";
import { LogoutIcon } from "../../icons/logout-icon";
import { BottomMenu } from "../../components/BottomMenu/BottomMenu";
import { ScreenName } from "../../App.consts";
import { posts } from "../../fixtures/posts";
import { useNavigation } from "@react-navigation/native";
import { LogoutBtn } from "../../components/LogoutBtn/LogoutBtn";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../../assets/images/registration-bg.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <View style={styles.profileWrap}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../../assets/images/profile-avatar.png")}
              resizeMode="cover"
              style={styles.avatar}
            />
            <View style={styles.avatarIconCross}>
              <CrossIcon />
            </View>
          </View>

          <LogoutBtn />

          <View>
            <Text style={styles.profileName}>Natali Romanova</Text>
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
    alignItems: "center",
  },
  scrollViewContent: {
    paddingTop: StatusBar.currentHeight ?? 0 + 120,
    paddingBottom: 100,
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  profileWrap: {
    backgroundColor: "white",
    alignItems: "center",
    width: SCREEN_WIDTH,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 22,
    paddingHorizontal: 16,
    minHeight: "50%",
    gap: 32,
  },
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
  },
  avatarIconCross: {
    position: "absolute",
    right: -18,
    bottom: 14,
  },
  avatar: {},

  profileName: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    lineHeight: 35.16,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
  },
  postsWrap: {
    gap: 32,
    width: "100%",
  },
});
