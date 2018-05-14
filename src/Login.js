import React, {Component} from 'react';
import {Button, Checkbox, Grid, Form, Header, Segment, Message} from "semantic-ui-react";

export class Login extends Component {

    constructor() {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e) {
        alert('Request sent, trying to authenticate');
    }

    render() {
        return (
            <Grid textAlign="center"
                  style={{height: '100%'}}
                  verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' textAlign='center'>
                        Log in
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            <Button type='submit' fluid size='large' onClick={this.onClickHandler}>Log in</Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>

        )

    }

}
