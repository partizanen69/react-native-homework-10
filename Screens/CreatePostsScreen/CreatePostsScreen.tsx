import {
  Alert,
  Image,
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
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import * as Location from "expo-location";

import { ScreenName } from "../../App.consts";
import { usePosts } from "../../store/posts";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../App.types";

export const CreatePostsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const [postTitle, setPostTitle] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");
  const { createPost } = usePosts();

  const cameraRef = useRef<CameraView | null>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        console.log(photo.uri);
        setCapturedPhoto(photo.uri); // Save photo URI to display
      }
    }
  };

  const [publishInProgress, setPublishInProgress] = useState<boolean>(false);
  const publishPost = () => {
    let location = postLocation.trim();

    if (publishInProgress) {
      return;
    }

    if (!capturedPhoto) {
      Alert.alert("Фото відстутнє", "Зробіть фото");
      return;
    }

    const defineLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Дозвіл на доступ до геолокації не надано");
        setPublishInProgress(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      location = `${loc.coords.latitude}, ${loc.coords.longitude}`;
      setPostLocation(location);
      publish();
    };

    const publish = () => {
      createPost({
        image: { uri: capturedPhoto },
        name: postTitle || "Без назви",
        location,
        commentsCount: 0,
        likesCount: 0,
      });

      setPublishInProgress(false);
      navigation.push(ScreenName.Posts);
    };

    console.log("publishing photo...");
    setPublishInProgress(true);

    if (!location) {
      Alert.alert(
        `Ви не заповнили поле "Місцевість"`,
        "Бажаєте визначати геолокацію?",
        [
          {
            text: "Так",
            onPress: () => {
              defineLocation().catch((err) => {
                console.error("Error while defining location", err);
                setPublishInProgress(false);
              });
            },
            style: "default",
          },
          {
            text: "Ні",
            onPress: () => {
              setPublishInProgress(false);
            },
            style: "cancel",
          },
        ]
      );
      return;
    }

    publish();
  };

  const clearPost = () => {
    setCapturedPhoto(null);
    setPostTitle("");
    setPostLocation("");
  };

  if (permission === null) {
    return (
      <View style={styles.permissionView}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionView}>
        <Text>Надайте дозвід на користування камерою</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Надати дозвіл</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.createPostScreenWrap}>
          <View style={styles.createPostContentWrap}>
            <View style={styles.uploadImageWrap}>
              {/* take photo block */}
              {capturedPhoto ? (
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: 240 }}
                  source={{ uri: capturedPhoto }}
                />
              ) : (
                <View style={styles.takePhotoWrap}>
                  <CameraView style={styles.camera} ref={cameraRef}>
                    <View style={styles.takePhotoBtnWrap}>
                      <TouchableOpacity
                        style={styles.takePhotoBtn}
                        onPress={takePhoto}
                      ></TouchableOpacity>
                      <PhotoCameraIcon onPress={takePhoto} />
                    </View>
                  </CameraView>
                </View>
              )}

              <View>
                <Text style={styles.text}>Завантажте фото</Text>
              </View>
            </View>

            <View style={styles.imageDetailsWrap}>
              <CreatePostInput
                placeholder="Назва..."
                value={postTitle}
                onChangeText={setPostTitle}
              />
              <CreatePostInput
                placeholder="Місцевість..."
                leftIcon={<LocationIcon />}
                value={postLocation}
                onChangeText={setPostLocation}
              />
            </View>

            <TouchableOpacity
              style={styles.createPostBtn}
              onPress={publishPost}
            >
              <Text style={styles.text}>Опублікувати</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createPostBottomPanel}>
            <TouchableOpacity style={styles.deleteBtnWrap} onPress={clearPost}>
              <TrashIcon />
            </TouchableOpacity>
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
  takePhotoWrap: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },
  takePhotoBtnWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: 60,
    height: 60,
  },
  takePhotoBtn: {
    opacity: 0.3,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  imageDetailsWrap: {
    gap: 16,
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  permissionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraControls: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  cameraControlsTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});
