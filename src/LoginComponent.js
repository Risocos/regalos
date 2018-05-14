import React, {Component} from 'react';
import {Button, Checkbox, Form, } from "semantic-ui-react";
import {FacebookLogin} from "react-facebook-login";

export class LoginComponent extends Component {



    render() {
        return (
            <div>
            <Form >
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder='Password'/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Remember me'/>
                </Form.Field>
                <Button type='submit'>Log in</Button>

            </Form>
            </div>

        )

    }

}
