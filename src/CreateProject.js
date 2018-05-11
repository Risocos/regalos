import React, {Component} from 'react';
import {Form, Image, Message} from "semantic-ui-react";
import "./CreateProject.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {FileUploader} from './FileUploader';


//Installed dependencies for this:
// DatePicker -> to select start and end dates,
// moment -> required in DatePicker,
//information for field validation: https://goshakkk.name/instant-form-fields-validation-react/
export class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Form values
            owner: '',
            desc: '',
            plan: '',
            imagePath: '/white-image.png',
            start: moment(),
            end: moment(),
            target: 0,
            collabs: [],

            //Utility variables
            formMessage: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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

    isANumber(string) {
        return !isNaN(parseFloat(string)) && isFinite(string);
    }

    validate() {
        //Check if fields are empty, perhaps replacable with ... in arguments and using .map
        let isValid = true;
        let message = [];
        if(this.state.owner==='') {
            message.push("Owner is empty")
            isValid = false;
        }
        if(this.state.desc==='') {
            message.push("Description is empty")
            isValid = false;
        }
        if(this.state.plan==='') {
            message.push("Project plan is empty")
            isValid = false;
        }
        if(this.state.target===0) {
            message.push("Target budget is empty")
            isValid = false;
        }

        //Check if start date is before the end date
        //If not, add error message and translate date to string
        if(this.state.start >= this.state.end) {
            let startDate = this.state.start.format("DD-MMMM-YYYY")
            let endDate = this.state.end.format("DD-MMMM-YYYY")
            message.push("Start date must be before end date. " +
                "Start: " + startDate + " End: " + endDate);
            isValid = false;
        }

        //Check if target budget is a number
        if(!this.isANumber(this.state.target)) {
            message.push("Target budget is not a number, please insert numbers only. Example: '10.45'")
            isValid = false;
        }

        const errorMessage = (
            <Message error>
                <Message.Header>Oops! Something went wrong!</Message.Header>
                <Message.List>
                    {message.map((value) => <Message.Item key={value}>{value}</Message.Item>)}
                </Message.List>
            </Message>
        );

        this.setState({
            formMessage: errorMessage
        });

        return isValid;

    }

    handleSubmit(event) {
        //TODO: handle submit with server
        if (!this.validate()) {
            console.log("should error")
        }
        else
        {
            console.log("should success ")
            let message = <Message success header="Project created"/>;

            this.setState({
                 formMessage: message,
            })
        }
    }

    render() {
        let collaboratorsAvailable = [
            {key: 0, value: 'Melle', text: 'Melle'},
            {key: 1, value: 'Thijs',text: 'Thijs'},
            {key: 2, value: 'Romy',text: 'Romy'},
            {key :3, value: 'Jan',text: 'Jan'},
            {key: 4, value: 'Sander',text: 'Sander'}];

        return (
            <div className="container">
                <div>
                    {this.state.formMessage}
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group grouped>
                        <Form.Input fluid label='Project owner' value={this.state.owner} name='owner' placeholder='Project Owner' onChange={this.handleInputChange}/>
                        <Form.TextArea label='Short description' name='desc' placeholder='Short description' onChange={this.handleInputChange}/>
                        <Form.TextArea rows='7' label='Project Plan' name='plan' placeholder='Project Plan'  onChange={this.handleInputChange}/>

                        <Image src={this.state.imagePath} size='medium' rounded />
                        <FileUploader />
                        <label>Start Date</label><DatePicker name='start' selected={this.state.start} onChange={this.handleStartDateChange}/>
                        <label>End Date</label><DatePicker name='end' selected={this.state.end} onChange={this.handleEndDateChange}/>
                        <Form.Input fluid label='Target budget' name='target' placeholder='$0' onChange={this.handleInputChange}/>

                        <Form.Select fluid label='Add Collaborator' placeholder='Collaborator name' name='collabs' options={collaboratorsAvailable} onChange={this.handleInputChange}/>

                    </Form.Group>
                        <Form.Button content="Create Project" positive/>
                        <Form.Button content="Cancel" />
                </Form>
            </div>
        )
    }
}