import React, {Component} from 'react';
import GoogleMapReact from "google-map-react";
import {MAPS_KEY} from "../APIkeys";
import {MapMarker} from "./MapMarker";


export class MapContainer extends Component {
    static defaultProps = {
        center: {
            lat: 0.99190516,
            lng: -58.86762519
        },
        zoom: 8
    };

    render() {
        return (
            <div style={{height: '500px', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: MAPS_KEY}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <MapMarker
                        lat={this.props.location.lat}
                        lng={this.props.location.lng}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

