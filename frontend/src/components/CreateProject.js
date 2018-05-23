import React, {Component} from 'react';
import {Container, Form, Image, Message, Dropdown} from "semantic-ui-react";
import "../styling/CreateProject.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


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
            target: 0,
            collabs: [],

            //Utility variables
            formMessage: [],
            uploadedFile: '',
            imagePreview: '/white-image.png',
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

    isANumber(string) {
        return !isNaN(parseFloat(string)) && isFinite(string);
    }

    validate() {
        let isValid = true;
        let messages = [];
        if (this.state.name === '') {
            messages.push("Name is empty");
            isValid = false;
        }
        if (this.state.desc === '') {
            messages.push("Description is empty");
            isValid = false;
        }
        if (this.state.plan === '') {
            messages.push("Project plan is empty");
            isValid = false;
        }
        if (this.state.target === 0) {
            messages.push("Target budget is empty");
            isValid = false;
        }

        //Check if start date is before the end date
        //If not, add error message and translate date to string
        if (this.state.start >= this.state.end) {
            let startDate = this.state.start.format("DD-MMMM-YYYY");
            let endDate = this.state.end.format("DD-MMMM-YYYY");
            messages.push("Start date must be before end date. " +
                "Start: " + startDate + " End: " + endDate);
            isValid = false;
        }

        //Check if target budget is a number
        if (!this.isANumber(this.state.target)) {
            messages.push("Target budget is not a number, please insert numbers only. Example: '10.45'");
            isValid = false;
        }

        const errorMessage = (
            <Message error>
                <Message.Header>Oops! Something went wrong!</Message.Header>
                <Message.List>
                    {messages.map((value) => <Message.Item style={{height: '20px'}} key={value}>{value}</Message.Item>)}
                </Message.List>
            </Message>
        );

        this.setState({
            formMessage: errorMessage
        });

        return isValid;

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
        //TODO: handle submit with server
        if (!this.validate()) {
        }
        else {
            const items = [
                this.state.name,
                this.state.desc,
                this.state.plan,
                this.state.start.format("DD-MMMM-YYYY"),
                this.state.end.format("DD-MMMM-YYYY"),
                this.state.target,
                this.state.collabs,
            ];
            let message = <Message success>
                <Message.Header>Project created</Message.Header>
                <Message.List>
                    {items.map((value) => <Message.Item style={{height: '20px'}} key={value}>{value}</Message.Item>)}
                </Message.List>
            </Message>;

            this.setState({
                formMessage: message,
            })
        }
    }

    render() {
        //This needs to be replaced by collecting all users from app and showing these
        let collaboratorsAvailable = [
            {key: 0, value: 'Melle', text: 'Melle'},
            {key: 1, value: 'Thijs', text: 'Thijs'},
            {key: 2, value: 'Romy', text: 'Romy'},
            {key: 3, value: 'Jan', text: 'Jan'},
            {key: 4, value: 'Sander', text: 'Sander'}];

        let {imagePreview} = this.state.imagePreview;

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
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <Dropdown placeholder='Collaborator name' fluid multiple search selection
                                      options={collaboratorsAvailable} onChange={this.handleCollabInputChange}/>
                        </Form.Group>
                    </Form.Group>
                    <Form.Button content="Create Project" positive/>
                    <Form.Button content="Cancel"/>
                </Form>
            </Container>
        )
    }
}