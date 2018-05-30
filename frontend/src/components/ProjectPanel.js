import React, {Component} from 'react';
import {
    Button,
    Grid,
    Header,
    Checkbox, Table
} from "semantic-ui-react";
import "../styling/ProjectPanel.css";
import {Link} from "react-router-dom";

export class ProjectPanel extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <div className={"backbutton"}><Button icon='left chevron'
                                                              content={<Link to='/adminpanel'>Back</Link>}/></div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <p></p>
                        <Header textAlign={"center"}> Welcome to the Project panel. </Header>
                        <Table compact celled definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>Projectname</Table.HeaderCell>
                                    <Table.HeaderCell>email</Table.HeaderCell>
                                    <Table.HeaderCell>admin</Table.HeaderCell>
                                    <Table.HeaderCell>bio</Table.HeaderCell>
                                    <Table.HeaderCell>date_created</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Checkbox/>
                                    </Table.Cell>
                                    <Table.Cell>John Lilki</Table.Cell>
                                    <Table.Cell>September 14, 2013</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell>No</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Checkbox/>
                                    </Table.Cell>
                                    <Table.Cell>Jamie Harington</Table.Cell>
                                    <Table.Cell>January 11, 2014</Table.Cell>
                                    <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                                    <Table.Cell>Yes</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Checkbox/>
                                    </Table.Cell>
                                    <Table.Cell>Jill Lewis</Table.Cell>
                                    <Table.Cell>May 11, 2014</Table.Cell>
                                    <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                                    <Table.Cell>Yes</Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell colSpan='5'>
                                        <Button floated='right' size='small' color='red'>
                                            Remove Project
                                        </Button>
                                        <Button size='small'>Approve</Button>
                                        <Button disabled size='small'>Approvdde All</Button>
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