import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {LoginComponent} from "./LoginComponent";

class App extends Component {
    render() {
        return (
            <div className="App">

                <LoginComponent></LoginComponent>

            </div>
        );
    }
}

export default App;
