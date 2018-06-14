import React, {Component} from 'react';
import {BACKEND_URL} from "../constants";
import axios from 'axios';
import {Header, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";

export class UserCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            username: '',
            image: '',
        }
    }

    componentDidMount() {
        const USER = this.props.user_id;
        const API_PATH = BACKEND_URL + "/users/" + USER;

        axios.get(API_PATH)
            .then(res => {
                let data = res.data.user;
                if (data.avatar == null) {
                    data.avatar = BACKEND_URL + '/uploads/users/no_avatar.png';
                }
                this.setState({
                    id: data.id,
                    username: data.username,
                    image: data.avatar,
                })
            })
    }

    render() {
        const LINK = "/users/" + this.state.id;
        return (
            <div>
                <Link to={LINK}>
                    <Image avatar size='small' src={this.state.image}/>
                    <Header as='h3'>{this.state.username}</Header>
                </Link>
            </div>
        )
    }
}