import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Post } from "./ProfileScreen.types";
import { FC } from "react";
import { MessageIcon } from "../../icons/message-icon";
import { ThumbIcon } from "../../icons/thumb-icon";
import { LocationIcon } from "../../icons/location-icon";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../App.consts";
import { RootStackNavigationProp } from "../../App.types";

export const PostItem: FC<{ post: Post }> = ({ post }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.postWrap}>
      <Image source={post.image} resizeMode="cover" style={styles.postImage} />
      <Text style={styles.postName}>{post.name}</Text>
      <View style={styles.postInfoWrap}>
        <View style={styles.postInfoLeft}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenName.Comments)}
          >
            <View style={styles.commentCount}>
              <MessageIcon />
              <Text style={styles.commentCountText}>{post.commentsCount}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.likesCount}>
            <ThumbIcon />
            <Text style={styles.likesCountText}>{post.likesCount}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.location}
          onPress={() =>
            navigation.navigate(ScreenName.Map, {
              location: post.location,
            })
          }
        >
          <LocationIcon />
          <Text style={styles.locationText}>{post.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrap: {
    gap: 8,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
    color: "#212121",
  },
  postInfoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentCount: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  commentCountText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
  },
  likesCount: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  likesCountText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
  },
  postInfoLeft: {
    flexDirection: "row",
    gap: 24,
  },
  location: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 4,
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
