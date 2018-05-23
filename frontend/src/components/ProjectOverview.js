import React, {Component} from 'react';
import {Form, Card, Grid, Header, Image, Pagination} from "semantic-ui-react";
import "../styling/ProjectOverview.css";
import {Link} from "react-router-dom";


const options = [
    {key: 'f', text: 'Filter', value: 'filter'},
    {key: 'p', text: 'Popularity', value: 'popularity'},
    {key: 't', text: 'Targetbudget', value: 'targetbudget'},
];

export class ProjectOverview extends Component {


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
                            <p> </p>
                            <Form.Field label='United States' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Europe' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Asia' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Australia' control='input' type='checkbox' defaultChecked='true'/>
                            <Form.Field label='Africa' control='input' type='checkbox' defaultChecked='true'/>

                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column>
                                        {/*Needs to be replaced with function that collects ID*/}
                                        <Link to='/project/1'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/2'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/3'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Link to='/project/4'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/5'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/6'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Link to='/project/7'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/8'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/9'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Link to='/project/7'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/8'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to='/project/9'>
                                            <Card>
                                                <Image src='http://via.placeholder.com/300x300' />
                                                <Card.Content style={{height: "150px"}}>
                                                    <Card.Header style={{padding: "10px"}}>Project Name</Card.Header>
                                                    <Card.Meta>Target budget: $10000</Card.Meta>
                                                    <Card.Description>1Small project description of the project.</Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Grid.Column>
                        <Grid.Column>
                            <Header size="large">Information</Header>
                            <p> Welcome to Regalos! On this website you will be able to see
                                countless of different projects from different kinds of people.
                                You can donate money, donate materials, and even apply to join
                                a project. Take a look around the projectoverview, pick out
                                your favorite projects. Or make an account and set up your own project!
                                Everything is possible.
                            </p>
                            <p><i>
                                Please notice that we verify accounts that are to be trusted.
                                It's your own responsibility to look out for your money, so please
                                make sure the project you are donating to is verified.
                            </i></p>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row centered columns={3}>
                        <Grid.Column ><Pagination defaultActivePage={1} totalPages={10} /></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <div className='googlemaps'>
                            <div className="gmap_canvas">
                                <iframe title="maps" width="100%" height="500" id="gmap_canvas"
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