import React, {Component} from 'react';

export class MapMarker extends Component {
    render() {
        return (
            <div>
                {this.props.country}
                <img src='http://localhost:5000/uploads/projects/mapmarker.png' alt='Project is happening here'/>
            </div>

        )

    }
}