import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScreenName } from "../../App.consts";
import { LogoutIcon } from "../../icons/logout-icon";
import { RootStackNavigationProp } from "../../App.types";

export const LogoutBtn = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <TouchableOpacity
      style={styles.avatarIconLogout}
      onPress={() => navigation.navigate(ScreenName.Login)}
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
