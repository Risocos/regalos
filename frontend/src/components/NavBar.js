import React, {Component} from 'react';
import {Icon, Menu, Search} from 'semantic-ui-react';
import '../styling/NavBar.css';
import {Link} from "react-router-dom";
import {FRONTEND_URL, BACKEND_URL} from "../constants";
import axios from 'axios';


export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            currentPage: 'home',

            //Searchbar functionality
            isLoading: false,
            results: [],
            value: "",
            select: "",
        };

    }

    querySearch = (e, {value}) => {
        this.setState({isLoading: true, value});

        const API_PATH = BACKEND_URL + "/search";

        axios.get(API_PATH, {
            params: {
                q: this.state.value,
            }
        }).then(res => {
            let queryResultsProjects = [];
            let queryResultsUsers = [];

            res.data.projects.forEach(project => {
                queryResultsProjects.push({
                    key: project.id,
                    title: project.title,
                    category: "projects",
                })
            });
            res.data.users.forEach(user => {
                queryResultsUsers.push({
                    key: user.id,
                    title: user.username,
                    category: "users",
                })
            });


            this.setState({
                isLoading: false,
                results: {
                    projects: {
                        name: "Projects",
                        results: queryResultsProjects,
                    },
                    users: {
                        name: "Users",
                        results: queryResultsUsers,
                    }
                },
            })
        }).catch(err => {
            console.log(err)
        })
    };

    handleResultSelect = (e, {result}) => {
        let redirect = FRONTEND_URL + "/" + result.category + "/" + result.key;
        window.location.href = redirect;
    };

    leftMenu() {
        if (sessionStorage.length !== 0) {
            return (
                <Menu.Menu>
                    <Menu.Item as={Link}
                               to='/projects'
                               icon='calendar'
                               name='projects'
                    />
                    <Menu.Item as={Link}
                               to='/projects/create'
                               icon='add to calendar'
                               name='new project'
                    />
                </Menu.Menu>
            );
        }
        else {
            return (
                <Menu.Menu>
                    <Menu.Item as={Link}
                               to='/projects'
                               icon='calendar'
                               name='projects'
                    />
                </Menu.Menu>
            );
        }
    }

    middleMenu() {
        return (
            <Menu.Menu>
                <Menu.Item name='search'>
                    <Search
                        className="heightfix"
                        category
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.querySearch}
                        results={this.state.results}
                        value={this.state.value}
                        {...this.props}
                    />
                </Menu.Item>
            </Menu.Menu>
        )
    }

    rightMenu() {
        if (sessionStorage.length !== 0) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.props.togglesidebar}><Icon name='sidebar'/></Menu.Item>
                </Menu.Menu>
            )
        }
        else {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item as={Link}
                               to='/login'
                               name='login'
                    />
                    <Menu.Item as={Link}
                               to='/signup'
                               name='register'
                    />
                </Menu.Menu>
            )
        }
    }

    render() {
        return (
            <div>
                {this.state.select}
                <Menu>
                    {this.leftMenu()}
                    {this.middleMenu()}
                    {this.rightMenu()}
                </Menu>
            </div>
        )
    }
}

