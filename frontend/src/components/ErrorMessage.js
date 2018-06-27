import React, {Component} from 'react';
import '../styling/Message.css';
import {Message} from "semantic-ui-react";

export class ErrorMessage extends Component {
    render() {
        if (this.props.content instanceof Array) {
            return (
                <Message error>
                    <Message.Header className='message'>Oops! Something went wrong!</Message.Header>
                    <Message.List>
                        {this.props.content.map(val => <Message.Item key={val}>{val}</Message.Item>)}
                    </Message.List>
                </Message>
            )
        }
        else {
            return (
                <Message error>
                    <Message.Header className='message'>{this.props.content}</Message.Header>
                </Message>
            )
        }
    }
}
