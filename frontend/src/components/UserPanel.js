import React, {Component} from 'react';
import {
    Button,
    Grid,
    Header, Table, Confirm
} from "semantic-ui-react";
import "../styling/UserPanel.css";
import {Link,} from "react-router-dom";
import axios from 'axios';

export class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            users: [],
            redirect: false,
            open: false,
        });
    }

    componentDidMount() {
        const TOKEN = sessionStorage.getItem("token");
        const API_PATH = this.props.basepath + '/users';

        axios.get(API_PATH, {
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            }
        }).then(res => {
            this.setState({
                users: res.data.users,
            });
        })
    }

    open = () => this.setState({open: true});
    close = () => this.setState({open: false});

    deleteUser(user) {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = this.props.basepath + "/users/" + user;
        axios.delete(API_PATH, {
            headers: {
                Authorization: TOKEN,
            }
        }).then(() => {
            this.close();
            window.location.reload();
        })
    }

    listUser(user) {
        let isAdmin = "No";
        let isFlagged = "No";

        if (user.admin) {
            isAdmin = "Yes";
        }
        if (user.flagged) {
            isFlagged = "Yes";
        }
        const PROFILE = '/users/' + user.id;
        return (
            <Table.Row>
                <Table.Cell collapsing>
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{isAdmin}</Table.Cell>
                <Table.Cell>{isFlagged}</Table.Cell>
                <Table.Cell>
                    <Link to={PROFILE}><Button style={{marginRight: "5px"}} content="Go to profile"
                                               icon='user circle outline'/></Link>
                    <Button style={{marginRight: "5px"}}
                            icon='remove user'
                            content="Delete user"
                            negative
                            onClick={this.open}/>
                    <Confirm
                        open={this.state.open}
                        content={"Do you want to delete the user: " + user.username}
                        confirmButton="Delete user"
                        onCancel={this.close}
                        onConfirm={() => this.deleteUser(user.id)}/>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        return (
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <div className={"backbutton"}><Link to='/adminpanel'><Button icon='left chevron'
                                                                                     content="Back"/></Link></div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <p>{}</p>
                        <Header textAlign={"center"}> User Management. </Header>

                        <Table compact celled definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell>Username</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Admin</Table.HeaderCell>
                                    <Table.HeaderCell>Flagged for abuse</Table.HeaderCell>
                                    <Table.HeaderCell>Operations</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.users.map(user => this.listUser(user))}
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