import React, {PureComponent as Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    Label,
    Alert, Col, CardHeader, CardTitle,
} from 'reactstrap';

import Form from 'react-bootstrap/Form'
import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import {Route} from "react-router-dom";
import Row from "react-bootstrap/Row";

export default class VerPerfil extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaVerPerfil auth={auth}/>
            }
        </Authentication>
    }
}

class VistaVerPerfil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            alert: {
                status: ""
            },
            username: "",
            password: "",
            correoElectronico: "",
            telefonoContacto: "",
            nombre: "",
            apellidos: "",
            validated: false
        }
    }


    async actualizarUsuario() {
        const postRequest = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/usuarios/${this.props.auth.user.username}`, {
            method: "GET",
            //'Authorization': this.props.auth.token,
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponse = await postRequest.json()

        this.setState(prev => ({
            ...prev,
            username: postResponse.username,
            correoElectronico: postResponse.correoElectronico,
            telefonoContacto: postResponse.telefonoContacto,
            nombre: postResponse.nombre,
            apellidos: postResponse.apellidos,
        }))
    }

    async componentDidMount() {
        this.actualizarUsuario()
    }

    onUsernameChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, username: value}))
    }

    onPasswordChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, password: value}))
    }

    onCorreoElectronicoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, correoElectronico: value}))
    }

    onTelefonoContactoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, telefonoContacto: value}))
    }

    onNombreChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombre: value}))
    }

    onApellidosChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, apellidos: value}))
    }

    onRegisterButtonClick = (event) => {
        this.setState({validated: true});
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.doModificarUsuario(this.state.username, this.state.password, this.state.correoElectronico, this.state.telefonoContacto, this.state.nombre, this.state.apellidos)
            event.preventDefault();
            event.stopPropagation();
        }
    }

    doModificarUsuario = (username, password, correoElectronico, telefonoContacto, nombre, apellidos) => {
        fetch(`https://tec.citius.usc.es/choiceanalyst/backend/usuarios/administradores/${this.props.auth.user.username}`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
            body: JSON.stringify({
                username: username,
                password: password,
                correoElectronico: correoElectronico,
                telefonoContacto: telefonoContacto,
                nombre: nombre,
                apellidos: apellidos,
            })
        }).then(response => {
            const codigo = response.status;
            if (codigo === 200) {
                this.setState(prev => ({
                    ...prev,
                    alert: {status: "OK", message: "Usuario modificado correctamente!"}
                }))
                this.props.auth.logout()
                this.props.auth.login(this.state.username, this.state.password)
            } else if (codigo === 409) {
                this.setState(prev => ({
                    ...prev,
                    alert: {
                        status: "Error",
                        message: "Error modificando usuario, no puede haber dos usuarios con el mismo username!"
                    }
                }))
                this.actualizarUsuario()
            } else if (codigo === 401) {
                this.setState(prev => ({
                    ...prev,
                    alert: {status: "Error", message: "No puede modificar su perfil si la contraseña no es correcta!"}
                }))
                this.actualizarUsuario()
            }
        })
    }

    render() {
        return <Container>
            <Row>
                <Card className="cards" block color="primary">
                    <CardHeader>
                        <CardTitle>Ver Perfil</CardTitle>
                    </CardHeader>
                    <CardBody style={{background: '#000'}}>
                        <Card className="cards" color={"primary"}>
                            <CardBody>
                                <Form
                                    noValidate
                                    validated={this.state.validated}
                                    onSubmit={event => this.onRegisterButtonClick(event)}
                                >
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Label>Usuario</Label>
                                            <Form.Control size={"sm"} value={this.state.username}
                                                          onChange={this.onUsernameChange}
                                                          pattern="[a-z][a-z0-9-_\.]{4,20}" required/>
                                            <Form.Control.Feedback type="invalid">
                                                El usuario debe contener: 4-20 carácteres (sin mayúsculas).
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Label>Correo Electrónico</Label>
                                            <Form.Control size={"sm"} type="email" value={this.state.correoElectronico}
                                                          onChange={this.onCorreoElectronicoChange} required/>
                                            <Form.Control.Feedback type="invalid">
                                                El correo electrónico debe ser de la forma: example@example.dominio.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Label>Número de Teléfono</Label>
                                            <Form.Control size={"sm"} value={this.state.telefonoContacto}
                                                          pattern="(\+34|0034|34)?[6|7|8|9][0-9]{8}"
                                                          onChange={this.onTelefonoContactoChange} required/>
                                            <Form.Control.Feedback type="invalid">
                                                El número de Teléfono debe contener 8 dígitos y comenzar por 6,7,8 u 9.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Label>Nombre</Label>
                                            <Form.Control size={"sm"} value={this.state.nombre}

                                                          onChange={this.onNombreChange}
                                                          required/>
                                            <Form.Control.Feedback type="invalid">
                                                El nómbre debe contener dos o más carácteres.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Label>Apellidos</Label>
                                            <Form.Control size={"sm"} value={this.state.apellidos}

                                                          onChange={this.onApellidosChange} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Los apellidos deben contener dos o más carácteres.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Label>Contraseña</Label>
                                            <Form.Control size={"sm"} type="password" value={this.state.password}
                                                          onChange={this.onPasswordChange}
                                                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*" required/>
                                            <Form.Control.Feedback type="invalid">
                                                La contraseña debe contener: una mayúscula, una minúscula y un número.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Alert
                                        color={this.state.alert.status === "OK" ? "success" : "danger"}
                                        isOpen={this.state.alert.status !== ""}
                                        toggle={() => this.setState(prev => ({...prev, alert: {status: ""}}))}
                                    >
                                        {this.state.alert.message}
                                    </Alert>
                                    <Button className="botonSuccess" size="sm" type={"submit"} block
                                    >Modificar Perfil</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Route>{
                    ({history}) =>
                        <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                onClick={() => history.goBack()}>Volver</Button>
                }</Route>
            </Row>
        </Container>
    }
}