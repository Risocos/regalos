import React, {Component} from 'react';
import "../styling/PaymentCancel.css";
import {Header,} from "semantic-ui-react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import {BACKEND_URL} from "../constants";

export class PaymentCancel extends Component {
    constructor(props) {
        super(props);
    }
render() {
        //TODO: functionality
        return(
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}>
                    Payment cancelled
                    <Header.Subheader>
                        You cancelled the payment to ...
                    </Header.Subheader>
                </Header>
            </div>
        )
}

}