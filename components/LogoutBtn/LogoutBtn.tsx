import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScreenName } from "../../App.consts";
import { LogoutIcon } from "../../icons/logout-icon";

export const LogoutBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.avatarIconLogout}
      onPress={() => navigation.navigate(ScreenName.Login as never)}
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
