import React, {PureComponent as Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardBody,
    Label,
    Alert,
} from 'reactstrap';

import Form from 'react-bootstrap/Form'

export default class VistaIniciarSesion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            validated: false
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

    onLoginButtonClick = (event) => {
        this.setState({validated: true});
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            this.props.onLogin(this.state.username, this.state.password)
            event.preventDefault();
            event.stopPropagation();
        }
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
                    Iniciar Sesión
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#000'}}>
                <Card color={"primary"}>
                    <CardBody>
                        <Form
                            noValidate
                            validated={this.state.validated}
                            onSubmit={event => this.onLoginButtonClick(event)}
                        >
                            <Form.Group>
                                <Label>Usuario</Label>
                                <Form.Control value={this.state.username} onChange={this.onUsernameChange}
                                              pattern="[a-z][a-z0-9-_\.]{4,20}" required/>
                                <Form.Control.Feedback type="invalid">
                                    El usuario debe contener: 4-20 carácteres (sin mayúsculas).
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Label>Contraseña</Label>
                                <Form.Control type="password" value={this.state.password}
                                              onChange={this.onPasswordChange}
                                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*" required/>
                                <Form.Control.Feedback type="invalid">
                                    La contraseña debe contener: una mayúscula, una minúscula y un número.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Alert
                                color={"danger"}
                                isOpen={this.props.error.code !== undefined}
                            >
                                {this.props.error.message}
                            </Alert>
                            <Button color={"success"} block type={"onSubmit"}>Iniciar
                                Sesión</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Modal.Body>
        </Modal>
    }
}
