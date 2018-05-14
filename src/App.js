import React, {Component} from 'react';
import './App.css';
import {SingleProjectOverview} from './SingleProjectOverview';

class App extends Component {
    render() {
        return (
            <div className="App">
                <SingleProjectOverview />
            </div>
        );
    }
}

export default App;
