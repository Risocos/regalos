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
export class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectOwner: '',
            shortDescription: '',
            projectPlan: '',
            imagePath: '/white-image.png',
            startDate: moment(),
            endDate: moment(),
            targetBudget: 0,
            collaboratorsAvailable: [   {key: 0, value: 'Melle', text: 'Melle'},
                {key: 1, value: 'Thijs',text: 'Thijs'},
                {key: 2, value: 'Romy',text: 'Romy'},
                {key :3, value: 'Jan',text: 'Jan'},
                {key: 4, value: 'Sander',text: 'Sander'}],
            collaboratorsChosen: [],

            formMessage: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStartDateChange(e) {
        this.setState({
            startDate: e,
        })
    }

    handleEndDateChange(e) {
        this.setState({
            endDate: e,
        })
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
    }

    //Checks if form is filled in
    formFilled(owner, desc, plan, start, end, budget, collabs) {
        if(start >= end) return false;
        if(owner==='') return false;
        if(desc==='') return false;
        if(plan==='') return false;
        if(budget===0) return false;
        if(collabs.empty) return false;
        return true;
    }

    handleSubmit(event) {
        //TODO: handle submit with server
        let owner = this.state.projectOwner;
        let desc = this.state.shortDescription;
        let plan = this.state.projectPlan;
        let start = this.state.startDate;
        let end = this.state.endDate;
        let budget = this.state.targetBudget;
        let collabs = this.state.collaboratorsChosen;

        let message = null;

        if(this.formFilled(owner, desc, plan, start, end, budget, collabs)) {
            message = <Message success header="Project created"/>;
        }
        else message = <Message negative header="Information is missing"/>

        this.setState({
            formMessage: message,
        })
    }

    render() {
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group grouped>
                        <Form.Input fluid label='Project owner' value={this.state.projectOwner} name='projectOwner' placeholder='Project Owner' onChange={this.handleInputChange}/>
                        <Form.TextArea label='Short description' name='shortDescription' placeholder='Short description' onChange={this.handleInputChange}/>
                        <Form.TextArea rows='7' label='Project Plan' name='projectPlan' placeholder='Project Plan'  onChange={this.handleInputChange}/>

                        <Image src={this.state.imagePath} size='medium' rounded />
                        <FileUploader />
                        <label>Start Date</label><DatePicker name='startDate' selected={this.state.startDate} onChange={this.handleStartDateChange}/>
                        <label>End Date</label><DatePicker name='endDate' selected={this.state.endDate} onChange={this.handleEndDateChange}/>
                        <Form.Input fluid label='Target budget' name='targetBudget' placeholder='$0' onChange={this.handleInputChange}/>

                        <Form.Select fluid label='Add Collaborator' placeholder='Collaborator name' name='collaboratorsChosen' options={this.state.collaboratorsAvailable} onChange={this.handleInputChange}/>

                    </Form.Group>
                        <Form.Button content="Create Project" positive/>
                        <Form.Button content="Cancel" />
                </Form>
                <div>
                    {this.state.formMessage}
                </div>
            </div>
        )
    }
}