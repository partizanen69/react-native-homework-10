import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const CommentItem: FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <View
      style={[
        styles.commentWrap,
        comment.isOwner && { flexDirection: "row-reverse" },
      ]}
    >
      <View style={styles.commentLeft}>
        <Image
          source={comment.avatar}
          style={{ width: 28, height: 28 }}
          resizeMode="cover"
        />
      </View>

      <View style={styles.commentRight}>
        <Text style={styles.commentText}>{comment.text}</Text>

        <Text
          style={[styles.commentDate, comment.isOwner && { textAlign: "left" }]}
        >
          {comment.date}
        </Text>
      </View>
    </View>
  );
};

export type Comment = {
  id: number;
  text: string;
  date: string;
  avatar: ReturnType<typeof require>;
  isOwner: boolean;
};

const styles = StyleSheet.create({
  commentWrap: {
    flexDirection: "row",
    gap: 16,
  },
  commentLeft: {
    flex: 0,
  },
  commentRight: {
    flex: 1,
    backgroundColor: "#00000008",
    borderRadius: 6,
    padding: 16,
    gap: 8,
  },
  commentText: {
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
    color: "#212121",
    flexWrap: "wrap",
  },
  commentDate: {
    fontFamily: "Roboto",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 11.72,
    textAlign: "right",
    color: "#BDBDBD",
  },
});
