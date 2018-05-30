import React, {Component} from 'react';
import {
    Button,
    Grid,
    Header,
} from "semantic-ui-react";
import "../styling/AdminPanel.css";
import {Link} from "react-router-dom";

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
                            <div className={"adminbutton"}>
                                <Link to='/users'>
                                    <Button size={"huge"} fluid>User management</Button>
                                </Link>
                            </div>
                            <p>{}</p>
                            <div className={"adminbutton"}>
                                <Link to='/projectpanel'>
                                    <Button size={"huge"} fluid>Project management</Button>
                                </Link>
                            </div>
                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}