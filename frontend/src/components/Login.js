import React, {Component} from 'react';
import {Button, Grid, Form, Header, Segment, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import axios from 'axios';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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
        axios.post('http://127.0.0.1:5000/login', {}, {
            auth: {
                username: username,
                password: password,
            }
        }).then(res => {
            console.log("authenticated");
        }).catch(err => {
            console.log(err);
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
        return (
            <Grid textAlign="center"
                  style={{height: '100%'}}
                  verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <div className='header'>
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
