import React, {Component} from 'react';
import {Form, Message, Header, Button, Image, Progress, Statistic} from "semantic-ui-react";
import "./SingleProjectOverview.css";
import moment from 'moment';

const options = [
    {key: 'f', text: 'Filter', value: 'filter'},
    {key: 'p', text: 'Popularity', value: 'popularity'},
    {key: 't', text: 'Targetbudget', value: 'targetbudget'},
];

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
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Group className='projectgroupside' grouped>
                            <Image src='http://via.placeholder.com/300x1000'/>
                        </Form.Group>
                        <Form.Group className='projectgroupcenter' grouped>
                            <Image src='http://via.placeholder.com/600x300'/>
                            <Header as='h2'>ProjectName</Header>
                            <Header as='h3'>TargetBudget: $10000</Header>
                            <Statistic>
                                <Statistic.Value>5,550</Statistic.Value>
                                <Statistic.Label>Donators!</Statistic.Label>
                            </Statistic>

                                <Progress percent={83} progress success>
                                    $8300
                                </Progress>

                            <p>A small project Description of the project. This will be like 6 sentences. This is some
                                bullshit to see how it will look like.</p>
                            <Header> <Button size='massive' color='green'>
                                Donate now!
                            </Button>
                            </Header>
                            <Button circular color='facebook' icon='facebook'/>
                            <Button circular color='twitter' icon='twitter'/>
                            <Button circular color='linkedin' icon='linkedin'/>
                            <Button circular color='google plus' icon='google plus'/>
                            <Button circular color='nstagram' icon='instagram'/>

                            <p>A very detailed description. and maybe something with photos</p>

                        </Form.Group>
                        <Form.Group className='projectgroupside' grouped>
                            <Image src='http://via.placeholder.com/300x1000'/>
                        </Form.Group>
                    </Form.Group>

                </Form>
            </div>
        )
    }
}