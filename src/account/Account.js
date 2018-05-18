import React, {Component} from "react";
import {Button, Card, Container, Grid, Header, Icon, Input, Item, Message, TextArea} from "semantic-ui-react";
import './Account.css';
import {Link} from "react-router-dom";

export class Account extends Component {

    constructor() {
        super();
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
        this.state = {
            editMode: false,
            isDeleting: false,
            isSaving: false,
            user: {
                id: 1,
                email: 'johndoe@example.com',
                username: 'John Doe',
                image: 'http://via.placeholder.com/400x500',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
                'Corporis,\n' +
                'cupiditate\n' +
                'dolore\n' +
                'ex modi nihil nostrum odio perferendis praesentium sunt tenetur.\n' +
                'Doloremque\n' +
                'dolorum\n' +
                'eos, error et nobis praesentium suscipit voluptatem\n' +
                'voluptatibus.',
            }
        };
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode});
    }

    deleteAccount() {
        //if(confirm('Are you sure? There is no going back!')) {
        this.setState({isDeleting: true});
        setTimeout(() => {
            alert('Your account is deleted');
            this.setState({isDeleting: false});
        }, 2000); // request delay simulation
        //}
    }

    saveUser() {
        // validate and send request
        this.setState({isSaving: true});
        setTimeout(() => {
            this.setState({isSaving: false});
            this.toggleEditMode();
        }, 2000); // request delay simulation
    }

    render() {
        return (
            <div>
                <div className='account-header'>
                    {this.state.editMode && <Message>You are in edit mode</Message>}
                    <Container text>
                        <Item.Group>
                            {(this.state.editMode) ? this.renderEditForm() : this.renderNormal()}
                        </Item.Group>
                    </Container>
                </div>
                <Container style={{margin: '80px' }}>
                    <Header as='h1'>Projects</Header>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                {/*Needs to be replaced with function that collects ID*/}
                                <Link to='/project/1'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='1Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/2'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='2Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/3'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='3Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Link to='/project/4'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='4Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/5'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='5Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/6'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='6Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Link to='/project/7'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='7Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/8'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='8Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to='/project/9'>
                                    <Card
                                        image='http://via.placeholder.com/300x300'
                                        header='Project Name'
                                        meta='Target budget: $10000'
                                        description='9Small project desciption of the project.'
                                    />
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    renderNormal() {
        return (
            <Item>
                <Item.Image size='small'
                            src={this.state.user.image}/>
                <Item.Content>
                    <Item.Header as='h2'>{this.state.user.username}</Item.Header>
                    <Item.Description>
                        <div>
                            <p>{this.state.user.bio}</p>
                        </div>
                    </Item.Description>
                    <Item.Extra>
                        <Button circular color='twitter' icon='twitter'/>
                        <Button circular color='linkedin' icon='linkedin'/>
                        <Button circular color='google plus' icon='google plus'/>
                        <div style={{float: 'right'}}>
                            <div>
                                <Button icon labelPosition='left' onClick={this.toggleEditMode}>
                                    <Icon name='pencil'/> Edit
                                </Button>
                                <Button color='red' icon labelPosition='left'
                                        onClick={this.deleteAccount} loading={this.state.isDeleting}>
                                    <Icon name='trash'/> Delete
                                </Button>
                            </div>
                        </div>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }

    renderEditForm() {
        return (
            <Item>
                <Item.Image size='small'
                            src={this.state.user.image} />
                <Item.Content>
                    <Input name='username' defaultValue={this.state.user.username} onChange={this.valueChanged} />
                    <Item.Description>
                        <TextArea name='bio' autoHeight value={this.state.user.bio} />
                    </Item.Description>
                    <Item.Extra>
                        <Button circular color='twitter' icon='twitter'/>
                        <Button circular color='linkedin' icon='linkedin'/>
                        <Button circular color='google plus' icon='google plus'/>
                        <div style={{float: 'right'}}>
                            <Button icon color='green' labelPosition='left'
                                    onClick={this.saveUser} loading={this.state.isSaving}>
                                <Icon name='checkmark'/> Save
                            </Button>
                        </div>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }

    valueChanged = (e, { name, value }) => {
        let u = this.state.user;
        u[name] = value;
        this.setState({ user: u });
    }

}
