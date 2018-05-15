import React, {Component} from 'react';
import {
    Header,
    Button,
    Image,
    Progress,
    Statistic,
    Grid,
    Dimmer,
    Form,
    Select,
    Input,
    Radio, TextArea, Checkbox, Container
} from "semantic-ui-react";
import "./SingleProjectOverview.css";

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
]

export class SingleProjectOverview extends Component {
    state = {};

    handleOpen = () => this.setState({active: true});
    handleClose = () => this.setState({active: false});
    handleChange = (e, {value}) => this.setState({value})

    validate = () => {
        //TODO: Validate the donate form
    }

    render() {
        const {active} = this.state;
        const {value} = this.state;
        //TODO: funtionality of filters
        //TODO: Fill projectname, targetbudget etc with proper values
        //TODO: Posts, phoyoalbum, see what we can do
        return (

            <div className="container">
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >
                    <Container>
                        <Form inverted>
                            <Form.Group widths='equal'>
                                <Form.Field control={Input} label='First name' placeholder='First name'/>
                                <Form.Field control={Input} label='Last name' placeholder='Last name'/>
                                <Form.Field control={Select} label='Gender' options={options} placeholder='Gender'/>
                            </Form.Group>
                            <Form.Group inline>
                                <label>Quantity</label>
                                <Form.Field control={Radio} label='I want to donate money' value='1'
                                            checked={value === '1'}
                                            onChange={this.handleChange}/>
                                <Form.Field control={Radio} label='I want to join the project' value='2'
                                            checked={value === '2'}
                                            onChange={this.handleChange}/>
                                <Form.Field control={Radio} label='I want to donate materials to the project.' value='3'
                                            checked={value === '3'}
                                            onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...'/>
                            <Form.Field control={Checkbox} label='I agree to the Terms and Conditions'/>
                            <Form.Field control={Button}>Submit</Form.Field>
                        </Form>
                    </Container>
                </Dimmer>

                <Grid columns='equal'>
                    <Grid.Row>

                        <Grid.Column>
                            <p>Maybe recent updates, twitter messages about the project, photos, something like
                                that?</p>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Image src='http://via.placeholder.com/600x300' centered={true}/>
                            <Header as='h2'>ProjectName</Header>
                            <Header as='h3'>TargetBudget: $10000</Header>
                            <Statistic>
                                <Statistic.Value>5,550</Statistic.Value>
                                <Statistic.Label>Donators!</Statistic.Label>
                            </Statistic>
                            <Progress percent={83} progress success>
                                $8300
                            </Progress>
                            <p>Here will be the desciption of the project. It will be a max number of words to keep it
                                small.</p>
                            <Header> <Button size='massive' color='green' onClick={this.handleOpen}> Donate
                                now! </Button> </Header>
                            <Button circular color='facebook' icon='facebook'/>
                            <Button circular color='twitter' icon='twitter'/>
                            <Button circular color='linkedin' icon='linkedin'/>
                            <Button circular color='google plus' icon='google plus'/>
                            <Button circular color='instagram' icon='instagram'/>
                            <Header size='huge'>Project details</Header>
                            <p>A very detailed description. and maybe something with photoalbum</p>
                            <Header size='huge'>Project progress</Header>
                            <p>Project progress and smething with photoalbum and being able to make posts.</p>
                        </Grid.Column>

                        <Grid.Column>
                            <Header size="large">Info</Header>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient
                                montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                                pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                                aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                                vitae, justo. </p>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>

        )
    }
}