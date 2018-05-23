import React, {Component} from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export class ProjectCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            desc: '',
            target: 0,
        };

        this.setPropsToState()
    }

    setPropsToState() {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            desc: this.props.desc,
            target: this.props.target,
        })
    }

    render() {
        return(
            <Link to={'/project/' + this.state.id}>
                <Card>
                    <Image src='http://via.placeholder.com/300x300'/>
                    <Card.Content style={{height: "150px"}}>
                        <Card.Header style={{padding: "10px"}}>{this.state.name}</Card.Header>
                        <Card.Meta>Target budget: ${this.state.target}</Card.Meta>
                        <Card.Description>{this.state.desc}</Card.Description>
                    </Card.Content>
                </Card>
            </Link>
        )
    }
}