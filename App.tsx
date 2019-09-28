import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from "react-redux";
import {configureStore} from "./src/store/Store";
import {AppNavigator} from "./src/components/navigation/AppNavigator";
import {setTopLevelNavigator} from "./src/components/navigation/NavigationService";

const store = configureStore();
console.disableYellowBox = true;

export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <Provider store={store}>
                <SafeAreaView style={{flex: 1}}>
                    <AppNavigator ref={(ref: any) => setTopLevelNavigator(ref)}/>
                </SafeAreaView>
            </Provider>
        );
    }
}