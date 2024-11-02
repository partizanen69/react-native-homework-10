import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenName } from "./App.consts";
import { RouteProp } from "@react-navigation/native";

export type StackNavigationParamList = {
  [ScreenName.Map]: { location: string };
  [ScreenName.Comments]: undefined;
  [ScreenName.CreatePosts]: undefined;
  [ScreenName.Posts]: undefined;
  [ScreenName.Profile]: undefined;
  [ScreenName.Login]: undefined;
  [ScreenName.Registration]: undefined;
};
export type RootStackNavigationProp =
  StackNavigationProp<StackNavigationParamList>;

// MapScreen
export type MapScreenNavigationProp = StackNavigationProp<
  StackNavigationParamList,
  ScreenName.Map
>;
export type MapScreenRouteProp = RouteProp<
  StackNavigationParamList,
  ScreenName.Map
>;
// MapScreen end
