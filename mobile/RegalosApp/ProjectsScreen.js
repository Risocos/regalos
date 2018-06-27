/**
 * Project Screen
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const API = 'http://10.0.2.2:5000';

export default class ProjectsScreen extends React.Component {

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
            fetch(API + '/projects')
                .then(response => {
                    return response.json();
                })
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
            <View style={styles.container}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 27,
                    padding: 3,
                    backgroundColor: 'orange',
                    color: 'white',
                }}>Regalos</Text>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => this.createProjectCard(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    createProjectCard(project) {
        return (
            <TouchableHighlight onPress={() => this.showProjectScreen(project)}>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        source={{uri: project.cover}}
                    />
                    <View style={styles.content}>
                        <Text style={{fontSize: 20}}>{project.title}</Text>
                        {project.country &&
                        <Text>Country: {project.country.name}</Text>
                        }
                        <Text>Target budget: €{project.target_budget}</Text>
                        <Text>Achieved: €{project.current_budget}</Text>
                    </View>
                    <View
                        style={[styles.progress, {width: (project.current_budget / project.target_budget * 100) + '%'}]}/>
                </View>
            </TouchableHighlight>
        )
    }

    showProjectScreen(project) {
        return this.props.navigation.navigate('ProjectDetail');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 0,
    },
    card: {
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 10,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    content: {
        padding: 10,
    },
    progress: {
        backgroundColor: 'green',
        height: 5,
    }
});
