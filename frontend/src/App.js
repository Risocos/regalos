import React, {Component} from 'react';
import './styling/App.css';
import {NavBar} from './components/NavBar';
import {Footer} from "./components/Footer";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {CreateProject} from './components/CreateProject';
import {Account} from "./components/Account";
import {ProjectOverview} from './components/ProjectOverview';
import {SingleProjectOverview} from "./components/SingleProjectOverview";
import {PageNotFound} from "./responsecodes/PageNotFound";
import {AdminPanel} from "./components/AdminPanel";
import {UserPanel} from "./components/UserPanel";
import {ProjectPanel} from "./components/ProjectPanel";
import {Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import {ForbiddenAccess} from "./responsecodes/ForbiddenAccess";
import {EditProfile} from "./components/EditProfile";
import {Donation} from "./components/Donation";
import {MyProjects} from "./components/MyProjects";
import {EditProject} from "./components/EditProject";

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
        return (sessionStorage.getItem("token") === null)
    }

    renderAdminButtons() {
        if (sessionStorage.getItem("admin") === 'perhaps') {
            return (
                <Menu.Item>
                    <Menu.Menu>
                        <Menu.Item as={Link} to='/users'><Icon name='users'/>User Management</Menu.Item>
                        <Menu.Item as={Link} to='/projectpanel'><Icon name='calendar alternate outline'/>Project
                            Management</Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            )
        }
        else {
            return (
                <Menu.Item>
                    <Menu.Menu>
                        <Menu.Item as={Link} to='/myprojects'><Icon name='calendar outline'/>My projects</Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            )
        }
    }

    render() {
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
                        {this.renderAdminButtons()}
                        <Menu.Item as={Link} to='/login' onClick={this.handleLogout}>Logout</Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>

                        <div>
                            <NavBar togglesidebar={this.toggleSidemenu}/>
                            <Segment basic>
                                <Switch>
                                    <Route exact path="/" component={ProjectOverview}/>

                                    <Route path="/login" component={Login}/>
                                    <Route path="/signup" component={Register}/>
                                    <Route path="/users/:userId" component={Account}/>
                                    <Route path="/settings" component={EditProfile}/>
                                    <Route path="/paymentcancel" component={Donation}/>


                                    <Route exact path="/projects/create"
                                           render={() => (
                                               this.isAuthenticated() ? (<Redirect to='/login'/>) :
                                                   (<CreateProject/>)
                                           )}/>
                                    <Route exact path="/projects" component={ProjectOverview}/>
                                    <Route exact path="/myprojects" component={MyProjects}/>
                                    <Route exact path="/projects/edit/:projectId" component={EditProject}/>
                                    <Route exact path="/projects/:projectId" component={SingleProjectOverview}/>

                                    <Route path="/adminpanel" component={AdminPanel}/>
                                    <Route exact path="/users" component={UserPanel}/>
                                    <Route path="/projectpanel" component={ProjectPanel}/>

                                    <Route path="/403" component={ForbiddenAccess}/>
                                    <Route path="/404" component={PageNotFound}/>
                                    <Route component={PageNotFound}/>


                                </Switch>
                            </Segment>
                            <Footer />
                        </div>

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Router>
        );
    }
}

export default App;