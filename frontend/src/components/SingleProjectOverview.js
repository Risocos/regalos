import React, {Component} from 'react';
import {
    Header,
    Button,
    Image,
    Progress,
    Statistic,
    Grid,
    Dimmer,
    Form,
    Select,
    Input,
    Radio, TextArea, Checkbox, Container
} from "semantic-ui-react";
import "../styling/SingleProjectOverview.css";

export class SingleProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleOpen = () => this.setState({active: true});
    handleClose = () => this.setState({active: false});
    handleChange = (e, {value}) => this.setState({value});

    validate = () => {
        //TODO: Validate the donate form
    };

    render() {
        const options = [
            {key: 'm', text: 'Male', value: 'male'},
            {key: 'f', text: 'Female', value: 'female'},
        ];

        const {active} = this.state;
        const {value} = this.state;
        //TODO: funtionality of filters
        //TODO: Fill projectname, targetbudget etc with proper values
        //TODO: Posts, phoyoalbum, see what we can do

        //TODO: Add paymentsystem to donate form
        return (

            <div className="container">
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >
                    <Container>
                        <Form inverted>
                            <Form.Group widths='equal'>
                                <Form.Field control={Input} label='First name' placeholder='First name'/>
                                <Form.Field control={Input} label='Last name' placeholder='Last name'/>
                                <Form.Field control={Input} label='Email' placeholder='Email'/>
                            </Form.Group>
                            <Form.Group inline>
                                <label>Quantity</label>
                                <Form.Field control={Radio} label='I want to donate money' value='1'
                                            checked={value === '1'}
                                            onChange={this.handleChange}/>
                                <Form.Field control={Radio} label='I want to join the project' value='2'
                                            checked={value === '2'}
                                            onChange={this.handleChange}/>
                                <Form.Field control={Radio} label='I want to donate materials to the project.' value='3'
                                            checked={value === '3'}
                                            onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Field control={TextArea} label='Additional Information' placeholder='Anything else you want to share?'/>
                            <Form.Field control={Checkbox} label='I agree to the Terms and Conditions'/>
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                    </Container>
                </Dimmer>

                <Grid columns='equal'>
                    <Grid.Row>

                        <Grid.Column>
                            <p>Maybe recent updates, twitter messages about the project, photos, something like
                                that?</p>
                        </Grid.Column>

                        <Grid.Column width={10} style={{textAlign: "center"}}>
                            <Image src='http://via.placeholder.com/600x300' centered={true}/>
                            <Header as='h2'>ProjectName</Header>
                            <Header as='h3'>TargetBudget: $10000</Header>
                            <Statistic>
                                <Statistic.Value>5,550</Statistic.Value>
                                <Statistic.Label>Donators!</Statistic.Label>
                            </Statistic>
                            <Progress percent={83} progress success>
                                $8300
                            </Progress>
                            <p>Here will be the desciption of the project. It will be a max number of words to keep it
                                small.</p>
                            <Header> <Button size='massive' color='green' onClick={this.handleOpen}> Donate
                                now! </Button> </Header>
                            <Button circular color='facebook' icon='facebook'/>
                            <Button circular color='twitter' icon='twitter'/>
                            <Button circular color='linkedin' icon='linkedin'/>
                            <Button circular color='google plus' icon='google plus'/>
                            <Button circular color='instagram' icon='instagram'/>
                            <Header size='huge'>Project details</Header>
                            <p>A very detailed description. and maybe something with photoalbum</p>
                            <Header size='huge'>Project progress</Header>
                            <p>Project progress and smething with photoalbum and being able to make posts.</p>
                        </Grid.Column>

                        <Grid.Column>
                            <Header size="large">Information</Header>
                            <p> Welcome to Regalos! On this website you will be able to see
                                countless of different projects from different kinds of people.
                                You can donate money, donate materials, and even apply to join
                                a project. Take a look around the projectoverview, pick out
                                your favorite projects. Or make an account and set up your own project!
                                Everything is possible.
                            </p>
                            <p><i>
                                Please notice that we verify accounts that are to be trusted.
                                It's your own responsibility to look out for your money, so please
                                make sure the project you are donating to is verified.
                            </i></p>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>

        )
    }
}