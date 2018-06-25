import React, {Component} from 'react';
import "../styling/PaymentCancel.css";
import {Header,} from "semantic-ui-react";

export class AboutUs extends Component {

render() {
        return(
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}>
                    About Regalos
                    <Header.Subheader>
                        We are Regalos.
                    </Header.Subheader>
                </Header>

            </div>
        )
}

}