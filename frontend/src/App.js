import React, {Component} from 'react';
import './styling/App.css';
import {NavBar} from './components/NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {CreateProject} from './components/CreateProject';
import {Account} from "./components/Account";
import {ProjectOverview} from './components/ProjectOverview'
import {SingleProjectOverview} from "./components/SingleProjectOverview";
import {PageNotFound} from "./components/PageNotFound";
import {AdminPanel} from "./components/AdminPanel";
import {UserPanel} from "./components/UserPanel";
import {ProjectPanel} from "./components/ProjectPanel";

class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
        }
    }

    toggleLoggedIn = () => this.setState({loggedIn: !this.state.loggedIn});

    render() {
        const BASEPATH = "http://127.0.0.1:5000";
        return (
            <Router>
                <div>
                    <NavBar toggleLogin={this.toggleLoggedIn}/>

                    <Switch>
                        <Route exact path="/" render={props => <ProjectOverview basepath={BASEPATH}/>}/>

                        <Route path="/login"  render={props => <Login basepath={BASEPATH} toggleLogin={this.toggleLoggedIn}/>}/>
                        <Route path="/signup" render={props => <Register basepath={BASEPATH}/>}/>
                        <Route path="/users/:userId" component={Account}/>

                        <Route exact path="/projects/create" render={props => <CreateProject basepath={BASEPATH}/>}/>
                        <Route exact path="/projects" render={props => <ProjectOverview basepath={BASEPATH}/>}/>
                        <Route exact path="/projects/:projectId" component={SingleProjectOverview}/>

                        <Route path="/adminpanel" component={AdminPanel}/>
                        <Route exact path="/users" render={props => <UserPanel basepath={BASEPATH} />}/>
                        <Route path="/projectpanel" render={props => <ProjectPanel basepath={BASEPATH}/>}/>

                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

/* Example for matching URL
const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
); */
