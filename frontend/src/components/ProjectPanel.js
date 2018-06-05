import React, {Component} from 'react';
import {Button, Confirm, Grid, Header, Table} from "semantic-ui-react";
import "../styling/ProjectPanel.css";
import {Link} from "react-router-dom";
import axios from "axios/index";
import {SERVER_URL} from "../constants";

export class ProjectPanel extends Component {
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
        const API_PATH = SERVER_URL + '/projects';

        axios.get(API_PATH, {
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            }
        }).then(res => {
            this.setState({
                projects: res.data.projects,
            });
        })
    }

    deleteProject(projectId) {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = SERVER_URL + "/projects/" + projectId;
        axios.delete(API_PATH, {
            headers: {
                Authorization: TOKEN,
            },
            validateStatus: status => {
                return (status >= 200 && status < 300) || [401, 403].includes(status);
            }
        }).then((response) => {
            this.closeConfirm();
            if (response.status === 200) {
                window.location.reload();
            } else if([401, 403].includes(response.status)) {
                // todo: show message or automatically login used again
                const PATH = '/' + response.status;
                window.location.href = PATH;
            }
        }).catch((err) => {
                console.log(err)
        });
    }

    showConfirm = (project) => this.setState({confirm: {open: true, project: project}});
    closeConfirm = () => this.setState({confirm: {open: false}});

    projectRow(project) {
        let isFlagged = (project.flag_count>20) ? "Yes" : "No";

        const PROJECT = '/projects/' + project.id;
        const startEndDate = project.startdate + ' to ' + project.enddate;
        return (
            <Table.Row key={project.id}>
                <Table.Cell collapsing>
                </Table.Cell>
                <Table.Cell>{project.title}</Table.Cell>
                <Table.Cell>{project.owner}</Table.Cell>
                <Table.Cell>{startEndDate}</Table.Cell>
                <Table.Cell>{isFlagged}</Table.Cell>
                <Table.Cell>
                    <Link to={PROJECT}><Button style={{marginRight: "5px"}} content="Go to project"/></Link>
                    <Button style={{marginRight: "5px"}}
                            icon='remove user'
                            content="Delete project"
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
                        <div className={"backbutton"}><Button
                            as={Link}
                            to='/adminpanel'
                            icon='left chevron'
                            content="Back"/></div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header textAlign={"center"}> Project management </Header>
                        <Table compact celled definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>Project name</Table.HeaderCell>
                                    <Table.HeaderCell>Project Owner</Table.HeaderCell>
                                    <Table.HeaderCell>Start & end date</Table.HeaderCell>
                                    <Table.HeaderCell>Flagged</Table.HeaderCell>
                                    <Table.HeaderCell>Operators</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.projects.map(project => this.projectRow(project))}
                            </Table.Body>
                        </Table>

                        {'project' in this.state.confirm &&
                        <Confirm
                            open={this.state.confirm.open}
                            content={"Do you want to delete the project: " + this.state.confirm.project.title}
                            confirmButton="Delete project"
                            onCancel={this.closeConfirm}
                            onConfirm={() => this.deleteProject(this.state.confirm.project.id)}/>
                        }

                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}