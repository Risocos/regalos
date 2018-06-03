import React, {Component} from "react";
import {Button, Container, Grid, Header, Icon, Item} from "semantic-ui-react";
import '../styling/Account.css';
import axios from 'axios';
import {ProjectCard} from "./ProjectCard";
import {SERVER_URL} from "../constants";

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
                projects: [],
            }
        };
    }

    componentDidMount() {
        const TOKEN = "Bearer " + sessionStorage.getItem("token");
        const API_PATH = SERVER_URL + this.props.location.pathname;

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

    listProject(project) {
        return (
            <ProjectCard key={project.id}
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
                    <Container text>
                        <Item.Group>
                            <Item>
                                <Item.Image size='small'
                                            src={this.state.user.image}/>
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
                                        <Button circular color='twitter' icon='twitter'/>
                                        <Button circular color='linkedin' icon='linkedin'/>
                                        <Button circular color='google plus' icon='google plus'/>
                                        <div style={{float: 'right'}}>
                                            <div>
                                                <Button negative><Icon name='flag'/>Report user</Button>
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
