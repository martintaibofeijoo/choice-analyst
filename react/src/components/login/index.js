import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Col,
    Row,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    NavbarBrand
} from 'reactstrap';


import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
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
                    return <article>
                        <row>
                            <Col sm>
                                <Image className="imagenInicio" src={choiceanalyst_inicio}/>
                            </Col>
                        </row>

                        <ButtonToolbar>
                            <Button size={"lg"}
                                color={"success"}
                                onClick={() => this.setState({modalShow: true})}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                size="lg"
                                color={"success"}
                                onClick={() => this.setState({modalShow: true})}
                            >
                                Registrarse
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

                    </article>
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
        this.setState(prev => ({...prev, nombreIngrediente: value}))
    }

    onPasswordChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, password: value}))
    }

    onLoginButtonClick = () => {
        this.props.onLogin(this.state.nombreIngrediente, this.state.password)
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
                                <Input value={this.state.nombreIngrediente} onChange={this.onUsernameChange}/>
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

class VistaIniciarSesionError extends Component {
    render() {
        if (this.props.error.code)
            return <Alert className="mt-3" color="danger">
                {this.props.error.message}
            </Alert>
        else return null
    }
}

