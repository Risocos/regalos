import React, {Component} from 'react';
import {Form, Grid, Header, Pagination} from "semantic-ui-react";
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
            projects: [],
        };
    }


    componentDidMount() {
        let projectList = this.state.projects;
        const api_path = this.props.basepath + '/projects';
        axios.get(api_path)
            .then((response) => {
                response.data.projects.map((projectObject) => (
                   projectList.push(this.createCardObject(projectObject)))
                )
            .then(
                this.setState({
                    projects: projectList,
                }))
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
                            <Header size="large">Information</Header>
                            <p> Welcome to Regalos! On this website you will be able to see
                                countless of different projects from different kinds of people.
                                You can donate money, donate materials, and even apply to join
                                a project. Take a look around the projectoverview, pick out
                                your favorite projects. Or make an account and set up your own project!
                                Everything is possible.
                            </p>
                            <p><i>
                                Please notice that we verify accounts that are to be trusted.
                                It's your own responsibility to look out for your money, so please
                                make sure the project you are donating to is verified.
                            </i></p>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row centered columns={3}>
                        <Grid.Column ><Pagination defaultActivePage={1} totalPages={10} /></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <div className='googlemaps'>
                            <div className="gmap_canvas">
                                <iframe title="maps" width="100%" height="500" id="gmap_canvas"
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