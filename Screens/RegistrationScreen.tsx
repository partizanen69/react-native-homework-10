import {
  Button,
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

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLoginChange = (text: string) => {
    setLogin(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
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
        <View style={styles.registrationFormWrap}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../assets/icons/add.png")}
              // resizeMode="cover"
              style={styles.avatarIconAdd}
            />
          </View>

          <Text style={styles.header}>Реєстрація</Text>

          <View style={styles.formFields}>
            <Input
              placeholder="Логін"
              value={login}
              onChangeText={handleLoginChange}
            />
            <Input
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={handleEmailChange}
            />
            <Input
              placeholder="Пароль"
              value={password}
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
            <TouchableWithoutFeedback>
              <TouchableOpacity style={styles.registrationButton}>
                <Text style={styles.registrationButtonText}>
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>

            <View style={styles.underButtonWrap}>
              <Text style={styles.underButtonText}>Вже є акаунт? </Text>
              <TouchableOpacity>
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
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 500,
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
