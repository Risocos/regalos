import React, {Component} from 'react';
import {Form, Grid, Header} from "semantic-ui-react";
import "../styling/ProjectOverview.css";
import axios from "axios";
import {ProjectCard} from "./ProjectCard";


export class ProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //list of options used for filtering the projectview
            filterOptions: [{key: 'f', text: 'Filter', value: 'filter'},
                {key: 'p', text: 'Popularity', value: 'popularity'},
                {key: 't', text: 'Targetbudget', value: 'targetbudget'},
            ],
            //the components to render
            projects: []
        };
    }


    componentDidMount() {
        let projectList = this.state.projects;
        axios.get('http://127.0.0.1:5000/projects')
            .then((response) => {
                response.data.projects.map((projectObject) => (
                   projectList.push(this.createCardObject(projectObject)))
                )
            .then(
                this.setState({
                    projects: projectList,
                }))
            //    response.data.projects.map(object => (
            //        console.log(this.createCardObject(object))
            //    ))
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    createCardObject(project) {
        return(
            <ProjectCard
                id={project.id}
                name={project.title}
                desc={project.description}
                target={project.target}
            />
        )
    }


    render() {

        //TODO: funtionality of filters

        //TODO: Fix amounts of projects shown etc

        //TODO: Fix project on google maps map
        return (
            <div className="container">

                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>

                            <Form.Select options={this.state.filterOptions} placeholder='Filter'/>

                            <Form.Field label='United States' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Europe' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Asia' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Australia' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Africa' control='input' type='checkbox' defaultChecked='true'/>

                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Grid columns={3}>
                                {this.state.projects}
                            </Grid>
                        </Grid.Column>

                        <Grid.Column>
                            <Header size="large">Info</Header>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient
                                montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                                aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                                vitae, justo. </p>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <div className='googlemaps'>
                            <div className="gmap_canvas">
                                <iframe width="100%" height="500" id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=university of san francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                            </div>
                        </div>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}