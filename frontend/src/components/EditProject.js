import React, {Component} from 'react';
import {Button, Container, Dropdown, Form, Image, Message} from "semantic-ui-react";
import '../styling/EditProfile.css';
import axios from 'axios';
import {BACKEND_URL, COUNTRIES} from "../constants";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";


export class EditProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            short_description: '',
            project_plan: '',
            uploadedFile: '',
            imagePreview: '',
            end_date: moment(),
            target_budget: '',
            country_id: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
        const PROJECT_ID = this.props.location.pathname.substring(15);
        const API_PATH = BACKEND_URL + '/projects/' + PROJECT_ID;

        axios.get(API_PATH, {}).then(res => {
            const project = res.data.project;

            this.setState({
                title: project.title,
                short_description: project.short_description,
                project_plan: project.project_plan,
                target_budget: project.target_budget,
                country_id: project.country_id,
            })
        })
    }

    handleEndDateChange(e) {
        this.setState({
            end_date: e,
        })
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

    handleSubmit() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + this.props.location.pathname;

        let data = new FormData();
        data.append("title", this.state.title);
        data.append("short_description", this.state.description);
        data.append("project_plan", this.state.plan);
        data.append("cover", this.state.uploadedFile);
        data.append("end_date", this.state.end_date.unix().toString());
        data.append("target_budget", this.state.target);
        data.append("country_id", this.state.country);

        axios.patch(API_PATH, data, {
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => console.log(res)).catch(err => console.log(err))
    }

    handleCountryChange = (e, d) => this.setState({country: d.value});

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {
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
                            <Form.Input fluid label='Project title' value={this.state.title} name='title'
                                        placeholder='Project title' onChange={this.handleChange}/>
                            <Form.TextArea rows='7' label='Short description' name='description'
                                           placeholder='Short description' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <Form.TextArea rows='15' label='Project plan' name='plan' placeholder='Project Plan'
                                           onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <label>End date</label><DatePicker name='end_date' selected={this.state.end_date}
                                                               onChange={this.handleEndDateChange}/>
                            <Form.Input fluid label='Target budget' name='target' placeholder='$0'
                                        onChange={this.handleChange}/>
                            <label>Country</label><Dropdown placeholder='Select a country'
                                                            fluid search selection
                                                            options={countries} onChange={this.handleCountryChange}/>
                            <Image className='image' src={this.state.imagePreview} size='medium' rounded/>
                            <input type='file' onChange={(e) => this.handleImageChange(e)}/>
                        </Form.Group>
                    </Form.Group>
                    <Button.Group>
                        <Button>Cancel</Button>
                        <Button.Or/>
                        <Button positive>Save Changes</Button>
                    </Button.Group>
                </Form>
            </Container>
        )
    }
}