import React, {Component} from 'react';
import {Form, Card, Grid, Image} from "semantic-ui-react";
import "./ProjectOverview.css";

const options = [
    { key: 'f', text: 'Filter', value: 'filter' },
    { key: 'p', text: 'Popularity', value: 'popularity' },
    { key: 't', text: 'Targetbudget', value: 'targetbudget' },
];

export class ProjectOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //TODO: Add navbar

        //TODO: funtionality of filters
        return (
            <div className="container">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Group className='projectgroupside' grouped>
                            <Form.Select label='Filter' options={options} placeholder='Filter'
                                           onchange={this.handleInputChange}/>


                            <Form.Field label='United States' control='input' type='checkbox' checked='true' />
                            <Form.Field label='Europe' control='input' type='checkbox' checked='true' />
                            <Form.Field label='Asia' control='input' type='checkbox' checked='true' />
                            <Form.Field label='Australia' control='input' type='checkbox' checked='true' />
                            <Form.Field label='Africa' control='input' type='checkbox' checked='true' />

                            <Image src='http://via.placeholder.com/300x800'/>

                        </Form.Group>
                        <Form.Group className='projectgroupcenter' grouped>

                            <Grid columns={3}>
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

                        </Form.Group>
                        <Form.Group className='projectgroupside' grouped>
                            <Image src='http://via.placeholder.com/300x1000'/>
                        </Form.Group>
                    </Form.Group>

                    <div className='googlemaps'>
                        <div className="gmap_canvas">
                            <iframe width="100%" height="500" id="gmap_canvas"
                                    src="https://maps.google.com/maps?q=university of san francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                        </div>
                    </div>

                </Form>
            </div>
        )
    }
}