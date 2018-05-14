import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {CreateProject} from './CreateProject';

class App extends Component {
    render() {
        return (
            <div className="App">
                <CreateProject />
            </div>
        );
    }
}

export default App;
