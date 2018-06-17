import React, {Component} from 'react';
import "../styling/PaymentCancel.css";
import {Header,} from "semantic-ui-react";
import {Link} from "react-router-dom";

export class PaymentSuccess extends Component {

render() {
        //TODO: functionality
        return(
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}>
                    Payment successful
                    <Header.Subheader>
                        Thanks you for donating!
                    </Header.Subheader>
                    <Header.Subheader>
                        <Link to='/'>Return to projects</Link>
                    </Header.Subheader>
                </Header>

            </div>
        )
}

}