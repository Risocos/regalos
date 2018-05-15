import React, {Component} from 'react';
import {Form, Card, Grid, Image, Container, Header} from "semantic-ui-react";
import "./ProjectOverview.css";

const options = [
    {key: 'f', text: 'Filter', value: 'filter'},
    {key: 'p', text: 'Popularity', value: 'popularity'},
    {key: 't', text: 'Targetbudget', value: 'targetbudget'},
];

export class ProjectOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //TODO: Add navbar

        //TODO: funtionality of filters

        //TODO: Fix amounts of projects shown etc

        //TODO: Fix project on google maps map
        return (
            <div className="container">

                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>

                                <Form.Select options={options} placeholder='Filter'/>

                                <Form.Field label='United States' control='input' type='checkbox' checked='true'/>
                                <Form.Field label='Europe' control='input' type='checkbox' checked='true'/>
                                <Form.Field label='Asia' control='input' type='checkbox' checked='true'/>
                                <Form.Field label='Australia' control='input' type='checkbox' checked='true'/>
                                <Form.Field label='Africa' control='input' type='checkbox' checked='true'/>

                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='1Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='2Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='3Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='4Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Card
                                            image='http://via.placeholder.com/300x300'
                                            header='Project Name'
                                            meta='Target budget: $10000'
                                            description='Small project desciption of the project.'
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>

                        <Grid.Column>
                            <Header size="large">Info</Header>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. </p>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <div className='googlemaps'>
                            <div className="gmap_canvas">
                                <iframe width="100%" height="500" id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=university of san francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                            </div>
                        </div>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}