import React, {Component} from 'react';
import {Account} from './account/Account';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import { CreateProject } from './CreateProject';
import { NavBar } from './NavBar';
import {Container} from "semantic-ui-react";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Container>
                    <CreateProject />
                </Container>
                <Account />
                <Login></Login>
            </div>
        );
    }
}

export default App;
