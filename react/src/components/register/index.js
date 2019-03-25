import React, {Component} from "react"

import {
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

import {Authentication} from "../authentication";

export default class Register extends Component {
    render() {
        return <Authentication>
            {
                auth => <RegisterView login={auth.login}/>
            }
        </Authentication>
    }
}

export class RegisterView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            alert: {
                status: ""
            },
            username: "",
            password: "",
            email: ""
        }
    }

    onUsernameChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreIngrediente: value}))
    }

    onPasswordChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, password: value}))
    }

    onEmailChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, email: value}))
    }

    onRegisterButtonClick = () => {
        this.doRegister(this.state.nombreIngrediente, this.state.password, this.state.email)
    }

    doRegister = (username, password, email) => {
        fetch("http://localhost:9000/users", {
            method: 'POST',
            headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({nombreIngrediente: username, password: password, email: email})
        })
            .then(response => {

                const codigo = response.status;

                if (codigo === 201) {
                    this.setState(prev => ({
                        ...prev,
                        alert: {status: "OK", message: "Correctly registered user"}
                    }))
                    this.props.login(this.state.nombreIngrediente, this.state.password)

                } else if (codigo === 409) {
                    this.setState(prev => ({...prev, alert: {status: "Error", message: "User already exists"}}))
                }
            })

    }

    render() {
        return <>
            <Card className="card" color="primary">
                <CardHeader>
                    <CardTitle className={"login"}>REGISTER</CardTitle>
                </CardHeader>
                <CardBody className="menosBottomBody">
                    <Form>
                        <FormGroup>
                            <Label>USERNAME</Label>
                            <Input value={this.state.nombreIngrediente} onChange={this.onUsernameChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>PASSWORD</Label>
                            <Input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>EMAIL</Label>
                            <Input value={this.state.email} onChange={this.onEmailChange}/>
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button block onClick={this.onRegisterButtonClick}>REGISTER</Button>
                </CardFooter>
            </Card>
            <Alert
                color={this.state.alert.status === "OK" ? "success" : "danger"}
                isOpen={this.state.alert.status !== ""}
                toggle={() => this.setState(prev => ({...prev, alert: {status: ""}}))}
            >
                {this.state.alert.message}
            </Alert>
        </>
    }
}