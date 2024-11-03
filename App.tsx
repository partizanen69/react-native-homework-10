import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen/CreatePostsScreen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenName } from "./App.consts";
import { BackIcon } from "./icons/back-arrow-icon";
import { LogoutBtn } from "./components/LogoutBtn/LogoutBtn";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />; // Показуй індикатор завантаження
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName={ScreenName.Registration}>
          <MainStack.Screen
            name={ScreenName.Registration}
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={ScreenName.Login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={ScreenName.Posts}
            component={PostsScreen}
            options={{
              title: "Публікації",
              headerTitleStyle: styles.headerTitle,
              headerBackTitleVisible: false,
              headerBackImage: () => <></>,
              headerLeftContainerStyle: {
                paddingLeft: 16,
              },
              headerRightContainerStyle: {
                paddingRight: 16,
              },
              headerRight: () => <LogoutBtn />,
            }}
          />
          <MainStack.Screen
            name={ScreenName.CreatePosts}
            component={CreatePostsScreen}
            options={{
              title: "Створити публікацію",
              headerTitleStyle: styles.headerTitle,
              headerBackTitleVisible: false,
              headerBackImage: () => <BackIcon />,
              headerLeftContainerStyle: {
                paddingLeft: 16,
              },
              headerRightContainerStyle: {
                paddingRight: 16,
              },
            }}
          />
          <MainStack.Screen
            name={ScreenName.Map}
            component={MapScreen}
            options={{
              title: "Карта",
              headerTitleStyle: styles.headerTitle,
              headerBackTitleVisible: false,
              headerBackImage: () => <BackIcon />,
              headerLeftContainerStyle: {
                paddingLeft: 16,
              },
              headerRightContainerStyle: {
                paddingRight: 16,
              },
            }}
          />
          <MainStack.Screen
            name={ScreenName.Comments}
            component={CommentsScreen}
            options={{
              title: "Коментарі",
              headerTitleStyle: styles.headerTitle,
              headerBackTitleVisible: false,
              headerBackImage: () => <BackIcon />,
              headerLeftContainerStyle: {
                paddingLeft: 16,
              },
              headerRightContainerStyle: {
                paddingRight: 16,
              },
            }}
          />
          <MainStack.Screen
            name={ScreenName.Profile}
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  // return <MapScreen />;
  // return <Home />;
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.40799999237060547,
    textAlign: "center",
    color: "#212121",
  },
});
