import React, {Component} from 'react';
import {Button, Grid, Form, Header, Segment, Message} from "semantic-ui-react";
import "../styling/login.css"
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {BACKEND_URL} from "../constants";
import '../styling/Register.css';

export class Register extends Component {

    constructor() {
        super();

        this.state = ({
            username: '',
            password: '',
            email: '',
            temppass: '',
            redirect: false,
            error: '',
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    }

    validate() {
        return (this.state.password === this.state.temppass);
    }

    onSubmit = event => {
        event.preventDefault();

        if (this.validate()) {
            const USERNAME = this.state.username;
            const EMAIL = this.state.email;
            const PASSWORD = this.state.password;
            const API_PATH = BACKEND_URL + '/users/register';

            axios.post(API_PATH, {
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD,
            }).then(res => {
                this.setState({
                    redirect: true,
                })
            }).catch(err => {
                const errors = err.response.data.errors;
                let items = [];
                if (err.response.status === 422) {
                    if (errors.email)
                        items.push(...errors.email);
                    if (errors.password)
                        items.push(...errors.password);
                }

                const MESSAGE = (
                    <Message className="error" error>
                        <Message.Header className="errorheader">Oops! Something went wrong!</Message.Header>
                        <Message.List>
                            {items.map(val => <Message.Item key={val}>{val}</Message.Item>)}
                        </Message.List>
                    </Message>
                );

                this.setState({
                    error: MESSAGE,
                })
            })
        }

        else {
            this.setState({
                error: <Message negative>Passwords do not match</Message>,
            })
        }
    };

    render() {
        if (this.state.redirect === true)
            return <Redirect to='/login'/>;
        return (
            <Grid textAlign="center"
                  style={{height: '100%'}}
                  verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <div className='header'>
                        <Header as='h2' textAlign='center'>
                            Register
                        </Header>
                    </div>
                    <Form size='large'>
                        <Segment>
                            {this.state.error}
                            <Form.Input
                                fluid
                                label='Username'
                                icon='user'
                                iconPosition='left'
                                name='username'
                                placeholder='Username'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                label='E-mail address'
                                icon='at'
                                iconPosition='left'
                                name='email'
                                placeholder='E-mail address'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Password'
                                icon='lock'
                                iconPosition='left'
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Re-enter Password'
                                icon='lock'
                                iconPosition='left'
                                name='temppass'
                                placeholder='Re-enter password'
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Button type='submit' fluid size='large' onClick={this.onSubmit}>Register</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account with us? <Link to='/login'>Log in</Link>
                    </Message>
                </Grid.Column>
            </Grid>

        )

    }

}
