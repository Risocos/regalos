import React, {Component} from 'react';
import "../styling/PaymentCancel.css";
import {Header,} from "semantic-ui-react";

export class PaymentCancel extends Component {

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