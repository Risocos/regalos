import React, {Component} from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import '../styling/ProjectCard.css'

export class ProjectCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            desc: props.desc,
            target: props.target,
        };
    }

    setPropsToState() {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            desc: this.props.desc,
            target: this.props.target,
        })
    }

    componentDidMount() {
        this.setPropsToState();
    }

    render() {
        return(
            <div className="card">
            <Link to={'/project/' + this.state.id}>
                <Card>
                    <Image src='http://via.placeholder.com/300x300'/>
                    <Card.Content className="card-content">
                        <Card.Header className="card-header">{this.state.name}</Card.Header>
                        <Card.Meta>Target budget: ${this.state.target}</Card.Meta>
                        <Card.Description>{this.state.desc}</Card.Description>
                    </Card.Content>
                </Card>
            </Link>
            </div>
        )
    }
}