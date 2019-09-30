import Events from "../screens/Events";
import Profile from "../screens/Profile";
import FAQ from "../screens/FAQ";
import {createAppContainer} from "react-navigation";
import {NAV_BAR_GREY} from "../../res/Colours";
import Login from "../screens/Login";
import {createStackNavigator} from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import React from "react";
import {CalendarIcon, FAQIcon, ProfileCalendarIcon, ProfileIcon} from "../../res/Icons";

const homeTabNavigator = createMaterialBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'My Info',
            tabBarIcon: () => {
                return <ProfileIcon size={20} color='black'/>;
            }
        }
    },
    Events: {
        screen: Events,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: () => {
                return <CalendarIcon size={20} color='black'/>;
            }
        },
        params: {
            showOnlyBooked: false
        }
    },
    MyEvents: {
        screen: Events,
        navigationOptions: {
            tabBarLabel: 'My Events',
            tabBarIcon: () => {
                return <ProfileCalendarIcon size={20} color='black'/>;
            }
        },
        params: {
            showOnlyBooked: true
        }
    },
    FAQ: {
        screen: FAQ,
        navigationOptions: {
            labeled: true,
            tabBarLabel: 'Info',
            tabBarIcon: () => {
                return <FAQIcon size={20} color='black'/>;
            }
        }
    }
}, {
    initialRouteName: 'Events',
    labeled: true,
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