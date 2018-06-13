import React, {Component} from 'react';
import {Form, Grid, Header, Pagination} from "semantic-ui-react";
import "../styling/ProjectOverview.css";
import axios from "axios";
import {ProjectCard} from "./ProjectCard";
import {COUNTRIES, BACKEND_URL} from "../constants";


export class ProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //list of options used for filtering the projectview
            filterOptions: [
                {key: 'p', text: 'Popularity', value: 'popularity'},
                {key: 't', text: 'Targetbudget', value: 'targetbudget'},
            ],

            //Pagination
            activePage: 1,
            total: 0,

            //the components to render
            projects: [],
        };
    }


    componentDidMount() {
        let projectList = this.state.projects;
        const API_PATH = BACKEND_URL + '/projects';
        axios.get(API_PATH)
            .then((response) => {
                response.data.projects.map((projectObject) => (
                    projectList.push(this.createCardObject(projectObject)))
                );
                this.setState({
                    projects: projectList,
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    createCardObject(project) {
        return (
            <ProjectCard key={project.id}
                         id={project.id}
                         name={project.title}
                         target={project.target_budget}
                         achieved={project.current_budget}
                         country={project.country_id}
                         cover={project.cover}
                         className="card"
            />
        )
    }

    renderCards() {
        let cardsToRender = [];
        if (this.state.activePage === 1) {
            for (let i = 0; i < 12; i++) {
                cardsToRender.push(this.state.projects[i])
            }
        }
        else {
            const MIN = (this.state.activePage - 1) * 12;
            const MAX = MIN + 12;
            for (let i = MIN; i < MAX; i++) {
                cardsToRender.push(this.state.projects[i])
            }
        }
        return cardsToRender;
    }

    handlePageChange = (e, {activePage}) => this.setState({activePage});

    handleCountryChange = (e, d) => this.setState({
        filter: {country: d.value}
    });


    render() {
        const PAGES_REQUIRED = this.state.projects.length / 12;

        //TODO: functionality of filters
        let countries = [];
        COUNTRIES.forEach(country => {
            countries.push({
                key: country.countryCode,
                value: country.countryCode,
                flag: country.countryCode,
                text: country.name
            });
        });

        //TODO: Fix project on google maps map

        return (
            <div className="container">

                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h3'>Filters</Header>
                            {/* TODO: put filters in own Component */}
                            <label>Pick a filter:</label><Form.Dropdown placeholder='Filter' fluid search selection
                                                                        options={this.state.filterOptions}/>
                            {/*<p> </p>*/}
                            {/* TODO: Option to not choose a country */}
                            <label>Pick a country:</label><Form.Dropdown placeholder='Select a country' fluid search
                                                                         selection
                                                                         options={countries}
                                                                         onChange={this.handleCountryChange}/>

                            {/* TODO: should use a slider */}
                            {/*<Form.Input*/}
                            {/*action={<Form.Dropdown button basic floating options={options} defaultValue='page'/>}*/}
                            {/*placeholder='$...'*/}
                            {/*/>*/}

                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Grid columns={3}>
                                {this.renderCards()}
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
                                It is your own responsibility to look out for your money, so please
                                make sure the project you are donating to is verified.
                            </i></p>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row centered columns={3}>
                        <Grid.Column>
                            <Pagination activePage={this.state.activePage}
                                        totalPages={PAGES_REQUIRED}
                                        onPageChange={this.handlePageChange}/>
                        </Grid.Column>
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