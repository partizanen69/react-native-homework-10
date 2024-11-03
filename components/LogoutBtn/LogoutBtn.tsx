import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenName } from "../../App.consts";
import { LogoutIcon } from "../../icons/logout-icon";
import { RootStackNavigationProp } from "../../App.types";
import { useAppDispatch } from "../../store/store";
import { userSliceActions } from "../../store/userSlice";
import { getCurrentUser, signOutUser } from "../../firebase/firebase-auth";
import { useState } from "react";
import { tryExtractErrorMessage } from "../../App.utils";

export const LogoutBtn = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useAppDispatch();
  const [isLogoutInProgress, setIsLogoutInProgress] = useState<boolean>(false);

  const handleLogout = async () => {
    const user = getCurrentUser();
    if (!user) {
      console.error("No user. Check the logic");
      return;
    }

    setIsLogoutInProgress(true);
    try {
      await signOutUser();
      dispatch(userSliceActions.clearUser());
      navigation.navigate(ScreenName.Login);
    } catch (error) {
      Alert.alert(
        "Виникла помилка під час виходу",
        tryExtractErrorMessage(error)
      );
    } finally {
      setIsLogoutInProgress(false);
    }
  };

  return (
    <TouchableOpacity
      disabled={isLogoutInProgress}
      style={styles.avatarIconLogout}
      onPress={handleLogout}
    >
      <LogoutIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarIconLogout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
