import React, {Component} from 'react';
import {Form, Message, Container, Header, Button, Card, Grid} from "semantic-ui-react";
import "./SingleProjectOverview.css";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const options = [
    {key: 'f', text: 'Filter', value: 'filter'},
    {key: 'p', text: 'Popularity', value: 'popularity'},
    {key: 't', text: 'Targetbudget', value: 'targetbudget'},
];

//Installed dependencies for this:
// DatePicker -> to select start and end dates,
// moment -> required in DatePicker,
//information for field validation: https://goshakkk.name/instant-form-fields-validation-react/
export class SingleProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //Form values
            name: '',
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
        this.handleCollabInputChange = this.handleCollabInputChange.bind(this);
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
        let message = [];
        if (this.state.name === '') {
            message.push("Name is empty")
            isValid = false;
        }
        if (this.state.desc === '') {
            message.push("Description is empty")
            isValid = false;
        }
        if (this.state.plan === '') {
            message.push("Project plan is empty")
            isValid = false;
        }
        if (this.state.target === 0) {
            message.push("Target budget is empty")
            isValid = false;
        }


        //Check if target budget is a number
        if (!this.isANumber(this.state.target)) {
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


    render() {

        //TODO: funtionality of filters
        //TODO: Fill projectname, targetbudget etc with proper values
        return (
            <div className="container">

                <div>
                    {this.state.formMessage}
                </div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Group className='formgroup' grouped>

                            <b>adds</b>

                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            Image
                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <b>adds</b>
                        </Form.Group>
                    </Form.Group>
                    <Container text>
                        <Header as='h2'>ProjectName</Header>
                        <Header as='h3'>TargetBudget:</Header>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
                        <Button size='massive' color='green'>
                            Donate!
                        </Button>
                    </Container>

                </Form>
            </div>
        )
    }
}