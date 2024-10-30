import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Input } from "../../components/Input";
import { SendIcon } from "../../icons/send-icon";
import { Comment, CommentItem } from "./CommentItem";

export const CommentsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.commentsScreenWrap}>
          <View style={styles.imageWrap}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={require("../../assets/images/comments-image.png")}
            />
          </View>

          <View style={styles.commentsWrap}>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </View>

          <Input
            placeholder="Коментувати"
            inputState={{ value: "", isValid: true }}
            onChangeText={() => {}}
            inputStyle={styles.commentInput}
            rightButton={
              <TouchableOpacity>
                <SendIcon />
              </TouchableOpacity>
            }
            rightButtonStyle={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsScreenWrap: {
    paddingTop: 32,
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
  imageWrap: {
    width: "100%",
    height: 240,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  commentsWrap: {
    gap: 24,
  },

  commentInput: {
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  sendButton: {
    transform: [{ translateY: -17 }], // 50% of send icon height
  },
});

const comments: Comment[] = [
  {
    id: 1,
    text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    date: "09 червня, 2020 | 08:40",
    avatar: require("../../assets/images/comments-avatar2.png"),
    isOwner: false,
  },
  {
    id: 2,
    text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    date: "09 червня, 2020 | 09:14",
    avatar: require("../../assets/images/comments-avatar1.png"),
    isOwner: true,
  },
  {
    id: 3,
    text: "Thank you! That was very helpful!",
    date: "09 червня, 2020 | 09:20",
    avatar: require("../../assets/images/comments-avatar2.png"),
    isOwner: false,
  },
];
