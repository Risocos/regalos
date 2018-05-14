import React, {Component} from 'react';
import {Button, Checkbox, Grid, Form, Header, Segment, Message} from "semantic-ui-react";

export class Register extends Component {

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
                        Register
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='First name'
                            />
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='last name'
                            />
                            <Form.Input
                                fluid
                                icon='at'
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
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Re-enter password'
                                type='password'
                            />
                            <Button type='submit' fluid size='large' onClick={this.onClickHandler}>Register</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account with us? <a href='#'>Log in</a>
                    </Message>
                </Grid.Column>
            </Grid>

        )

    }

}
