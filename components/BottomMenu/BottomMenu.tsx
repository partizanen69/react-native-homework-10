import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "react-native";
import { GridIcon } from "../../icons/grid-icon";
import { UserIcon } from "../../icons/user-icon";
import { PlusIcon } from "../../icons/plus-icon";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../App.consts";
import { RootStackNavigationProp } from "../../App.types";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const BottomMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenName.Posts)}>
        <GridIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.CreatePosts)}
      >
        <PlusIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenName.Profile)}>
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
