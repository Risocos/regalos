import React, {Component} from 'react';
import {Button, Container, Divider, Form, Header, Image, Message} from "semantic-ui-react";
import '../styling/EditProfile.css';
import axios from 'axios';
import {SERVER_URL} from "../constants";


export class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
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
            match: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    }

    componentDidMount() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = SERVER_URL + "/users/" + sessionStorage.getItem("user");
        axios.get(API_PATH, {
            headers: {
                Authorization: TOKEN,
            }
        }).then(res=> {
            const data = res.data.user;
            console.log(data);
            this.setState({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            picturePreview: 'http://via.placeholder.com/300x300',
            bio: data.bio,
            twitter: data.twitter,
            linkedin: data.linkedin,
            google: data.google,
            })
        })
    }

    updatePassword() {
        //TODO: Add PUT request when API supports it
    }

    handleSubmit() {
        //TODO: Add PUT request when API supports it
    }

    handlePasswordUpdate() {
        if (this.state.new === this.state.reNew) {
            this.updatePassword();
        }
        else {
            let message = <Message error>
                <Message.Header style={{paddingTop: "0px"}}>Passwords do not match</Message.Header>
            </Message>;
            this.setState({match: message});
            console.log(message);
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
                <div>{this.state.match}</div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Group className='mediumcolumn' grouped>
                            <Image circular size='small' src={this.state.picturePreview}/>
                            <Form.Input type='file' onChange={(e) => this.handleImageChange(e)}/>
                        </Form.Group>
                        <Form.Group className='mediumcolumn' grouped>
                            <Form.Input fluid label='Firstname' value={this.state.firstname} name='firstname'
                                        placeholder='Firstname' onChange={this.handleChange}/>
                            <Form.Input fluid label='Lastname' value={this.state.lastname} name='lastname'
                                        placeholder='Lastname' onChange={this.handleChange}/>
                            <Form.TextArea rows='20' label='Bio' value={this.state.bio} name='bio'
                                           placeholder='Bio' onChange={this.handleChange}/>
                            <Button content='Update profile' onClick={this.handleSubmit} />
                        </Form.Group>
                        <Form.Group className='mediumcolumn' grouped>
                            <Form.Input fluid label='Twitter' value={this.state.twitter} name='twitter'
                                        placeholder='Twitter' onChange={this.handleChange}/>
                            <Form.Input fluid label='Google+' value={this.state.instagram} name='google'
                                        placeholder='Google+' onChange={this.handleChange}/>
                            <Form.Input fluid label='LinkedIn' value={this.state.linkedin} name='linkedin'
                                        placeholder='LinkedIn' onChange={this.handleChange}/>
                            <Divider />
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