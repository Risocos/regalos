import React, {Component} from 'react';
import {Message} from "semantic-ui-react";
import '../styling/Message.css';

export class SuccessMessage extends Component {
    render() {
        return (
            <Message success>
                <Message.Header className='message'>{this.props.content}</Message.Header>
            </Message>
        )
    }
}