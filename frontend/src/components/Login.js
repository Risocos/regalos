import React, {Component} from 'react';
import {Button, Grid, Form, Header, Segment, Message} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
    Source:
    https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios
     */
    handleSubmit = event => {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;
        const api_path = this.props.basepath + '/login';
        axios.post(api_path, {}, {
            auth: {
                username: username,
                password: password,
            }
        }).then(res => {
            //Setting values into sessionStorage
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", res.data.user);

            //Setting NavBar to loggedIn mode
            this.props.toggleLogin();

            this.setState({ redirect: true})

        }).catch(err => {
            this.setState({failedLogin: true})
        })
    };

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    };

    render() {
        let fail = '';
        const { redirect } = this.state;
        const { failedLogin } = this.state;

        //Redirect upon successful logon
        if(redirect) {
            return <Redirect to='/profile' />
        }

        if(failedLogin){
            fail = (
                <Message error>
                    <Message.Header style={{paddingTop: "0px"}}>Login unsuccesful</Message.Header>
                    <Message.List style={{height: "20px"}}>
                        <Message.Item>Email and/or password invalid</Message.Item>
                    </Message.List>
                </Message>
            )
        }

        return (
            <Grid textAlign="center"
                  style={{height: '100%'}}
                  verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <div className='header'>
                        {fail}
                        <Header as='h2' textAlign='center'>
                            Log in
                        </Header>
                    </div>
                    <Form size='large'>
                        <Segment>

                            <Form.Input
                                fluid
                                name="username"
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name="password"
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Button fluid size='large' onClick={this.handleSubmit}>Log in</Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='/signup'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>

        )

    }

}
