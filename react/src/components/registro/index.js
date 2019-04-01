import React, {PureComponent as Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
    Card,
    CardBody,
    Label,
    Alert, Col,
} from 'reactstrap';

import Form from 'react-bootstrap/Form'


export default class VistaRegistro extends Component {
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
            nombreEstablecimiento: "",
            localizacionEstablecimiento: "",
            tipoEstablecimiento: "",
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

    onNombreEstablecimientoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreEstablecimiento: value}))
    }

    onLocalizacionEstablecimientoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, localizacionEstablecimiento: value}))
    }

    onTipoEstablecimientoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, tipoEstablecimiento: value}))
    }

    onRegisterButtonClick = (event) => {
        this.setState({validated: true});
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.doRegister(this.state.username, this.state.password, this.state.correoElectronico, this.state.telefonoContacto, this.state.nombre, this.state.apellidos, this.state.nombreEstablecimiento, this.state.tipoEstablecimiento, this.state.localizacionEstablecimiento)
            event.preventDefault();
            event.stopPropagation();
        }
    }

    doRegister = (username, password, correoElectronico, telefonoContacto, nombre, apellidos, nombreEstablecimiento, tipoEstablecimiento, localizacionEstablecimiento) => {

        fetch("http://localhost:9000/establecimientos", {
            method: 'POST',
            headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({
                idAdministrador: username,
                nombre: nombreEstablecimiento,
                localizacion: localizacionEstablecimiento,
                tipo: tipoEstablecimiento
            })
        })
            .then(response => {
                const codigo = response.status;

                if (codigo === 201) {
                    console.table(response)
                    debugger
                   /* fetch("http://localhost:9000/usuarios", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json;charset=UTF-8',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            correoElectronico: correoElectronico,
                            telefonoContacto: telefonoContacto,
                            nombre: nombre,
                            apellidos: apellidos,
                            idEstablecimiento: nombreEstablecimiento
                        })
                    })
                        .then(response => {
                            const codigo = response.status;

                            if (codigo === 201) {
                                this.props.login(this.state.username, this.state.password)
                            } else if (codigo === 409) {
                                this.setState(prev => ({
                                    ...prev,
                                    alert: {status: "Error", message: "Usuario ya existente"}
                                }))
                            }
                        })*/
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alert: {status: "Error", message: "Establecimiento ya existente"}
                    }))
                }
            })
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
                    Registrarse
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#000'}}>
                <Card color={"primary"}>
                    <CardBody>
                        <Form
                            noValidate
                            validated={this.state.validated}
                            onSubmit={event => this.onRegisterButtonClick(event)}
                        >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Label>Usuario</Label>
                                    <Form.Control value={this.state.username} onChange={this.onUsernameChange}
                                                  pattern="[a-z][a-z0-9-_\.]{4,20}" required/>
                                    <Form.Control.Feedback type="invalid">
                                        El usuario debe contener: 4-20 carácteres (sin mayúsculas).
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Label>Contraseña</Label>
                                    <Form.Control type="password" value={this.state.password}
                                                  onChange={this.onPasswordChange}
                                                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*" required/>
                                    <Form.Control.Feedback type="invalid">
                                        La contraseña debe contener: una mayúscula, una minúscula y un número.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Label>Correo Electrónico</Label>
                                    <Form.Control type="email" value={this.state.correoElectronico}
                                                  onChange={this.onCorreoElectronicoChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        El correo electrónico debe ser de la forma: example@example.dominio.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Label>Número de Teléfono</Label>
                                    <Form.Control value={this.state.telefonoContacto}
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
                                    <Form.Control value={this.state.nombre}

                                                  onChange={this.onNombreChange}
                                                  required/>
                                    <Form.Control.Feedback type="invalid">
                                        El nómbre debe contener dos o más carácteres.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Label>Apellidos</Label>
                                    <Form.Control value={this.state.apellidos}

                                                  onChange={this.onApellidosChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Los apellidos deben contener dos o más carácteres.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Label>Nombre Establecimiento</Label>
                                    <Form.Control value={this.state.nombreEstablecimiento}

                                                  onChange={this.onNombreEstablecimientoChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Introduce el nombre del establecimiento
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Label>Tipo Establecimiento</Label>
                                    <Form.Control as="select" value={this.state.tipoEstablecimiento}
                                                  onChange={this.onTipoEstablecimientoChange} required>
                                        <option>Restaurante</option>
                                        <option>Cafeteria</option>
                                        <option>Supermercado</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Introduce el nombre del establecimiento
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Label>Localización Establecimiento</Label>
                                <Form.Control value={this.state.localizacionEstablecimiento}

                                              onChange={this.onLocalizacionEstablecimientoChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Introduce el nombre del establecimiento
                                </Form.Control.Feedback>


                            </Form.Group>

                            <Alert
                                color={this.state.alert.status === "OK" ? "success" : "danger"}
                                isOpen={this.state.alert.status !== ""}
                                toggle={() => this.setState(prev => ({...prev, alert: {status: ""}}))}
                            >
                                {this.state.alert.message}
                            </Alert>
                            <Button type={"submit"} block type={"onSubmit"}
                                    color={"success"}>Registrarse</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Modal.Body>
        </Modal>
    }
}