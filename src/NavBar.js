import React, { Component } from 'react';
import { Menu, Icon, Search } from 'semantic-ui-react';
import './NavBar.css';


export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            currentPage: 'home',
        };

        this.handleClick = this.handleClick.bind(this);
    }

    toggleLoggedIn = () => this.setState({loggedIn: !this.state.loggedIn});

    handleClick(event, data) {
        let nextPage = data.name;
        this.setState({
            currentPage: nextPage,
        });
        alert(nextPage + " button has been clicked!");
    }



    leftMenu() {
        if(this.state.loggedIn) {
            return (
                <Menu.Menu>
                    <Menu.Item name='projects' onClick={this.handleClick}>
                        <Icon name='calendar'/>
                        Projects
                    </Menu.Item>
                    <Menu.Item name='newproject' onClick={this.handleClick}>
                        <Icon name='add to calendar'/>
                        Create a project
                    </Menu.Item>
                </Menu.Menu>
            );
        }
        else {
            return(
                <Menu.Menu>
                    <Menu.Item name='projects' onClick={this.handleClick}>
                        <Icon name='calendar' />
                        Projects
                    </Menu.Item>
                </Menu.Menu>
            );
        }
    }

    middleMenu() {
        return(
            <Menu.Menu>
                <Search category/>
            </Menu.Menu>
        )
    }

    rightMenu() {
        if(this.state.loggedIn) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item name='account' onClick={this.handleClick}>
                        <Icon name='user circle' />
                        Account
                    </Menu.Item>
                    <Menu.Item name='logout' onClick={this.toggleLoggedIn}>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            )
        }
        else {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item name='login' onClick={this.toggleLoggedIn}>
                        Login
                    </Menu.Item>
                    <Menu.Item name='register' onClick={this.handleClick}>
                        Register
                    </Menu.Item>
                </Menu.Menu>
            )
        }
    }

    render() {
        return (
            <div>
                <Menu borderless>
                    {this.leftMenu()}
                    {this.middleMenu()}
                    {this.rightMenu()}
                </Menu>
            </div>
        )
    }
}

