import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ProjectOverview} from './ProjectOverview';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ProjectOverview />
            </div>
        );
    }
}

export default App;
