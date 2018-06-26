/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

let projects = [
    {
        title: 'Building Houses',
        short_description: 'We are going to build houses for people in Uganda',
        project_plan: 'Our plan is to build cheap, but properly sized houses for people in Uganda.',
        owner: '705897b6-5478-4ba2-822a-c5e5833d4124',
        collaborators: [
            '705897b6-5478-4ba2-822a-c5e5833d4124',
            '705897b6-5478-4ba2-822a-c5e5833d4124',
        ],
        target_budget: 10000,
        current_budget: 4576,
        start_date: 1527764457,
        end_date: 1527766457,
        latitude: 0.99190516,
        longitude: -58.86762519,
        filename: 'dummy1.jpg',
        country: 'ug',
    },
    {
        title: 'Collecting money',
        short_description: 'We want to collect money for others',
        owner: '705897b6-5478-4ba2-822a-c5e5833d4124',
        target_budget: 15000,
        current_budget: 8594,
        start_date: 1527764457,
        end_date: 1527766457,
        latitude: 0.61806054,
        longitude: 62.77961401,
        project_plan: 'We plan to collect money from door to door and use this app as payment method',
        collaborators: [
            '705897b6-5478-4ba2-822a-c5e5833d4124'
        ],
        filename: 'dummy2.jpg',
        country: 'an',
    },
    {
        title: 'Recycle clothing',
        short_description: 'Donate your clothing, so we can recycle it!',
        owner: '705897b6-5478-4ba2-822a-c5e5833d4124',
        target_budget: 0,
        current_budget: 0,
        start_date: 1527764457,
        end_date: 1527766457,
        latitude: 49.02797017,
        longitude: -32.40686866,
        project_plan: 'We want people to donate their clothing, so that we can send this to poor countries',
        collaborators: [],
        filename: 'dummy3.jpg',
        country: 'us',
    },
    {
        title: 'Project Regalos',
        short_description: 'Donate for our project to create this project app',
        owner: '705897b6-5478-4ba2-822a-c5e5833d4124',
        target_budget: 5000,
        current_budget: 30,
        start_date: 1527764457,
        end_date: 1527766457,
        latitude: 31.80457949,
        longitude: -10.32726764,
        project_plan: 'Too bad we cannot afford our own hourly pay and Sander is addicted to coffee. Sad face.',
        collaborators: [],
        country: null,
    },
];

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
            fetch(API+'/projects')
                .then(response => {return response.json(); })
                .then(result => {
                    this.setState({dataSource: result.projects, isLoading: false});
                });
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
                    renderItem={({item}) => <Text style={{marginTop: 10}}>{item.title} {item.project_plan}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

}
