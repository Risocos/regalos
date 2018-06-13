import React, {Component} from 'react';
import {Grid, Header, List} from 'semantic-ui-react';
import '../styling/Footer.css';
import {Link} from "react-router-dom";

export class Footer extends Component {

    render() {
        return (
            <div className="footermargin">
                <Header dividing/>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header dividing textAlign={'center'}>
                                About
                            </Header>
                                <List>
                                    <List.Item as={Link} to='/' icon='users' content='About us'/>
                                    <List.Item as={Link} to='/' icon='user' content='User agreements'/>
                                    <List.Item as={Link} to='/' icon='tasks' content='Terms and conditions'/>
                                </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing textAlign={'center'}>
                                Contact
                            </Header>
                                <List>
                                    <List.Item icon='users' content='Regalos, made by Risocos'/>
                                    <List.Item icon='marker' content='Groningen, Netherlands'/>
                                    <List.Item
                                        icon='mail'
                                        as={Link}
                                        to='mailto:Contact@Regalos.com'
                                        content='Contact@Regalos.com'
                                    />
                                    <List.Item icon='linkify'
                                               as={Link} to='/' content='Contact us'/>
                                    <p>{}</p>
                                    <List.Item as={Link} to='http://www.Twitter.com' icon='twitter' content='Twitter'/>
                                    <List.Item as={Link} to='http://www.Facebook.com' icon='facebook' content='Facebook'/>
                                    <List.Item as={Link} to='http://www.Instagram.com' icon='instagram' content='Instagram'/>
                                </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Header dividing/>
            </div>
        )
    }
}

