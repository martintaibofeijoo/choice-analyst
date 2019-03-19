import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Button, Col, Row, CardFooter, Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';


import Imagen from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {ButtonToolbar, Container, Media} from "react-bootstrap";
import {Authentication} from "../authentication";


export class IniciarSesion extends Component {
    constructor(...args) {
        super(...args);

        this.state = {modalShow: false};
    }

    render() {
        let modalClose = () => this.setState({modalShow: false});

        return <Authentication>
            {auth => {
                if (auth.authenticated)
                    return <Redirect to="/"/>;
                else
                    return <ButtonToolbar>
                        <Button
                            variant="primary"
                            onClick={() => this.setState({modalShow: true})}
                        >
                            Launch vertically centered modal
                        </Button>

                        <Row>
                            <Col xs="12" sm={{size: 6, offset: 3}}>
                                <VistaIniciarSesion
                                    onLogin={auth.login}
                                    show={this.state.modalShow}
                                    onHide={modalClose}
                                />
                                <VistaIniciarSesionError error={auth.error}/>
                            </Col>
                        </Row>
                    </ButtonToolbar>
            }}
        </Authentication>
    }
}

class VistaIniciarSesion extends Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: ""
        }
    }

    onUsernameChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, username: value}))
    }

    onPasswordChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, password: value}))
    }

    onLoginButtonClick = () => {
        this.props.onLogin(this.state.username, this.state.password)
    }

    render() {
        return <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card color="primary">
                    <CardHeader>
                        <CardTitle className={"login"}>Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input value={this.state.username} onChange={this.onUsernameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button block onClick={this.onLoginButtonClick}>Login</Button>
                    </CardFooter>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
}

class VistaIniciarSesionError extends Component {
    render() {
        if (this.props.error.code)
            return <Alert className="mt-3" color="danger">
                {this.props.error.message}
            </Alert>
        else return null
    }
}