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
import { Input } from "../components/Input";
import { useState } from "react";
import { InputState } from "./RegistrationScreen/RegistrationScreen.types";
import { ScreenName } from "../App.consts";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App.types";
import { loginUserInDb } from "../firebase/firebase-auth";
import { useAppDispatch } from "../store/store";
import { tryExtractErrorMessage } from "../App.utils";
import { userSliceActions } from "../store/userSlice";

export const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useAppDispatch();

  const [emailState, setEmailState] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [passwordState, setPasswordState] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    setEmailState({ value: text.trim(), isValid: true });
  };

  const handlePasswordChange = (text: string) => {
    setPasswordState({ value: text.trim(), isValid: true });
  };

  const handleLogin = async () => {
    console.log("Form values", {
      email: emailState.value,
      password: passwordState.value,
    });

    if (emailState.value === "") {
      setEmailState((prev) => ({
        ...prev,
        isValid: false,
        error: "Email не має бути порожнім",
      }));
    }

    if (passwordState.value === "") {
      setPasswordState((prev) => ({
        ...prev,
        isValid: false,
        error: "Пароль не має бути порожнім",
      }));
    }

    if (!emailState.isValid || !passwordState.isValid) {
      return;
    }

    console.log("Logging in...");

    try {
      setLoginInProgress(true);
      const user = await loginUserInDb({
        email: emailState.value,
        password: passwordState.value,
      });
      console.log("login was successful", user);

      dispatch(
        userSliceActions.setUser({
          id: user.uid,
          name: user.displayName || "no name",
          email: user.email || emailState.value,
        })
      );

      navigation.navigate(ScreenName.Posts);
    } catch (error) {
      Alert.alert(
        "Під час входу виникла помилка",
        tryExtractErrorMessage(error)
      );
    } finally {
      setLoginInProgress(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../assets/images/registration-bg.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.loginFormWrap}>
          <Text style={styles.header}>Увійти</Text>

          <View style={styles.formFields}>
            <Input
              placeholder="Адреса електронної пошти"
              inputState={emailState}
              onChangeText={handleEmailChange}
            />
            <Input
              placeholder="Пароль"
              inputState={passwordState}
              onChangeText={handlePasswordChange}
              secureTextEntry={!isPasswordVisible}
              rightButton={
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={styles.showPasswordButton}>Показати</Text>
                </TouchableOpacity>
              }
            />
          </View>

          <View style={styles.loginButtonWrap}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loginInProgress}
            >
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>

            <View style={styles.underButtonWrap}>
              <Text style={styles.underButtonText}>Немає акаунту? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenName.Registration)}
                disabled={loginInProgress}
              >
                <Text style={styles.underButtonText}>Зареєструватися</Text>
              </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  loginFormWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  header: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    letterSpacing: 0.01,
    textAlign: "center",
  },
  formFields: {
    width: "100%",
    paddingTop: 32,
    gap: 16,
  },
  showPasswordButton: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4373",
  },
  loginButtonWrap: {
    width: "100%",
    paddingTop: 43,
    paddingBottom: 78,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 16,
  },
  loginButton: {
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  loginButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "white",
  },
  underButtonWrap: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  underButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#1B4371",
    textAlign: "center",
  },
});
