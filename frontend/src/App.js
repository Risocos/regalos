import React, {Component} from 'react';
import './styling/App.css';
import {NavBar} from './components/NavBar';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {CreateProject} from './components/CreateProject';
import {Account} from "./components/Account";
import {ProjectOverview} from './components/ProjectOverview'
import {SingleProjectOverview} from "./components/SingleProjectOverview";
import {PageNotFound} from "./responsecodes/PageNotFound";
import {AdminPanel} from "./components/AdminPanel";
import {UserPanel} from "./components/UserPanel";
import {ProjectPanel} from "./components/ProjectPanel";
import {Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import {ForbiddenAccess} from "./responsecodes/ForbiddenAccess";
import {EditProfile} from "./components/EditProfile";

class App extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleSidemenu = () => this.setState({visible: !this.state.visible});

    handleLogout() {
        sessionStorage.clear();
        this.toggleSidemenu();
    }

    isAuthenticated() {
        return (sessionStorage.getItem("token")===null)
    }


    render() {
        const BASEPATH = "http://127.0.0.1:5000";
        const USER = '/users/' + sessionStorage.getItem("user");
        return (
            <Router>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu}
                             animation='overlay'
                             width='thin'
                             direction='right'
                             visible={this.state.visible}
                             icon='labeled'
                             vertical
                             inverted>
                        <Menu.Item onClick={this.toggleSidemenu}><Icon name='arrow circle right'/></Menu.Item>
                        <Menu.Item>
                            <Menu.Menu>
                                <Menu.Item as={Link} to={USER}><Icon name='user circle'/>Profile</Menu.Item>
                                <Menu.Item as={Link} to='/settings'><Icon name='pencil'/>Edit settings</Menu.Item>
                            </Menu.Menu>
                        </Menu.Item>
                        <Menu.Item as={Link} to='/login' onClick={this.handleLogout}>Logout</Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>

                        <div>
                            <NavBar toggleSidebar={this.toggleSidemenu}/>
                            <Segment basic>
                                <Switch>
                                    <Route exact path="/"
                                           render={props => <ProjectOverview basepath={BASEPATH}/>}/>

                                    <Route path="/login"
                                           render={props => <Login basepath={BASEPATH}/>}/>
                                    <Route path="/signup"
                                           render={props => <Register basepath={BASEPATH}/>}/>
                                    <Route path="/users/:userId"
                                           component={Account}/>
                                    <Route path="/settings"
                                           render={props => <EditProfile basepath={BASEPATH}/>}/>


                                    <Route exact path="/projects/create"
                                           render={() => (
                                               this.isAuthenticated() ? (<Redirect to='/login'/>) :
                                                   (<CreateProject basepath={BASEPATH}/>)
                                           )}/>
                                    <Route exact path="/projects"
                                           render={props => <ProjectOverview basepath={BASEPATH}/>}/>
                                    <Route exact path="/projects/:projectId"
                                           component={SingleProjectOverview}/>

                                    <Route path="/adminpanel"
                                           component={AdminPanel}/>
                                    <Route exact path="/users"
                                           render={props => <UserPanel basepath={BASEPATH}/>}/>
                                    <Route path="/projectpanel"
                                           render={props => <ProjectPanel basepath={BASEPATH}/>}/>

                                    <Route path="/403" component={ForbiddenAccess}/>
                                    <Route path="/404" component={PageNotFound}/>
                                    <Route component={PageNotFound}/>
                                </Switch>
                            </Segment>
                        </div>

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Router>
        );
    }
}

export default App;