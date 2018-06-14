import React, {Component} from "react";
import {Button, Container, Grid, Header, Icon, Item} from "semantic-ui-react";
import '../styling/Account.css';
import axios from 'axios';
import {ProjectCard} from "./ProjectCard";
import {BACKEND_URL} from "../constants";

export class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '',
                email: '',
                username: '',
                image: '',
                bio: '',
                twitter: '',
                google: '',
                linkedin: '',
                projects: [],
            }
        };

        this.handleReport = this.handleReport.bind(this);
    }

    componentDidMount() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + this.props.location.pathname;

        axios.get(API_PATH, {
                headers: {
                    Authorization: TOKEN,
                }
            }
        ).then(res => {
            const data = res.data.user;
            console.log(data);

            this.setState({
                user: {
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    image: data.avatar,
                    bio: data.biography,
                    twitter: data.twitter,
                    google: data.google,
                    linkedin: data.linkedin,
                    projects: data.projects,
                }
            });
        })
    }

    handleReport() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = BACKEND_URL + "/users/report/" + this.state.user.id;
        console.log(TOKEN);
        axios.put(API_PATH, {}, {
            headers: {
                Authorization: TOKEN,
            }
        })
    }

    listProject(project) {
        return (
            <ProjectCard key={project.id}
                         id={project.id}
                         name={project.title}
                         desc={project.description}
                         target={project.target_budget}
                         achieved={project.current_budget}
                         cover={project.cover}
            />)
    }

    renderTwitter() {
        if(this.state.user.twitter!=null) {
        return(
            <a href={this.state.user.twitter}><Button circular color='twitter' icon='twitter' /></a>
        )}
    }

    renderGoogle() {
        if(this.state.user.google!=null) {
        return(
            <a href={this.state.user.google}><Button circular color='google plus' icon='google plus'/></a>
        )}
    }

    renderLinkedin() {
        if(this.state.user.linkedin!=null) {
        return(
            <a href={this.state.user.linkedin}><Button circular color='linkedin' icon='linkedin'/></a>
        )}
    }

    render() {
        return (
            <div>
                <div className='account-header'>
                    <Container text>
                        <Item.Group>
                            <Item>
                                <Item.Image circular size='small'
                                            src={this.state.user.image != null ? this.state.user.image : "http://localhost:5000/uploads/users/no_avatar.png"}/>
                                <Item.Content>
                                    <Item.Header as='h2'
                                                 style={{paddingTop: "0px"}}>
                                        {this.state.user.username}
                                    </Item.Header>
                                    <Item.Description>
                                        <div>
                                            <p>{this.state.user.bio}</p>
                                        </div>
                                    </Item.Description>
                                    <Item.Extra>
                                        {this.renderTwitter()}
                                        {this.renderLinkedin()}
                                        {this.renderGoogle()}
                                        <div style={{float: 'right'}}>
                                            <div>
                                                <Button onClick={this.handleReport} negative><Icon name='flag'/>Report user</Button>
                                            </div>
                                        </div>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
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
}
