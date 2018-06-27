import React, {Component} from 'react';
import {Header, List, Grid, Button} from "semantic-ui-react"
import {Link} from "react-router-dom";

export class ContactUs extends Component {

    render() {
        return (
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}> Contact us. </Header>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header>
                                FAQ
                            </Header>
                            <p>
                                Below you will be able to find the Requently asked questions. Please look around these
                                first before you try to get in contact with us.
                                <br/> <br/> If your question is not answered here, feel free to send us a tweet or
                                email!
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header>
                                Contact
                            </Header>
                            <p>
                                Thank you for using Regalos! If you have a simple question, please feel free to send us
                                a tweet. When you have a more complicated question, please send us an email.</p>
                            <List>
                                <List.Item>
                                <a href='https://twitter.com/'><Button circular color='twitter' icon='twitter'/></a>
                                    <a href='https://twitter.com/'>Twitter</a></List.Item>
                                <List.Item>
                                <a href='https://twitter.com/'><Button circular color='email' icon='mail'/></a>

                                <List.Item
                                    as={Link}
                                    to='mailto:Contact@Regalos.com'
                                    content='Email'
                                /></List.Item>
                            </List>

                        </Grid.Column>
                    </Grid.Row>


                </Grid>

            </div>
        )
    }

}