import React, {Component} from 'react';
import {Button, Confirm, Grid, Header, Table} from "semantic-ui-react";
import "../styling/ProjectPanel.css";
import {Link} from "react-router-dom";
import axios from "axios/index";
import {BACKEND_URL} from "../constants";

export class MyProjects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            confirm: {
                open: false,
            },
        }
    }

    componentDidMount() {
        const TOKEN = sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + '/projects/userprojects/' + sessionStorage.getItem("user");
        console.log(API_PATH);
        axios.get(API_PATH, {
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            }
        }).then(res => {
            this.setState({projects: res.data.projects});
        })
    }

    requestDeletionProject(projectId) {
        // const TOKEN = "Bearer " + sessionStorage.getItem("token");
        // const API_PATH = BACKEND_URL + "/projects/" + projectId;
        //TODO: Send request to endpoint to flag this one as request for deletion
    }

    showConfirm = (project) => this.setState({confirm: {open: true, project: project}});
    closeConfirm = () => this.setState({confirm: {open: false}});

    projectRow(project) {

        const PROJECT = '/projects/' + project.id;
        const EDIT_PROJECT = '/projects/edit/' + project.id;
        return (
            <Table.Row key={project.id}>
                <Table.Cell collapsing>
                </Table.Cell>
                <Table.Cell>{project.title}</Table.Cell>
                <Table.Cell>{project.donators}</Table.Cell>
                <Table.Cell>€{project.target_budget}</Table.Cell>
                <Table.Cell>€{project.current_budget}</Table.Cell>
                <Table.Cell>
                    <Link to={PROJECT}><Button style={{marginRight: "5px"}} content="Go to project"/></Link>
                    <Link to={EDIT_PROJECT}><Button style={{marginRight: "5px"}} content="Edit project"/></Link>
                    <Button style={{marginRight: "5px"}}
                            icon='remove user'
                            content="Request for deletion"
                            negative
                            onClick={() => this.showConfirm(project)}/>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        return (
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        {/*<div className={"backbutton"}><Button*/}
                            {/*as={Link}*/}
                            {/*to='/adminpanel'*/}
                            {/*icon='left chevron'*/}
                            {/*content="Back"/></div>*/}
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header textAlign={"center"}> My projects </Header>
                        <Table compact celled definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>Project name</Table.HeaderCell>
                                    <Table.HeaderCell>Donations</Table.HeaderCell>
                                    <Table.HeaderCell>Target Budget</Table.HeaderCell>
                                    <Table.HeaderCell>Achieved</Table.HeaderCell>
                                    <Table.HeaderCell>Change project</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.projects.map(project => this.projectRow(project))}
                            </Table.Body>
                        </Table>

                        {'project' in this.state.confirm &&
                        <Confirm
                            open={this.state.confirm.open}
                            content={"Do you want to request a deletion of project: " + this.state.confirm.project.title}
                            confirmButton="Request deletion"
                            onCancel={this.closeConfirm}
                            onConfirm={() => this.requestDeletionProject(this.state.confirm.project.id)}/>
                        }

                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}