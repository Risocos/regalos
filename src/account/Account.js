import React, {Component} from "react";
import {Button, Container, Grid, Header, Icon, Item, Message, Input} from "semantic-ui-react";
import './Account.css';

export class Account extends Component {

    constructor() {
        super();
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.state = {editMode: false};
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode});
    }

    deleteAccount() {

    }

    render() {

        let buttons = (this.state.editMode) ? (
            <Button icon color='green' labelPosition='left'
                    onClick={this.toggleEditMode}>
                <Icon name='checkmark'/> Save
            </Button>
        ) : (
            <div>
                <Button icon labelPosition='left' onClick={this.toggleEditMode}>
                    <Icon name='pencil'/> Edit
                </Button>
                <Button color='red' icon labelPosition='left'
                        onClick={this.deleteAccount}>
                    <Icon name='trash'/> Delete
                </Button>
            </div>
        );

        let description = (this.state.editMode) ? (
            {/*<Textarea/>*/}
        ) : (
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Corporis,
                    cupiditate
                    dolore
                    ex modi nihil nostrum odio perferendis praesentium sunt tenetur.
                    Doloremque
                    dolorum
                    eos, error et nobis praesentium suscipit voluptatem
                    voluptatibus.</p>

                <p>Many people also have their own barometers for what makes a cute
                    dog.</p>
            </div>
        );

        let header = (this.state.editMode) ? (
            <Input>John Doe</Input>
        ) : (
            <Item.Header as='h2'>John Doe</Item.Header>
        );

        return (
            <div>
                <div className='account-header'>
                    {this.state.editMode ? <Message>You are in edit mode</Message> : ''}
                    <Container text>
                        <Item.Group>
                            <Item>
                                <Item.Image size='small'
                                            src='http://via.placeholder.com/400x500'/>
                                <Item.Content verticalAlign='center'>
                                    {header}
                                    <Item.Description>
                                        <div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Corporis,
                                                cupiditate
                                                dolore
                                                ex modi nihil nostrum odio perferendis praesentium sunt tenetur.
                                                Doloremque
                                                dolorum
                                                eos, error et nobis praesentium suscipit voluptatem
                                                voluptatibus.</p>

                                            <p>Many people also have their own barometers for what makes a cute
                                                dog.</p>
                                        </div>
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button circular color='twitter' icon='twitter'/>
                                        <Button circular color='linkedin' icon='linkedin'/>
                                        <Button circular color='google plus' icon='google plus'/>
                                        <div style={{float: 'right'}}>
                                            {buttons}
                                        </div>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Container>
                </div>
                <Container style={{margin: '80px'}}>
                    <Header as='h1'>Projects</Header>
                    <Grid columns={3}>

                    </Grid>
                </Container>
            </div>
        )
    }

}
