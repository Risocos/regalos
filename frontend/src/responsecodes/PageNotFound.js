import React, {Component} from 'react';
import {Header} from "semantic-ui-react";


export class PageNotFound extends Component {


    render() {

        return (
            <div className="container">
                <Header as='h2' textAlign={"center"} size={"huge"}>
                    404 error
                    <Header.Subheader>
                        Oops, the page you were looking for does not exist!
                    </Header.Subheader>
                </Header>
            </div>
        )

    }
}