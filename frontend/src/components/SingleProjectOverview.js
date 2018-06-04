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
    Input,
    Radio, TextArea, Checkbox, Container, Icon
} from "semantic-ui-react";
import "../styling/SingleProjectOverview.css";
import axios from 'axios';
import {SERVER_URL, COUNTRIES} from "../constants";
import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

export class SingleProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            target: "",
            donators: 0,
            achieved: 0,
            description: "",
            plan: "",
            collaborators: "",
            country: "",
            progress: "Project progress and something with photo albums or blog posts",
        };
    }

    componentDidMount() {
        const API_PATH = SERVER_URL + this.props.location.pathname;
        axios.get(API_PATH)
            .then((response) => {
                    this.handleResponse(response);
                }
            ).catch(err => {
            if (err.response.status === 404) {
               this.props.history.push('/404')
            }
        })
    }

    findCountry(cc) {
        let name = '';
        COUNTRIES.map((countryObject) => {
            if(countryObject.countryCode===cc) {
                name = countryObject.name;
            }
            return null;
        });
        return name;
    }

    handleResponse(response) {
        let data = response.data.project;
        let country = this.findCountry(data.country_id);
        this.setState({
            title: data.title,
            target: data.target_budget,
            donators: data.donators,
            achieved: data.current_budget,
            description: data.short_description,
            plan: data.project_plan,
            collaborators: data.collaborators,
            country: country,
        })
    }

    returnProgress() {
        let result = (this.state.achieved / this.state.target * 100).toFixed(2);
        if (isNaN(result)) {
            return 0;
        }
        else {
            return result;
        }
    }

    handleOpen = () => this.setState({active: true});
    handleClose = () => this.setState({active: false});
    handleChange = (e, {value}) => this.setState({value});

    validate = () => {
        //TODO: Validate the donate form
    };

    render() {

        const {active} = this.state;
        const {value} = this.state;

        const shareTitle = "Please help me by donating to my project: " + this.state.title;
        const shareUrl = window.location.href;

        //TODO: funtionality of filters
        //TODO: Posts, phoyoalbum, see what we can do

        //TODO: Add paymentsystem to donate form
        return (

            <div className="container">
                {/*Donation form*/}
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >
                    <Container>
                        <Form inverted>
                            <Form.Group widths='equal'>
                                <Form.Field control={Input} label='Email' placeholder='Email'/>
                            </Form.Group>
                            <Form.Group inline>
                                <label>How do you want to help us out?</label>
                                <Form.Field>
                                    <Radio
                                        label='I want to donate money'
                                        value='1'
                                        checked={value === '1'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='I want to donate materials to the project'
                                        value='2'
                                        checked={value === '2'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='I want to join this project'
                                        value='3'
                                        checked={value === '3'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field control={TextArea} label='Additional Information'
                                        placeholder='Anything else you want to share?'/>
                            <Form.Field control={Checkbox} label='I agree to the Terms and Conditions'/>
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                    </Container>
                </Dimmer>
                {/*Donation form end*/}

                <Grid columns='equal'>
                    <Grid.Row>

                        <Grid.Column>
                            <Header> <Button size='massive' color='green' onClick={this.handleOpen}> Donate
                                now! </Button> </Header>

                            {/*Some buttons do not work in local environment due to API not excepting portnumbers in the URL*/}
                            <FacebookShareButton
                                url={shareUrl}
                                quote={shareTitle}
                            ><Button circular color='facebook' icon='facebook'/></FacebookShareButton>

                            <TwitterShareButton
                                url={shareUrl}
                                title={shareTitle}
                            ><Button circular color='twitter' icon='twitter'/></TwitterShareButton>

                            <LinkedinShareButton
                                url={shareUrl}
                                title={shareTitle}
                                description={shareUrl}
                            ><Button circular color='linkedin' icon='linkedin'/></LinkedinShareButton>

                            <GooglePlusShareButton
                                url={shareUrl}
                                title={shareTitle}
                            ><Button circular color='google plus' icon='google plus'/></GooglePlusShareButton>

                            <WhatsappShareButton
                                url={shareUrl}
                                title={shareTitle}
                            ><Button circular color='green' icon='whatsapp'/></WhatsappShareButton>

                            <div className="reportProject">
                                <Button negative><Icon name='flag'/>Report this project</Button>
                            </div>
                        </Grid.Column>

                        <Grid.Column textAlign="center" width={10}>
                            <Image src='http://via.placeholder.com/1000x300' centered={true}/>
                            <Header as='h1'>{this.state.title}</Header>
                            <Header as='h3'> Country: {this.state.country}</Header>
                            <Header as='h3'>Target Budget: €{this.state.target}</Header>
                            <Statistic>
                                <Statistic.Value>{this.state.donators}</Statistic.Value>
                                <Statistic.Label>Donators!</Statistic.Label>
                            </Statistic>

                            <Progress percent={this.returnProgress()} progress
                                      success>
                                ${this.state.achieved}
                            </Progress>
                            <p>{this.state.description}</p>
                            <Header size='huge'>Project details</Header>
                            <Header as='h3'>Collaborators: {this.state.collaborators}</Header>
                            <p>{this.state.plan}</p>
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
                                It is your own responsibility to look out for your money, so please
                                make sure the project you are donating to is verified.
                            </i></p>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>

        )
    }
}