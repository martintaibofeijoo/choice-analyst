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
import Row from "react-bootstrap/Row";


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
            alertaCreacion: {
                status: ""
            },
            alertaExperimentos: {
                status: ""
            },
            alertaModificacion: {
                status: ""
            },
            establecimientos: [],
            nombreEstablecimiento: "",
            localizacionEstablecimiento: "",
            tipoEstablecimiento: "Restaurante",
            mostrarVistaEliminarExperimento: false,
            nombreEstablecimientoEliminar: "",
            idEstablecimientoEliminar: "",

            mostrarVistaModificarExperimento: false,
            idEstablecimientoModificar: "",
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

    async componentDidMount() {
        this.actualizarEstablecimientos();
    }

    async actualizarEstablecimientos() {
        const postRequest = await fetch(`http://localhost:9000/establecimientos?idAdministrador=${this.props.auth.user.username}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Authorization': this.props.auth.token
            }
        })
        const postResponse = await postRequest.json()

        this.setState(prev => ({
            ...prev,
            establecimientos: postResponse
        }))
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

    onCerrarVistaEliminarExperimento = () => {
        this.setState({
            mostrarVistaEliminarExperimento: false
        });
    }

    onCerrarVistaModificarExperimento = () => {
        this.setState({
            mostrarVistaModificarExperimento: false
        });
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
                idAdministrador: this.props.auth.user.username,
                nombreEstablecimiento: nombreEstablecimiento,
                localizacionEstablecimiento: localizacionEstablecimiento,
                tipoEstablecimiento: tipoEstablecimiento
            })
        })
            .then(async response => {
                const codigo = response.status;
                if (codigo === 201) {
                    this.setState(prev => ({
                        ...prev,
                        alertaCreacion: {status: "OK", message: "Establecimiento Creado Correctamente"},
                        validated: false,
                        nombreEstablecimiento: "",
                        localizacionEstablecimiento: "",
                        tipoEstablecimiento: "Restaurante"
                    }))
                    const postRequest = await fetch(`http://localhost:9000/establecimientos?idAdministrador=${this.props.auth.user.username}`, {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': this.props.auth.token
                        }
                    })
                    const postResponse = await postRequest.json()

                    this.setState(prev => ({
                        ...prev,
                        establecimientos: postResponse
                    }))
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alertaCreacion: {status: "Error", message: "Establecimiento ya existente"}
                    }))
                }
            })
    }

    doEliminarEstablecimiento = async () => {
        this.setState({
            mostrarVistaEliminarExperimento: false
        });
        const response = await fetch(`http://localhost:9000/establecimientos/${this.state.idEstablecimientoEliminar}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        const codigo = response.status;

        if (codigo === 204) {
            this.setState(prev => ({
                ...prev,
                alertaExperimentos: {status: "OK", message: "Establecimiento Eliminado Correctamente"}
            }))
            this.actualizarEstablecimientos();
        } else {
            this.setState(prev => ({
                ...prev,
                alertaExperimentos: {status: "Error", message: "Error Eliminando Experimento"}
            }))
        }
    }


    render() {
        return <Container>
            <Row>
                <Col>
                    <h1 style={{textAlign: 'center'}}>Crear Establecimiento</h1>
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
                                    color={this.state.alertaCreacion.status === "OK" ? "success" : "danger"}
                                    isOpen={this.state.alertaCreacion.status !== ""}
                                    toggle={() => this.setState(prev => ({...prev, alertaCreacion: {status: ""}}))}
                                >
                                    {this.state.alertaCreacion.message}
                                </Alert>
                                <Button size={"sm"} className="botonSuccess" type={"submit"} block
                                >Crear Establecimiento</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 style={{textAlign: 'center'}}>Establecimientos</h1>
                    <Alert
                        color={this.state.alertaExperimentos.status === "OK" ? "success" : "danger"}
                        isOpen={this.state.alertaExperimentos.status !== ""}
                        toggle={() => this.setState(prev => ({...prev, alertaExperimentos: {status: ""}}))}
                    >
                        {this.state.alertaExperimentos.message}
                    </Alert>
                    <VistaEliminarEstablecimiento
                        nombreEstablecimientoEliminar={this.state.nombreEstablecimientoEliminar}
                        show={this.state.mostrarVistaEliminarExperimento}
                        onHide={this.onCerrarVistaEliminarExperimento}
                        eliminarEstablecimiento={this.doEliminarEstablecimiento}
                    />
                    <VistaModificarEstablecimiento
                        idEstablecimientoModificar={this.state.idEstablecimientoModificar}
                        show={this.state.mostrarVistaModificarExperimento}
                        onHide={this.onCerrarVistaModificarExperimento}
                    />
                    {this.state.establecimientos.map(
                        (item, index) =>
                            <Card className={"cards"} block color="primary">
                                <CardHeader style={{marginBottom: '-30px'}}>
                                    <CardTitle
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'center'
                                        }}>{item.nombreEstablecimiento}</CardTitle>
                                </CardHeader>
                                <CardBody style={{marginBottom: '-30px'}}>
                                    <p style={{textAlign: 'center'}}>{item.tipoEstablecimiento}</p>
                                    <p style={{textAlign: 'center'}}>{item.localizacionEstablecimiento}</p>
                                </CardBody>
                                <CardFooter>
                                    <Row>
                                        <Col>
                                            <Button size="sm" block className={"botonSuccess"} tag={Link}
                                                    to={`/establecimientos/${item.idEstablecimiento}/menus`}>Ver
                                                Menús</Button>
                                        </Col>
                                        <Col>
                                            <Button size={"sm"} block className={"botonWarning"}
                                                    onClick={() => this.setState({
                                                        mostrarVistaModificarExperimento: true,
                                                        nombreEstablecimientoModificar: item.nombreEstablecimiento,
                                                        tipoEstablecimientoModificar: item.tipoEstablecimiento,
                                                        localizacionEstablecimientoModificar: item.localizacionEstablecimiento
                                                    })}>Modificar Establecimiento</Button>
                                        </Col>
                                        <Col>
                                            <Button size={"sm"} block className={"botonDanger"}
                                                    onClick={() => this.setState({
                                                        mostrarVistaEliminarExperimento: true,
                                                        nombreEstablecimientoEliminar: item.nombreEstablecimiento,
                                                        idEstablecimientoEliminar: item.idEstablecimiento
                                                    })}>Eliminar Establecimiento</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                    )
                    }
                </Col>
            </Row>
        </Container>
    }
}

class VistaEliminarEstablecimiento extends Component {
    render() {
        return <Modal
            {...this.props}
            size="lg"
            classname={"modals"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Eliminar Establecimiento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#000'}}>
                <Card className={"cards"} color={"primary"}>
                    <CardBody>
                        <p
                            className="text-center"
                            style={{
                                fontSize: '20px',
                                color: 'rgb(139, 154, 167)'
                            }}> ¿Desea eliminar {this.props.nombreEstablecimientoEliminar}?
                        </p>
                    </CardBody>
                    <CardFooter style={{marginTop: "-30px"}}>
                        <Button size={"sm"} block className={"botonDanger"}
                                onClick={this.props.eliminarEstablecimiento}>
                            Eliminar Establecimiento
                        </Button>
                    </CardFooter>
                </Card>
            </Modal.Body>
        </Modal>
    }
}

class VistaModificarEstablecimiento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alertaModificacion: {
                status: ""
            },

            nombreEstablecimientoModificar: "",
            localizacionEstablecimientoModificar: "",
            tipoEstablecimientoModificar: "",
            validated: false
        }
    }

    async componentDidUpdate() {
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.idEstablecimientoModificar}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const postResponse = await postRequest.json()
        console.table(postResponse)
        this.setState(prev => ({
            ...prev,
            nombreEstablecimientoModificar: postResponse.nombreEstablecimiento,
            tipoEstablecimientoModificar: postResponse.tipoEstablecimiento,
            localizacionEstablecimientoModificar: postResponse.localizacionEstablecimientoc
        }))
    }


    onNombreEstablecimientoModificarChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreEstablecimientoModificar: value}))
    }

    onLocalizacionEstablecimientoModificarChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, localizacionEstablecimientoModificar: value}))
    }

    onTipoEstablecimientoModificarChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, tipoEstablecimientoModificar: value}))
    }

    onModificarEstablecimientoButtonClick = (event) => {
        this.setState({validated: true});
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.doModificarEstablecimiento(this.state.nombreEstablecimientoModificar, this.state.tipoEstablecimientoModificar, this.state.localizacionEstablecimientoModificar)
            event.preventDefault();
            event.stopPropagation();
        }
    }

    doModificarEstablecimiento = (nombreEstablecimientoModificar, tipoEstablecimientoModificar, localizacionEstablecimientoModificar) => {
        let idEstablecimientoModificar = nombreEstablecimientoModificar.replace(/ /g, "-");
        idEstablecimientoModificar = idEstablecimientoModificar.toLowerCase()
        idEstablecimientoModificar = idEstablecimientoModificar.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        fetch("http://localhost:9000/establecimientos", {
            method: 'POST',
            headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify({
                idEstablecimiento: idEstablecimientoModificar,
                idAdministrador: this.props.auth.user.username,
                nombreEstablecimiento: nombreEstablecimientoModificar,
                localizacionEstablecimiento: localizacionEstablecimientoModificar,
                tipoEstablecimiento: tipoEstablecimientoModificar
            })
        })
            .then(async response => {
                const codigo = response.status;
                if (codigo === 201) {
                    this.setState(prev => ({
                        ...prev,
                        alertaExperimentos: {status: "OK", message: "Establecimiento Modificado Correctamente"},
                        validated: false,
                        mostrarVistaModificarExperimento: false
                    }))
                    this.actualizarEstablecimientos();
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alertaModificacion: {status: "Error", message: "Establecimiento ya existente"}
                    }))
                }
            })
    }


    render() {
        return <Modal
            {...this.props}
            size="lg"
            classname={"modals"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modificar Establecimiento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#000'}}>
                <Card block className="cards" color={"primary"}>
                    <CardBody>
                        <Form
                            noValidate
                            validated={this.state.validated}
                            onSubmit={event => this.onModificarEstablecimientoButtonClick(event)}
                        >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Label>Nombre Establecimiento</Label>
                                    <Form.Control size={"sm"} value={this.state.nombreEstablecimientoModificar}
                                                  pattern="[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+"
                                                  onChange={this.onNombreEstablecimientoModificarChange} required/>
                                    <Form.Control.Feedback type="invalid">
                                        Introduce el nombre del establecimiento
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Label>Tipo Establecimiento</Label>
                                    <Form.Control style={{fontSize: 'x-small', width: '100%', height: '47%'}}
                                                  size={"sm"} as="select"
                                                  value={this.state.tipoEstablecimientoModificar}
                                                  onChange={this.onTipoEstablecimientoModificarChange} required>
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
                                <Form.Control size={"sm"} value={this.state.localizacionEstablecimientoModificar}
                                              onChange={this.onLocalizacionEstablecimientoModificarChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Introduce el nombre del establecimiento
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Alert
                                color={this.state.alertaModificacion.status === "OK" ? "success" : "danger"}
                                isOpen={this.state.alertaModificacion.status !== ""}
                                toggle={() => this.setState(prev => ({...prev, alertaModificacion: {status: ""}}))}
                            >
                                {this.state.alertaModificacion.message}
                            </Alert>
                            <Button size={"sm"} className="botonSuccess" type={"submit"} block
                            >Modificar Establecimiento</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Modal.Body>
        </Modal>
    }
}