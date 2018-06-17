import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    Container,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Input,
    Progress,
    Radio,
    Statistic,
    Tab,
    TextArea
} from "semantic-ui-react";
import "../styling/SingleProjectOverview.css";
import axios from 'axios';
import {BACKEND_URL, COUNTRIES, FRONTEND_URL} from "../constants";
import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import {MAPS_KEY} from "../APIkeys";
import {UserCard} from "./UserCard";

export class SingleProjectOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            target: "",
            donators_count: 0,
            achieved: 0,
            description: "",
            plan: "",
            collaborators: [],
            donators: [],
            country: "",
            progress: "Project progress and something with photo albums or blog posts",
            cover: "",

            //Donateform state
            anonymous: false,
            radio: '0',
            terms: false,
            amount: 0,
            item: '',
        };


        this.handleReport = this.handleReport.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const API_PATH = BACKEND_URL + this.props.location.pathname;
        axios.get(API_PATH)
            .then((response) => {
                    const projectdata = response.data.project;
                    let collaborators = [];
                    let donators = [];
                    let country = this.findCountry(projectdata.country_id);

                    response.data.donators.forEach(donator => {
                        if (!donators.includes(donator.donator_id))
                            donators.push(donator.donator_id)
                    });

                    response.data.contributors.forEach(contributor => {
                        if (!collaborators.includes(contributor.user_id))
                            collaborators.push(contributor.user_id)
                    });

                    this.setState({
                        id: projectdata.id,
                        title: projectdata.title,
                        target: projectdata.target_budget,
                        donators_count: projectdata.donators,
                        cover: projectdata.cover,
                        achieved: projectdata.current_budget,
                        description: projectdata.short_description,
                        plan: projectdata.project_plan,
                        collaborators: this.createUserCard(collaborators),
                        donators: this.createUserCard(donators),
                        country: country,
                    });
                }
            ).catch(err => {
                if (err.response && err.response.status === 404) {
                    this.props.history.push('/404')
                }
            }
        )
    }

    findCountry(cc) {
        let name = '';
        COUNTRIES.map((countryObject) => {
            if (countryObject.countryCode === cc) {
                name = countryObject.name;
            }
            return null;
        });
        return name;
    }

    isANumber(string) {
        return !isNaN(parseFloat(string)) && isFinite(string);
    }

    validateForm() {
        let isValid = true;
        if (!this.isANumber(this.state.amount)) {
            isValid = false;
        }

        return isValid;
    }

    getMaps() {
        let src = "";
        if (this.state.country === "") {
            return null;
        }
        else {
            src = "https://www.google.com/maps/embed/v1/place?key=" + MAPS_KEY + "&q=" + this.state.country;
            return (
                <div className='googlemaps'>
                    <div className="gmap_canvas">
                        <iframe title="maps" width="100%" height="500" id="gmap_canvas"
                                src={src}
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                    </div>
                </div>
            )
        }
    }

    handleOpen = () => this.setState({active: true});
    handleClose = () => this.setState({active: false});
    handleChange = (e, {value}) => this.setState({radio: value});
    toggleAnonymous = () => this.setState({anonymous: !this.state.anonymous, radio: '1'});
    handleAmount = (e, d) => this.setState({amount: d.value});
    handleItem = (e, d) => this.setState({item: d.value});
    handleTerms = () => this.setState({terms: !this.state.terms});

    handleReport() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/projects/report/" + this.state.id;
        console.log(TOKEN);
        axios.put(API_PATH, {}, {
            headers: {
                Authorization: TOKEN,
            }
        })
    }

    handleSubmit() {
        if (!this.validateForm())
            return;

        const TOKEN = 'Bearer ' + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + '/paypal/create-payment';
        const RETURN_URL = window.location.href;
        const CANCEL_URL = FRONTEND_URL + '/projects';

        axios.post(API_PATH, {
            amount: this.state.amount,
            project_id: this.state.id,
            return_url: RETURN_URL,
            cancel_url: CANCEL_URL,
        }, {
            headers: {
                Authorization: TOKEN,
            }
        }).then(res => {
            window.location.href = res.data.approval_url;
        })
    }

    /*All methods that return parts of the view*/
    returnProgress() {
        let result = (this.state.achieved / this.state.target * 100).toFixed(2);
        if (isNaN(result)) {
            return 0;
        }
        else {
            return result;
        }
    }

    returnDetailsTab() {
        return (
            <Tab.Pane>
                <Header as='h3'> Country: {this.state.country}</Header>
                <Header size='huge'>Project plan</Header>
                <p>{this.state.plan}</p>
                {this.getMaps()}
            </Tab.Pane>
        )
    }

    returnProgressTab() {
        return (
            <Tab.Pane>
                <Header size='huge'>Project progress</Header>
                <p>Project progress and something with photo album and being able to make posts.</p>
            </Tab.Pane>
        )
    }

    returnDonatorsTab() {
        return (
            <Tab.Pane>
                <Header size='huge'>Donators</Header>
                <Grid columns={3}>
                    {this.state.donators}
                </Grid>
            </Tab.Pane>
        )
    }

    returnCollaboratosTab() {
        return (
            <Tab.Pane>
                <Header size='huge'>Collaborators</Header>
                <Grid columns={3}>
                    {this.state.collaborators}
                </Grid>
            </Tab.Pane>
        )
    }

    createUserCard(users) {
        let cardsToRender = [];
        users.forEach(user => {
            cardsToRender.push(<UserCard key={user} user_id={user}/>)
        });
        return cardsToRender;
    }

    render() {

        const {active} = this.state;
        const {value} = this.state;

        //Constants used for rendering the tabs at the bottom of the page
        const panes = [
            {menuItem: 'Details', render: () => this.returnDetailsTab()},
            {menuItem: 'Progress', render: () => this.returnProgressTab()},
            {menuItem: 'Donators', render: () => this.returnDonatorsTab()},
            {menuItem: 'Collaborators', render: () => this.returnCollaboratosTab()}
        ];

        //Constants used for sharing the project
        const shareTitle = "Please help me by donating to my project: " + this.state.title;
        const shareUrl = window.location.href;

        //TODO: functionality of filters
        //TODO: Posts, photo album, see what we can do

        //TODO: Add payment system to donate form
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
                                <Form.Group className='leftcolumn' grouped>
                                    <Form.Field control={Input}
                                                label='Email'
                                                placeholder='Email'
                                                disabled={this.state.anonymous}/>
                                    <Form.Field control={Input}
                                                label='Firstname'
                                                placeholder='Firstname'
                                                disabled={this.state.anonymous}/>
                                    <Form.Field control={Input}
                                                label='Lastname'
                                                placeholder='Lastname'
                                                disabled={this.state.anonymous}/>
                                    <Form.Field control={Checkbox}
                                                label='I want to donate anonymous'
                                                onChange={this.toggleAnonymous}/>
                                </Form.Group>

                                <Form.Group className='middlecolumn' grouped>
                                    <label className='label'>How do you want to help us out?</label>
                                    <Form.Field>
                                        <Radio
                                            label='I want to donate money'
                                            value='1'
                                            checked={this.state.radio === '1'}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='I want to donate materials to the project'
                                            value='2'
                                            disabled={this.state.anonymous}
                                            checked={this.state.radio === '2'}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio
                                            label='I want to join this project'
                                            value='3'
                                            disabled={this.state.anonymous}
                                            checked={this.state.radio === '3'}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group className='rightcolumn' grouped>
                                    <Form.Field control={Input}
                                                label='How much would you like to donate?'
                                                disabled={this.state.radio !== '1'}
                                                placeholder='e.g. 50'
                                                onChange={this.handleAmount}/>
                                    <Form.Field control={TextArea}
                                                label='What kind of materials would you like to donate?'
                                                placeholder='e.g. Clothes'
                                                disabled={value !== '2'}
                                                onChange={this.handleItem}/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Field control={Checkbox}
                                        onChange={this.handleTerms}
                                        label='I agree to the Terms and Conditions'/>
                            <Button
                                disabled={!this.state.terms}
                                onClick={this.handleSubmit}
                                positive><Icon name='paypal'/>Donate!</Button>
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
                                <Button onClick={this.handleReport} negative><Icon name='flag'/>Report this
                                    project</Button>
                            </div>
                        </Grid.Column>

                        <Grid.Column textAlign="center" width={10}>
                            <Image
                                src={this.state.cover != null ? this.state.cover : 'http://via.placeholder.com/600x400'}
                                centered={true}/>
                            <Header as='h1'>{this.state.title}</Header>
                            <Header as='h3'>Target Budget: €{this.state.target}</Header>
                            <Header as='h3'>Achieved Budget: €{this.state.achieved}</Header>
                            <Statistic>
                                <Statistic.Value>{this.state.donators_count}</Statistic.Value>
                                <Statistic.Label>Donators!</Statistic.Label>
                            </Statistic>

                            <Progress percent={this.returnProgress()} progress
                                      success>
                                ${this.state.achieved}
                            </Progress>

                            <Tab renderActiveOnly panes={panes}/>

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