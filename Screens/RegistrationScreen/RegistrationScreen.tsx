import {
  Alert,
  Dimensions,
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
import { Input } from "../../components/Input";
import { useState } from "react";
import { InputState } from "./RegistrationScreen.types";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../App.consts";
import { RootStackNavigationProp } from "../../App.types";
import {
  registerUserInDb,
  updateUserProfile,
} from "../../firebase/firebase-auth";
import { tryExtractErrorMessage } from "../../App.utils";
import { useAppDispatch } from "../../store/store";
import { userSliceActions } from "../../store/userSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const RegistrationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useAppDispatch();
  const [loginState, setLoginState] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [emailState, setEmailState] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [passwordState, setPasswordState] = useState<InputState>({
    value: "",
    isValid: true,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [registrationInProgress, setRegistrationInProgress] =
    useState<boolean>(false);

  const handleLoginChange = (text: string) => {
    setLoginState({ value: text.trim(), isValid: true });
  };

  const handleEmailChange = (text: string) => {
    setEmailState({ value: text.trim(), isValid: true });
  };

  const handlePasswordChange = (text: string) => {
    setPasswordState({ value: text.trim(), isValid: true });
  };

  const handleRegistration = async () => {
    console.log("Form values", {
      login: loginState.value,
      email: emailState.value,
      password: passwordState.value,
    });

    if (loginState.value === "") {
      setLoginState((prev) => ({
        ...prev,
        isValid: false,
        error: "Логін не має бути порожнім",
      }));
    }

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

    if (!loginState.isValid || !emailState.isValid || !passwordState.isValid) {
      return;
    }

    console.log("Registering...");

    try {
      setRegistrationInProgress(true);
      const user = await registerUserInDb({
        email: emailState.value,
        password: passwordState.value,
      });
      console.log("registration was successful", user);

      dispatch(
        userSliceActions.setUser({
          id: user.uid,
          name: user.displayName || loginState.value,
          email: user.email || emailState.value,
        })
      );
      navigation.navigate(ScreenName.Posts);

      console.log("Updating user profile in background...");
      updateUserProfile({ displayName: loginState.value }).catch((error) => {
        console.error("Could not update user profile in background", error);
      });
    } catch (error) {
      Alert.alert(
        "Під час реєстрації виникла помилка",
        tryExtractErrorMessage(error)
      );
    } finally {
      setRegistrationInProgress(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../assets/images/registration-bg.png")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.registrationFormWrap}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../../assets/icons/add.png")}
              // resizeMode="cover"
              style={styles.avatarIconAdd}
            />
          </View>

          <Text style={styles.header}>Реєстрація</Text>

          <View style={styles.formFields}>
            <Input
              placeholder="Логін"
              inputState={loginState}
              onChangeText={handleLoginChange}
            />
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

          <View style={styles.registrationButtonWrap}>
            <TouchableOpacity
              onPress={handleRegistration}
              style={styles.registrationButton}
              disabled={registrationInProgress}
            >
              <Text style={styles.registrationButtonText}>Зареєструватися</Text>
            </TouchableOpacity>

            <View style={styles.underButtonWrap}>
              <Text style={styles.underButtonText}>Вже є акаунт? </Text>
              <TouchableOpacity
                disabled={registrationInProgress}
                onPress={() => navigation.navigate(ScreenName.Login)}
              >
                <Text style={styles.underButtonText}>Увійти</Text>
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
  registrationFormWrap: {
    backgroundColor: "white",
    alignItems: "center",
    width: SCREEN_WIDTH,
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
  registrationButtonWrap: {
    width: "100%",
    paddingTop: 43,
    paddingBottom: 78,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 16,
  },
  registrationButton: {
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  registrationButtonText: {
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
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
  },
  avatarIconAdd: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },
});
