/**
 * Project Screen
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Image, Text, View} from "react-native";

export default class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
        this.project = props.navigation.getParam('project');
    }

    render() {
        return (
            <View>
                <Image
                    source={{uri: this.project.cover}}
                    style={{width: '100%', height: 150}}
                />
                <Text style={{fontSize: 30, alignSelf: 'center', marginTop: 10}}>{this.project.title}</Text>
                <View style={{padding: 15}}>
                    <Text style={{fontSize: 25, alignSelf: 'center'}}>Target budget:
                        €{this.project.target_budget}</Text>
                    <Text style={{fontSize: 25, alignSelf: 'center'}}>Achieved: €{this.project.current_budget}</Text>

                    <View
                        style={{
                            height: 10,
                            backgroundColor: 'green',
                            width: (this.project.current_budget / this.project.target_budget * 100) + '%'
                        }}
                    />

                    <Text style={{fontSize: 20}}>Short Description</Text>
                    <Text>{this.project.short_description}</Text>
                    <Text style={{fontSize: 20}}>Project Plan</Text>
                    <Text>{this.project.project_plan}</Text>
                </View>
            </View>
        )
    }

}
