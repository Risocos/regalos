import React, {Component} from 'react'
import {Card, Image, Progress} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import '../styling/ProjectCard.css'

export class ProjectCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            target: props.target,
            achieved: props.achieved,
            country: props.country,
            cover: props.cover,
        };
    }

    setPropsToState() {
        this.setState({
            id: this.props.id,
            name: this.props.name,
            target: this.props.target,
            achieved: this.props.achieved,
            country: this.props.country,
            cover: this.props.cover,
        })
    }

    componentDidMount() {
        this.setPropsToState();
    }

    returnProgress() {
        let result = (this.state.achieved / this.state.target * 100).toFixed(2)
        if (isNaN(result)) {
            return 0;
        }
        else {
            return result;
        }
    }

    render() {
        return(
            <div className="card">
            <Link to={'/projects/' + this.state.id}>
                <Card>
                    <Image src={this.state.cover != null ? this.state.cover : 'http://via.placeholder.com/300x300'}/>
                    <Card.Content className="card-content">
                        <Card.Header className="card-header">{this.state.name}</Card.Header>
                        <Card.Meta>Country: {this.state.country}</Card.Meta>
                        <Card.Meta>Target budget: €{this.state.target}</Card.Meta>
                        <Progress percent={this.returnProgress()} progress success> </Progress>
                    </Card.Content>
                </Card>
            </Link>
            </div>
        )
    }
}