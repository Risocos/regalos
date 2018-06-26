import React, {Component} from 'react';
import {Button, Container, Divider, Form, Header, Image, Message} from "semantic-ui-react";
import '../styling/EditProfile.css';
import axios from 'axios';
import {BACKEND_URL} from "../constants";


export class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            pictureFile: '',
            picturePreview: 'http://via.placeholder.com/300x300',
            bio: '',
            twitter: '',
            linkedin: '',
            google: '',

            //Password stuff
            current: '',
            new: '',
            reNew: '',
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/users/" + sessionStorage.getItem("user");
        axios.get(API_PATH, {
            headers: {
                Authorization: TOKEN,
            }
        }).then(res => {
            const data = res.data.user;
            this.setState({
                email: data.email,
                picturePreview: data.avatar,
                bio: data.biography,
                twitter: data.twitter,
                linkedin: data.linkedin,
                google: data.google,
            })
        })
    }

    updatePassword() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/users/" + sessionStorage.getItem("user");

        let data = new FormData();
        data.append("password", this.state.new);

        axios.patch(API_PATH, data, {
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            const MESSAGE = (
                <Message success>
                    <Message.Header className='message'>Password has been successfully changed! Please log in with your new password</Message.Header>
                </Message>
            );
            this.setState({
                message: MESSAGE,
            })
        }).catch(err => {
            const error = err.response.data.errors.password;
            const MESSAGE = (
                <Message error>
                    <Message.Header className='message'>{error[0]}</Message.Header>
                </Message>
            );

            this.setState({
                message: MESSAGE,
            })
        })
    }

    handleSubmit() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/users/" + sessionStorage.getItem("user");

        let data = new FormData();
        data.append("email", this.state.email);
        data.append("biography", this.state.bio);
        data.append("profilepicture", this.state.pictureFile);
        data.append("twitter", this.state.twitter);
        data.append("google", this.state.google);
        data.append("linkedin", this.state.linkedin);

        axios.patch(API_PATH, data, {
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            const MESSAGE = (
                <Message success>
                    <Message.Header className='message'>Profile Successfully updated!</Message.Header>
                </Message>
            );
            this.setState({
                message: MESSAGE,
            })
        }).catch(err => {
            const errors = err.response.data.errors;
            let items = [];
            if(errors.title)
                items.push(...errors.title);
            if(errors.biography)
                items.push(...errors.biography);

            const MESSAGE = (
                <Message error>
                    <Message.Header className='message'>Oops! Something went wrong</Message.Header>
                    <Message.List>
                        {items.map(val => <Message.Item key={val}>{val}</Message.Item>)}
                    </Message.List>
                </Message>
            );

            this.setState({
                message: MESSAGE
            })
        })
    }

    handlePasswordUpdate() {
        if (this.state.new === this.state.reNew) {
            this.updatePassword();
        }
        else {
            const MESSAGE = (
                <Message error>
                    <Message.Header className='message'>Passwords do not match</Message.Header>
                </Message>);
            this.setState({message: MESSAGE});
        }
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    }

    handleImageChange(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                pictureFile: file,
                picturePreview: reader.result,
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <Container textAlign='center'>
                <div>{this.state.message}</div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Group className='mediumcolumn' grouped>
                            <Image circular size='small' src={this.state.picturePreview}/>
                            <Form.Input type='file' onChange={(e) => this.handleImageChange(e)}/>
                        </Form.Group>
                        <Form.Group className='mediumcolumn' grouped>
                            <Form.Input fluid label='Email' value={this.state.email} name='email'
                                        placeholder='Email' onChange={this.handleChange}/>
                            <Form.TextArea rows='20' label='Bio' value={this.state.bio} name='bio'
                                           placeholder='Bio' onChange={this.handleChange}/>
                            <Button content='Update profile' onClick={this.handleSubmit}/>
                        </Form.Group>
                        <Form.Group className='mediumcolumn' grouped>
                            <Form.Input fluid label='Twitter' value={this.state.twitter} name='twitter'
                                        placeholder='Twitter' onChange={this.handleChange}/>
                            <Form.Input fluid label='Google+' value={this.state.instagram} name='google'
                                        placeholder='Google+' onChange={this.handleChange}/>
                            <Form.Input fluid label='LinkedIn' value={this.state.linkedin} name='linkedin'
                                        placeholder='LinkedIn' onChange={this.handleChange}/>
                            <Divider/>
                            <Header as='h3'>Change password</Header>
                            <Form.Input fluid type='password' label='Current password' value={this.state.current}
                                        name='current' placeholder='Current password' onChange={this.handleChange}/>
                            <Form.Input fluid type='password' label='New password' value={this.state.new}
                                        name='new' placeholder='New password' onChange={this.handleChange}/>
                            <Form.Input fluid type='password' label='Re-type password' value={this.state.reNew}
                                        name='reNew' placeholder='Re-type password' onChange={this.handleChange}/>
                            <Button content='Change password' onClick={this.handlePasswordUpdate}/>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}