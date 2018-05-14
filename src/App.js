import React, {Component} from 'react';
import './App.css';
import { CreateProject } from './CreateProject';
import { NavBar } from './NavBar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <CreateProject />
            </div>
        );
    }
}

export default App;
