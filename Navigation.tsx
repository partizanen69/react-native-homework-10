import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenName } from "./App.consts";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { LogoutBtn } from "./components/LogoutBtn/LogoutBtn";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen/CreatePostsScreen";
import { BackIcon } from "./icons/back-arrow-icon";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { ProfileScreen } from "./Screens/ProfileScreen/ProfileScreen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./store/store";
import { auth } from "./firebase/firebase.config";
import { userSliceActions } from "./store/userSlice";

const MainStack = createStackNavigator();

export const Navigation = () => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [isUserExists, setIsUserExists] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("App.tsx: current user", currentUser);
      if (currentUser) {
        dispatch(
          userSliceActions.setUser({
            id: currentUser.uid,
            name: currentUser.displayName || "",
            email: currentUser.email || "",
          })
        );
        setIsUserExists(true);
      } else {
        dispatch(userSliceActions.clearUser());
        setIsUserExists(false);
      }
      setIsUserLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isUserLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={isUserExists ? ScreenName.Posts : ScreenName.Login}
      >
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
  );
};

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
