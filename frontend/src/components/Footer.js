import React, {Component} from 'react';
import {Grid, Header, List} from 'semantic-ui-react';
import '../styling/Footer.css';

export class Footer extends Component {
    constructor(props) {
        super(props);
    }

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
                            <p>
                                <List>
                                    <List.Item icon='users' content={<a href='/'>About us</a>}/>
                                    <List.Item icon='user secret' content={<a href='/'>User agreements</a>}/>
                                    <List.Item icon='handshake outline' content={<a href='/'>Terms and conditions</a>}/>
                                </List>
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing textAlign={'center'}>
                                Contact
                            </Header>
                            <p>
                                <List>
                                    <List.Item icon='users' content='Regalos, made by Risocos'/>
                                    <List.Item icon='marker' content='Groningen, Netherlands'/>
                                    <List.Item
                                        icon='mail'
                                        content={<a href='mailto:Contact@Regalos.com'>Contact@Regalos.com</a>}
                                    />
                                    <List.Item icon='linkify'
                                               content={<a href='/'>Contact us</a>}/>
                                    <p></p>
                                    <List.Item icon='twitter' content={<a href='http://www.Twitter.com'>Twitter</a>}/>
                                    <List.Item icon='facebook' content={<a href='http://www.Facebook.com'>Facebook</a>}/>
                                    <List.Item icon='instagram' content={<a href='http://www.Instagram.com'>Instagram</a>}/>
                                </List>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Header dividing/>
            </div>
        )
    }
}

