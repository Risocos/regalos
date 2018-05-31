import React, {Component} from 'react';
import {Button, Icon, Menu, Search} from 'semantic-ui-react';
import '../styling/NavBar.css';
import {Link} from "react-router-dom";


export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            currentPage: 'home',
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, data) {
        let nextPage = data.name;
        this.setState({
            currentPage: nextPage,
        });
    }


    leftMenu() {
        if (sessionStorage.length!==0) {
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
        if (sessionStorage.length!==0) {
            return (
                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.props.toggleSidebar}><Icon name='sidebar'/></Menu.Item>
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

