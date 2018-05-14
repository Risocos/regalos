import React, {Component} from 'react';
import {Form, Message, Card, Grid, Image} from "semantic-ui-react";
import "./ProjectOverview.css";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {FileUploader} from './FileUploader';

const options = [
    { key: 'f', text: 'Filter', value: 'filter' },
    { key: 'p', text: 'Popularity', value: 'popularity' },
    { key: 't', text: 'Targetbudget', value: 'targetbudget' },
];

//Installed dependencies for this:
// DatePicker -> to select start and end dates,
// moment -> required in DatePicker,
//information for field validation: https://goshakkk.name/instant-form-fields-validation-react/
export class ProjectOverview extends Component {
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        //TODO: handle submit with server
        console.log(this.state.collabs)
        if (!this.validate()) {
        }
        else {
            let message = <Message success>
                <Message.Header>Project created</Message.Header>
                <p>
                    Go to your project!
                    {//TODO: create a link to newly created project
                    }
                </p>
            </Message>;

            this.setState({
                formMessage: message,
            })
        }
    }

    render() {
        //TODO: Add navbar
        
        //TODO: funtionality of filters
        return (
            <div className="container">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Group className='formgroup' grouped>
                            <Form.Select label='Filter' options={options} placeholder='Filter'
                                           onchange={this.handleInputChange}/>


                            <Form.Field label='United States' control='input' type='checkbox' />
                            <Form.Field label='Europe' control='input' type='checkbox' />
                            <Form.Field label='Asia' control='input' type='checkbox' />
                            <Form.Field label='Australia' control='input' type='checkbox' />
                            <Form.Field label='Africa' control='input' type='checkbox' />

                            <Image src='http://via.placeholder.com/400x1000'/>

                        </Form.Group>
                        <Form.Group className='formgroup' grouped>

                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Elliot Baker'
                                            meta='Friend'
                                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Form.Group>
                        <Form.Group className='formgroup' grouped>
                            <Image src='http://via.placeholder.com/400x1200'/>
                        </Form.Group>
                    </Form.Group>

                </Form>
            </div>
        )
    }
}