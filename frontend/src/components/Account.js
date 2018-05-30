import React, {Component} from "react";
import {Button, Container, Grid, Header, Icon, Input, Item, Message, TextArea} from "semantic-ui-react";
import '../styling/Account.css';
import axios from 'axios';
import {ProjectCard} from "./ProjectCard";

export class Account extends Component {

    constructor(props) {
        super(props);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.valueChanged = this.valueChanged.bind(this);

        this.state = {
            editMode: false,
            isDeleting: false,
            isSaving: false,
            user: {
                id: '',
                email: '',
                username: '',
                image: '',
                bio: '',
                projects: [],
            }
        };
    }

    componentDidMount() {
        const BASEPATH = "http://127.0.0.1:5000";
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BASEPATH + this.props.location.pathname;

        axios.get(API_PATH, {
                headers: {
                    Authorization: TOKEN,
                }
            }
            ).then(res => {
                const data = res.data.user;
                this.setState({
                    user: {
                        email: data.email,
                        username: data.username,
                        image: 'http://via.placeholder.com/300x400',
                        bio: data.bio,
                        projects: data.projects,
                    }
                });
            })
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode});
    }

    deleteAccount() {
        //if(confirm('Are you sure? There is no going back!')) {
        this.setState({isDeleting: true});
        setTimeout(() => {
            alert('Your account is deleted');
            this.setState({isDeleting: false});
        }, 2000); // request delay simulation
        //}
    }

    saveUser() {
        // validate and send request
        this.setState({isSaving: true});
        setTimeout(() => {
            this.setState({isSaving: false});
            this.toggleEditMode();
        }, 2000); // request delay simulation
    }

    listProject(project) {
        return(
            <ProjectCard
                id={project.id}
                name={project.title}
                desc={project.description}
                target={project.target}
            />)
    }

    render() {
        return (
            <div>
                <div className='account-header'>
                    {this.state.editMode && <Message warning>You are in edit mode</Message>}
                    <Container text>
                        <Item.Group>
                            {(this.state.editMode) ? this.renderEditForm() : this.renderNormal()}
                        </Item.Group>
                    </Container>
                </div>
                <Container style={{margin: '80px'}}>
                    <Header as='h1'>Projects</Header>
                    <Grid columns={3}>
                        {this.state.user.projects.map(project => this.listProject(project))}
                    </Grid>
                </Container>
            </div>
        )
    }

    renderNormal() {
        return (
            <Item>
                <Item.Image size='small'
                            src={this.state.user.image}/>
                <Item.Content>
                    <Item.Header as='h2' style={{paddingTop: "0px"}}>{this.state.user.username}</Item.Header>
                    <Item.Description>
                        <div>
                            <p>{this.state.user.bio}</p>
                        </div>
                    </Item.Description>
                    <Item.Extra>
                        <Button circular color='twitter' icon='twitter'/>
                        <Button circular color='linkedin' icon='linkedin'/>
                        <Button circular color='google plus' icon='google plus'/>
                        <div style={{float: 'right'}}>
                            <div>
                                <Button icon labelPosition='left' onClick={this.toggleEditMode}>
                                    <Icon name='pencil'/> Edit
                                </Button>
                                <Button negative>Report user</Button>
                                {/*<Button color='red' icon labelPosition='left'
                                        onClick={this.deleteAccount} loading={this.state.isDeleting}>
                                    <Icon name='trash'/> Delete
                                </Button>*/}
                            </div>
                        </div>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }

    renderEditForm() {
        return (
            <Item>
                <Item.Image size='small'
                            src={this.state.user.image} />
                <Item.Content>
                    <Input name='username' defaultValue={this.state.user.username} onChange={this.valueChanged} />
                    <Item.Description>
                        <TextArea name='bio' autoHeight value={this.state.user.bio} />
                    </Item.Description>
                    <Item.Extra>
                        <Button circular color='twitter' icon='twitter'/>
                        <Button circular color='linkedin' icon='linkedin'/>
                        <Button circular color='google plus' icon='google plus'/>
                        <div style={{float: 'right'}}>
                            <Button icon color='green' labelPosition='left'
                                    onClick={this.saveUser} loading={this.state.isSaving}>
                                <Icon name='checkmark'/> Save
                            </Button>
                        </div>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }

    valueChanged = (e, { name, value }) => {
        let u = this.state.user;
        u[name] = value;
        this.setState({ user: u });
    }

}
