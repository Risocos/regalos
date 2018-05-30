import React, {Component} from 'react';
import {
    Button,
    Grid,
    Form,
    Header,
    Segment,
    Message,
    Input,
    Dimmer, Container
} from "semantic-ui-react";
import "../styling/AdminPanel.css";
import {Link, Redirect} from "react-router-dom";

export class AdminPanel extends Component {


    render() {

        return (
            <div className={"container"}>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>

                        </Grid.Column>
                        <Grid.Column>
                            <Header textAlign={"center"}> Welcome to the admin panel. </Header>
                            <div className={"adminbutton"}><Button size={"huge"} fluid><Link to='/userpanel'>User
                                management</Link></Button></div>
                            <p></p>
                            <div className={"adminbutton"}><Button size={"huge"} fluid><Link to='/projectpanel'>Project
                                management</Link></Button></div>
                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}