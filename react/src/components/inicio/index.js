import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Col,
    Row,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert, CardFooter,
} from 'reactstrap';


import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {ButtonToolbar} from "react-bootstrap";
import {Authentication} from "../authentication";


export class Inicio extends Component {
    constructor() {
        super();
        this.state = {
            iniciarSesion: false
        };
    }

    onModalClose = () => {
        this.setState({
            iniciarSesion: false
        });
    }

    render() {
        return <Authentication>
            {auth => {
                if (auth.authenticated)
                    return <Redirect to="/"/>;
                else
                    return <article>
                        <Row>
                            <Col sm>
                                <Image className="imagenInicio" src={choiceanalyst_inicio}/>
                            </Col>
                        </Row>

                        <ButtonToolbar>
                            <Button size={"lg"}
                                    color={"success"}
                                    onClick={() => this.setState({
                                        iniciarSesion: true
                                    })}
                            >
                                Iniciar Sesión
                            </Button>
                            <Row>
                                <Col xs="12" sm={{size: 6, offset: 3}}>
                                    <VistaIniciarSesion
                                        onLogin={auth.login}
                                        show={this.state.iniciarSesion}
                                        onHide={this.onModalClose}
                                        error={auth.error}
                                    />
                                </Col>
                            </Row>
                        </ButtonToolbar>
                    </article>
            }}
        </Authentication>
    }
}

class VistaIniciarSesion extends Component {
    constructor(props) {
        super(props)

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
                    Iniciar Sesión
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Usuario</Label>
                                <Input value={this.state.username} onChange={this.onUsernameChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Contraseña</Label>
                                <Input type="password" value={this.state.password}
                                       onChange={this.onPasswordChange}/>
                            </FormGroup>
                        </Form>
                    </CardBody>

                </Card>
                <Alert
                    color={"danger"}
                    isOpen={this.props.error.code !== undefined}
                >
                    {this.props.error.message}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button color={"primary"} block onClick={this.onLoginButtonClick}>Iniciar Sesión</Button>
            </Modal.Footer>
        </Modal>
    }
}