import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Image } from "react-native";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

import Home from "./pages/Home";
import AuthLoadingScreen from "./pages/AuthLoadingScreen";
import Profile from "./pages/Profile";

import ChatSchreen from "./pages/ChatScreen";

const AppStack = createStackNavigator({
  Home,
  Chat: ChatSchreen,
  Profile: Profile
});

const AuthStack = createStackNavigator({ Login, CreateAccount });

AppStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0;

  return {
    tabBarVisible
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Chats: AppStack,
    Propfile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let imageName = require("./assets/comments.png");

        return (
          <Image
            source={imageName}
            style={{ width: 25, resizeMode: "contain", tintColor }}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

console.ignoredYellowBox = ["Warning:"];

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      TabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default Routes;
