import {Events} from "../screens/Events";
import {Profile} from "../screens/Profile";
import FAQ from "../screens/FAQ";
import {createAppContainer} from "react-navigation";
import {NAV_BAR_GREY} from "../../res/Colours";
import Login from "../screens/Login";
import {createStackNavigator} from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import React from "react";
import {CalendarIcon, FAQIcon, ProfileIcon} from "../../res/Icons";

const homeTabNavigator = createMaterialBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({focused}: { focused: boolean }) => {
                return <ProfileIcon size={focused ? 30 : 20} color='black'/>;
            }
        }
    },
    Events: {
        screen: Events,
        navigationOptions: {
            tabBarIcon: ({focused}: { focused: boolean }) => {
                return <CalendarIcon size={focused ? 30 : 20} color='black'/>;
            }
        }
    },

    FAQ: {
        screen: FAQ,
        navigationOptions: {
            tabBarIcon: ({focused}: { focused: boolean }) => {
                return <FAQIcon size={focused ? 30 : 20} color='black'/>;
            }
        }
    }
}, {
    initialRouteName: 'Events',
    labeled: false,
    barStyle: {
        backgroundColor: NAV_BAR_GREY
    }
});

const stackNavigator = createStackNavigator({
    Login: {screen: Login},
    HomeTabs: {screen: homeTabNavigator}
}, {
    defaultNavigationOptions: () => ({header: null})
});

export const AppNavigator = createAppContainer(stackNavigator);