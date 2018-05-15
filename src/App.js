import React, {Component} from 'react';
import {Account} from './account/Account';
import './App.css';
import { NavBar } from './NavBar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <Account />
            </div>
        );
    }
}

export default App;
