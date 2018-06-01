import React, {Component} from 'react';
import {Button, Container, Form, Image, Message} from "semantic-ui-react";
import '../styling/EditProfile.css';

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
            current: '',
            new: '',
            reNew: '',
            match: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    }

    updatePassword() {
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
                        </Form.Group>
                        <Form.Group className='mediumcolumn' grouped>
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