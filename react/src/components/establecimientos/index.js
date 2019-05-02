import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {
    Alert,
    Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
    Col,
    Label,
} from 'reactstrap';

import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


export class Establecimientos extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaEstablecimientos auth={auth}/>
            }
        </Authentication>
    }
}

class VistaEstablecimientos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alert: {
                status: ""
            },
            establecimientos: [],
            nombreEstablecimiento: "",
            localizacionEstablecimiento: "",
            tipoEstablecimiento: "Restaurante"
        }
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


    onCrearEstablecimientoButtonClick = (event) => {
        this.setState({validated: true});
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.doCrearEstablecimiento(this.state.nombreEstablecimiento, this.state.tipoEstablecimiento, this.state.localizacionEstablecimiento)
            event.preventDefault();
            event.stopPropagation();
        }
    }

    doCrearEstablecimiento = (nombreEstablecimiento, tipoEstablecimiento, localizacionEstablecimiento) => {
        let idEstablecimiento = nombreEstablecimiento.replace(/ /g, "-");
        console.table(idEstablecimiento)
        idEstablecimiento = idEstablecimiento.toLowerCase()
        idEstablecimiento = idEstablecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        fetch("http://localhost:9000/establecimientos", {
            method: 'POST',
            headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({
                idEstablecimiento: idEstablecimiento,
                nombreEstablecimiento: nombreEstablecimiento,
                localizacionEstablecimiento: localizacionEstablecimiento,
                tipoEstablecimiento: tipoEstablecimiento
            })
        })
            .then(response => {
                const codigo = response.status;
                if (codigo === 201) {
                    this.setState(prev => ({
                        ...prev,
                        alert: {status: "OK", message: "Establecimiento Creado Correctamente"},
                        validated: false,
                        nombreEstablecimiento:"",
                        localizacionEstablecimiento:"",
                        tipoEstablecimiento:"Restaurante"
                    }))
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alert: {status: "Error", message: "Establecimiento ya existente"}
                    }))
                }
            })
    }

    render() {
        return <Container>
            <Card block className="cards" color={"primary"}>
                <CardBody>
                    <Form
                        noValidate
                        validated={this.state.validated}
                        onSubmit={event => this.onCrearEstablecimientoButtonClick(event)}
                    >
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Label>Nombre Establecimiento</Label>
                                <Form.Control size={"sm"} value={this.state.nombreEstablecimiento}
                                              pattern="[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+"
                                              onChange={this.onNombreEstablecimientoChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Introduce el nombre del establecimiento
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Label>Tipo Establecimiento</Label>
                                <Form.Control style={{fontSize: 'x-small', width: '100%', height: '47%'}}
                                              size={"sm"} as="select" value={this.state.tipoEstablecimiento}
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
                            <Form.Control size={"sm"} value={this.state.localizacionEstablecimiento}

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
                        <Button size={"sm"} className="botonSuccess" type={"submit"} block
                        >Crear Establecimiento</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    }
}