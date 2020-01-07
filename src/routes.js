import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthLoadingScreen from "./pages/AuthLoadingScreen";

import ChatSchreen from "./pages/ChatScreen";

const AppStack = createStackNavigator({ Home, Chat: ChatSchreen });
const AuthStack = createStackNavigator({ Login });

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default Routes;
