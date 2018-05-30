import React, {Component} from 'react';
import {Menu, Icon, Search} from 'semantic-ui-react';
import '../styling/NavBar.css';
import {Link, NavLink} from "react-router-dom";


export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            currentPage: 'home',
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({loggedIn: !this.state.loggedIn});
    }

    componentWillMount() {
        if (sessionStorage.length !== 0) {
            this.setState({loggedIn: !this.state.loggedIn});
        }
    }

    handleLogout() {
        sessionStorage.clear();
        this.setState({loggedIn: !this.state.loggedIn});
    }

    handleClick(event, data) {
        let nextPage = data.name;
        this.setState({
            currentPage: nextPage,
        });
        //alert(nextPage + " button has been clicked!");
    }


    leftMenu() {
        if (this.state.loggedIn) {
            return (
                <Menu.Menu>
                    <Menu.Item name='projects' onClick={this.handleClick}>
                        <NavLink to='/projects'>
                            <Icon name='calendar'/>
                            Projects
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item name='newproject' onClick={this.handleClick}>
                        <Link to='/projects/create'>
                            <Icon name='add to calendar'/>
                            Create a project
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            );
        }
        else {
            return (
                <Menu.Menu>
                    <Menu.Item name='projects' onClick={this.handleClick}>
                        <Link to='/projects'>
                            <Icon name='calendar'/>
                            Projects
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            );
        }
    }

    middleMenu() {
        return (
            <Menu.Menu>
                <Menu.Item name='search'>
                    <Search category/>
                </Menu.Item>
            </Menu.Menu>
        )
    }

    rightMenu() {
        if (this.state.loggedIn) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item name='account' onClick={this.handleClick}>
                        <Link to='/profile'>
                            <Icon name='user circle'/>
                            Account
                        </Link>
                    </Menu.Item>
                    <Menu.Item name='logout' onClick={this.handleLogout}>
                        <Link to='/login'>
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            )
        }
        else {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item name='login' onClick={this.toggleLoggedIn}>
                        <Link to='/login'>
                            Login
                        </Link>
                    </Menu.Item>
                    <Menu.Item link name='register' onClick={this.handleClick}>
                        <Link to='/signup'>
                            Register
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            )
        }
    }

    render() {
        return (
            <div>
                <Menu>
                    {this.leftMenu()}
                    {this.middleMenu()}
                    {this.rightMenu()}
                </Menu>
            </div>
        )
    }
}

