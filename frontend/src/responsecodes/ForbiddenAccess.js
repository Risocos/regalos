import React, {Component} from 'react';
import {Header} from "semantic-ui-react";

export class ForbiddenAccess extends Component {


    render() {

        return (
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}>
                    403 error
                    <Header.Subheader>
                        You are unauthorized to be on this page!
                    </Header.Subheader>
                </Header>
            </div>
        )

    }
}