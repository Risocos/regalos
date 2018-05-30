import React, {Component} from 'react';
import {
    Button,
    Grid,
    Header,
    Table, Confirm
} from "semantic-ui-react";
import "../styling/ProjectPanel.css";
import {Link} from "react-router-dom";
import axios from "axios/index";

export class ProjectPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            open: false,
        }
    }

    componentDidMount() {
        const TOKEN = sessionStorage.getItem("token");
        const API_PATH = this.props.basepath + '/projects';

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

    deleteProject(project) {
        console.log(project);
        //const TOKEN = "Bearer " + sessionStorage.getItem("token");
        //const API_PATH = this.props.basepath + "/projects/" + project;
        //axios.delete(API_PATH, {
        //    headers: {
        //        Authorization: TOKEN,
        //    }
        //}).then(() => {
        //    this.close();
            //window.location.reload();
        //})
    }

    open = () => this.setState({open: true});
    close = () => this.setState({open: false});

    listProject(project) {
        let isFlagged = "No";

        if (project.flagged) {
            isFlagged = "Yes";
        }

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
                            onClick={this.open}/>
                    <Confirm
                        open={this.state.open}
                        content={"Do you want to delete the project: " + project.title}
                        confirmButton="Delete project"
                        onCancel={this.close}
                        onConfirm={() => this.deleteProject(project.id)}/>
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
                        <p></p>
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
                                {this.state.projects.map(project => this.listProject(project))}
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell colSpan='5'>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>

                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }

}