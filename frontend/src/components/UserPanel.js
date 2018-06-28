import React, {Component} from 'react';
import {
    Button,
    Grid,
    Header, Table, Confirm
} from "semantic-ui-react";
import "../styling/AdminPanel.css";
import {Link,} from "react-router-dom";
import axios from 'axios';
import {BACKEND_URL} from "../constants";

export class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            users: [],
            redirect: false,
            confirm: {
                open: false,
            },
        });
    }

    componentDidMount() {
        const TOKEN = sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + '/users';

        axios.get(API_PATH, {
            headers: {
                Authorization: 'Bearer ' + TOKEN,
            }
        }).then(res => {
            this.setState({
                users: res.data.users,
            });
        }).catch(err => {
            if([401, 403].includes(err.response.status)) {
                const PATH = '/' + err.response.status;
                window.location.href = PATH;
            }
        })
    }

    showConfim = (user) => this.setState({confirm: {open: true, user: user}});
    closeConfirm = () => this.setState({confirm: {open: false}});

    deleteUser(user) {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/users/" + user;
        axios.delete(API_PATH, {
            headers: {
                Authorization: TOKEN,
            }
        }).then(() => {
            this.closeConfirm();
            window.location.reload();
        })

    }

    listUser(user) {
        let isAdmin = "No";
        let isFlagged = "No";

        if (user.admin) {
            isAdmin = "Yes";
        }
        if (user.flag_count>20) {
            isFlagged = "Yes";
        }
        const PROFILE = '/users/' + user.id;
        return (
            <Table.Row key={user.id}>
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
                            onClick={() => this.showConfim(user)}/>
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

                        {'user' in this.state.confirm &&
                        <Confirm
                            open={this.state.confirm.open}
                            content={"Do you want to delete the project: " + this.state.confirm.user.username}
                            confirmButton="Delete project"
                            onCancel={this.closeConfirm}
                            onConfirm={() => this.deleteUser(this.state.confirm.user.id)}/>
                        }
                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }

}