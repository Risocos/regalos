/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

const API = 'http://10.0.2.2:5000';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = async () => {
        try {
            console.log('START');
            let response = await fetch(API+'/projects');
            let result = await response.json();
            console.log('DONE');
            this.setState({dataSource: result});
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <Text>Trying to receive data from: {API}</Text>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text style={{marginTop: 10}}>{item.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

}
