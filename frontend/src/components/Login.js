import React, {Component} from 'react';
import {
    Button,
    Grid,
    Form,
    Header,
    Segment,
    Message,
    Input,
    Dimmer, Container
} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {BACKEND_URL} from "../constants";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
            isAdmin: false,
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

        const USERNAME = this.state.username;
        const PASSWORD = this.state.password;
        const API_PATH = BACKEND_URL + '/login';
        axios.post(API_PATH, {}, {
            auth: {
                username: USERNAME,
                password: PASSWORD,
            }
        }).then(res => {
            //Setting values into sessionStorage
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", res.data.user.id);

            if(res.data.user.admin) {
                sessionStorage.setItem("admin", "perhaps");
                this.setState({isAdmin: true})
            }

            this.setState({redirect: true})

        }).catch(() => {
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

    handleOpen = () => this.setState({active: true});
    handleClose = () => this.setState({active: false});



    render() {
        let fail = '';
        const {redirect} = this.state;
        const {isAdmin} = this.state;
        const {failedLogin} = this.state;
        const {active} = this.state;

        if(isAdmin) {
            return <Redirect to='/adminpanel'/>
        }

        //Redirect upon successful logon
        if (redirect) {
            const ACCOUNT_PATH = '/users/' + sessionStorage.getItem("user");
            return <Redirect to={ACCOUNT_PATH}/>
        }

        if (failedLogin) {
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
            <div className={"container"}>
                {/*Forgot password form*/}
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >
                    <Container>
                        <Form inverted>
                            <Form.Group widths='equal'>
                                <Form.Field control={Input} label='Email' placeholder='Email'/>
                            </Form.Group>
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                    </Container>
                </Dimmer>
                {/* end Forgot password form*/}

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
                                    label = "E-mail address"
                                    name="username"
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    label = "Password"
                                    name="password"
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                <Button fluid size='large' onClick={this.handleSubmit}>Log in</Button>
                                <Header size={"small"}> Forgot your password? </Header>
                                <Button onClick={this.handleOpen}>Click Here</Button>

                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/signup'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>

        )

    }

}
