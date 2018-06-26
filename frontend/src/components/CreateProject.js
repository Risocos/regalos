import React, {Component} from 'react';
import {Container, Form, Image, Message, Dropdown, Button} from "semantic-ui-react";
import "../styling/CreateProject.css";
import "../styling/Register.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {COUNTRIES, BACKEND_URL} from "../constants";
import {Link} from "react-router-dom";


//Installed dependencies for this:
// DatePicker -> to select start and end dates,
// moment -> required in DatePicker,
//information for field validation: https://goshakkk.name/instant-form-fields-validation-react/
export class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Form values
            name: '',
            desc: '',
            plan: '',
            imagePath: '',
            start: moment(),
            end: moment(),
            target: '',
            collabs: [],
            country: '',

            //Utility variables
            formMessage: [],
            uploadedFile: '',
            imagePreview: BACKEND_URL + '/uploads/users/no_avatar.png',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCollabInputChange = this.handleCollabInputChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStartDateChange(e) {
        this.setState({
            start: e,
        })
    }

    handleEndDateChange(e) {
        this.setState({
            end: e,
        })
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    }

    handleCollabInputChange(event, text) {
        this.setState({
            collabs: text.value,
        });
    }

    handleImageChange(e) {

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                uploadedFile: file,
                imagePreview: reader.result,
            });
        };

        reader.readAsDataURL(file);
    }

    handleCountryChange = (e, d) => this.setState({country: d.value});

    handleSubmit() {

        const API_PATH = BACKEND_URL + '/projects';
        const TOKEN = "Bearer " + sessionStorage.getItem("token");

        let data = new FormData();
        data.append("title", this.state.name);
        data.append("short_description", this.state.description);
        data.append("project_plan", this.state.plan);
        data.append("cover", this.state.uploadedFile);
        data.append("start_date", this.state.start.unix().toString());
        data.append("end_date", this.state.end.unix().toString());
        this.state.collabs.forEach((collab) => {
            data.append("collaborators[]", collab)
        });
        data.append("target_budget", this.state.target);
        data.append("country_id", this.state.country);

        axios.post(API_PATH, data, {
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            let message = (
                <Message success>
                    <Message.Header style={{padding: "0px"}}>Project created</Message.Header>
                </Message>
            );
            this.setState({
                formMessage: message,
            })
        }).catch(err => {
            const errors = err.response.data.errors;
            let items = [];
            if (err.response.status === 422) {
                if (errors.title)
                    items.push(...errors.title);
                if (errors.country_id)
                    items.push(...errors.country_id);
                if (errors.project_plan)
                    items.push(...errors.project_plan);
                if (errors.target_budget)
                    items.push(...errors.target_budget);
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
                formMessage: MESSAGE,
            })
        });

    }

    render() {
        //This needs to be replaced by collecting all users from app and showing these
        let collaboratorsAvailable = [
            {key: 0, value: 'Melle', text: 'Melle'},
            {key: 1, value: 'Thijs', text: 'Thijs'},
            {key: 2, value: 'Romy', text: 'Romy'},
            {key: 3, value: 'Jan', text: 'Jan'},
            {key: 4, value: 'Sander', text: 'Sander'}];

        let countries = [];
        COUNTRIES.map(country => {
            countries.push({
                key: country.countryCode,
                value: country.countryCode,
                flag: country.countryCode,
                text: country.name
            });
            return null;
        });

        return (
            <Container>
                <div className='message'>
                    {this.state.formMessage}
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Group className='formgroup' grouped>
                            <Form.Input fluid label='Project name' value={this.state.name} name='name'
                                        placeholder='Project Name' onChange={this.handleInputChange}/>
                            <Form.TextArea rows='7' label='Short description' name='desc'
                                           placeholder='Short description' onChange={this.handleInputChange}/>
                            <Form.TextArea rows='15' label='Project Plan' name='plan' placeholder='Project Plan'
                                           onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <Image className='image' src={this.state.imagePreview} size='medium' rounded/>
                            <input type='file' onChange={(e) => this.handleImageChange(e)}/>
                            <label>Start Date</label><DatePicker name='start' selected={this.state.start}
                                                                 onChange={this.handleStartDateChange}/>
                            <label>End Date</label><DatePicker name='end' selected={this.state.end}
                                                               onChange={this.handleEndDateChange}/>
                            <Form.Input fluid label='Target budget' name='target' placeholder='$0'
                                        onChange={this.handleInputChange}/>
                            <label>Country</label><Dropdown placeholder='Select a country' fluid search selection
                                                            options={countries} onChange={this.handleCountryChange}/>
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <Dropdown placeholder='Collaborator name' fluid multiple search selection
                                      options={collaboratorsAvailable} onChange={this.handleCollabInputChange}/>
                        </Form.Group>
                    </Form.Group>
                    <Button.Group>
                        <Button as={Link} to='/'>Cancel</Button>
                        <Button.Or/>
                        <Button positive>Create Project</Button>
                    </Button.Group>
                </Form>
            </Container>
        )
    }
}