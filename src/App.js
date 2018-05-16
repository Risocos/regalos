import React, {Component} from 'react';
import './App.css';
import {NavBar} from './NavBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login} from "./Login";
import {Register} from "./Register";
import { CreateProject } from './CreateProject';
import {Account} from "./account/Account";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>

                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Register} />
                    <Route path="/projects/create" component={CreateProject} />
                    <Route path="/profile" component={Account} />

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
