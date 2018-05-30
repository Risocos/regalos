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
                    <Menu.Item as={Link}
                               to='/projects'
                               icon='calendar'
                               name='projects'
                               onClick={this.handleClick}/>
                    <Menu.Item as={Link}
                               to='/projects/create'
                               icon='add to calendar'
                               name='new project'
                               onClick={this.handleClick}/>
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
                               onClick={this.handleClick}/>
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
            const ACCOUNT_PATH = '/users/' + sessionStorage.getItem("user");
            return (
                <Menu.Menu position='right'>
                    <Menu.Item as={Link}
                               to={ACCOUNT_PATH}
                               icon='user circle'
                               name='account'
                               onClick={this.handleClick}
                    />
                    <Menu.Item as={Link}
                               to='/login'
                               name='logout'
                               onClick={this.handleLogout}/>
                </Menu.Menu>
            )
        }
        else {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item as={Link}
                               to='/login'
                               name='login'
                               onClick={this.toggleLoggedIn}/>
                    <Menu.Item as={Link}
                               to='/signup'
                               name='register'
                               onClick={this.handleClick}/>
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

