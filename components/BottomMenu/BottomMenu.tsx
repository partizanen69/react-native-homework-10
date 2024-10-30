import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "react-native";
import { GridIcon } from "../../icons/grid-icon";
import { UserIcon } from "../../icons/user-icon";
import { PlusIcon } from "../../icons/plus-icon";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../App.consts";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const BottomMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.Home as never)}
      >
        <GridIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.CreatePosts as never)}
      >
        <PlusIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.Profile as never)}
      >
        <UserIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    height: 83,
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 9,
    gap: 31,
    backgroundColor: "#ffffff",
    width: SCREEN_WIDTH,
  },
});
