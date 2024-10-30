import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TrashIcon } from "../../icons/trash-icon";
import { PhotoCameraIcon } from "../../icons/photo-camera";
import { CreatePostInput } from "./CreatePostInput";
import { LocationIcon } from "../../icons/location-icon";

export const CreatePostsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.createPostScreenWrap}>
          <View style={styles.createPostContentWrap}>
            <View style={styles.uploadImageWrap}>
              <View style={styles.uploadImage}>
                <View style={styles.uploadImageIconWrap}>
                  <PhotoCameraIcon />
                </View>
              </View>
              <View>
                <Text style={styles.text}>Завантажте фото</Text>
              </View>
            </View>

            <View style={styles.imageDetailsWrap}>
              <CreatePostInput placeholder="Назва..." />
              <CreatePostInput
                placeholder="Місцевість..."
                leftIcon={<LocationIcon />}
              />
            </View>

            <TouchableOpacity style={styles.createPostBtn}>
              <Text style={styles.text}>Опублікувати</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createPostBottomPanel}>
            <View style={styles.deleteBtnWrap}>
              <TrashIcon />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createPostScreenWrap: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  createPostContentWrap: {
    gap: 32,
    paddingTop: 32,
  },
  createPostBtnWrap: {},
  createPostBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  createPostBottomPanel: {
    height: 83,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 9,
  },
  deleteBtnWrap: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImageWrap: {
    gap: 8,
  },
  uploadImage: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImageIconWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  imageDetailsWrap: {
    gap: 16,
  },
});
