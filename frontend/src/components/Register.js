import React, {Component} from 'react';
import {Button, Grid, Form, Header, Segment, Message} from "semantic-ui-react";
import "../styling/login.css"
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

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

    validate(){
        if(this.state.password===this.state.temppass) return true;
        return false
    }

    onSubmit = event => {
        event.preventDefault();

        if(this.validate()) {
            const USERNAME = this.state.username;
            const EMAIL = this.state.email;
            const PASSWORD = this.state.password;
            const API_PATH = this.props.basepath + '/users/register';

            axios.post(API_PATH, {
                username: USERNAME,
                email: EMAIL,
                password: PASSWORD,
            }).then(res => {
                this.setState({
                    redirect: true,
                })
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            this.setState({
                error: <Message negative>Passwords do not match</Message>,
            })
        }
    };

    render() {

        if(this.state.redirect===true)
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
                                icon='user'
                                iconPosition='left'
                                name='username'
                                placeholder='Username'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='at'
                                iconPosition='left'
                                name='email'
                                placeholder='E-mail address'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='temppass'
                                placeholder='Re-enter password'
                                type='password'
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
