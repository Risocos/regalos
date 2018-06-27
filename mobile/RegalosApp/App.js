/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {createStackNavigator} from "react-navigation";
import {Text, View} from "react-native";
import ProjectsScreen from "./ProjectsScreen";
import ProjectDetail from "./ProjectDetail";

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}

const Navigation = createStackNavigator({
    Home: ProjectsScreen,
    ProjectDetail: ProjectDetail,
});

export default class App extends React.Component {
    render() {
        return <Navigation/>
    }
}
