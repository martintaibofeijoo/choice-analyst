import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
} from 'reactstrap';

export default class IniciarSesion extends Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: "",

        }
    }

    onUsernameChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, user: value}))
    }

    onPasswordChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, password: value}))
    }

    onLoginButtonClick = () => {
        this.props.onLogin(this.state.user, this.state.password)
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
            <Modal.Body>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Usuario</Label>
                                <Input value={this.state.user} onChange={this.onUsernameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contraseña</Label>
                                <Input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button color={"primary"} block onClick={this.onLoginButtonClick}>Iniciar Sesión</Button>
                <Button color={"secondary"} onClick={this.props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    }
}

class IniciarSesionError extends Component {
    render() {
        if (this.props.error.code)
            return <Alert className="mt-3" color="danger">
                {this.props.error.message}
            </Alert>
        else return null
    }
}

