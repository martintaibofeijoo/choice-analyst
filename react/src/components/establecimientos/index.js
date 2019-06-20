import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {
    Alert,
    Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
    Col, Input,
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
            nombreEstablecimientoBuscar: "",
            alertaCreacion: {
                status: ""
            },
            alertaExperimentos: {
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
        let consulta = "";
        if (this.state.nombreEstablecimientoBuscar !== "") {
            consulta = `https://tec.citius.usc.es/choiceanalyst/backend/establecimientos?idAdministrador=${this.props.auth.user.username}&nombreEstablecimiento=${this.state.nombreEstablecimientoBuscar}`;
        } else {
            consulta = `https://tec.citius.usc.es/choiceanalyst/backend/establecimientos?idAdministrador=${this.props.auth.user.username}`;
        }
        const postRequest = await fetch(consulta, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const postResponse = await postRequest.json()

        this.setState(prev => ({
            ...prev,
            establecimientos: postResponse
        }))
    }

    onNombreEstablecimientoBuscarChange = (event) => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreEstablecimientoBuscar: value}), () => this.actualizarEstablecimientos())
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

    onEstablecimientoModificadoCorrectamente = () => {
        this.actualizarEstablecimientos();
        this.setState({
            mostrarVistaModificarExperimento: false,
            alertaExperimentos: {status: "OK", message: "Establecimiento Modificado Correctamente"},
        });
    }

    doCrearEstablecimiento = (nombreEstablecimiento, tipoEstablecimiento, localizacionEstablecimiento) => {
        let idEstablecimiento = nombreEstablecimiento.replace(/ /g, "-");
        idEstablecimiento = idEstablecimiento.toLowerCase()
        idEstablecimiento = idEstablecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        fetch("https://tec.citius.usc.es/choiceanalyst/backend/establecimientos", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
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
                        alertaCreacion: {status: "OK", message: "Establecimiento creado correctamente!"},
                        validated: false,
                        nombreEstablecimiento: "",
                        localizacionEstablecimiento: "",
                        tipoEstablecimiento: "Restaurante"
                    }))
                    this.actualizarEstablecimientos();
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alertaCreacion: {
                            status: "Error",
                            message: "Error creando establecimiento, no puede haber dos establecimientos con el mismo nombre!"
                        }
                    }))
                }
            })
    }

    doEliminarEstablecimiento = async () => {
        this.setState({
            mostrarVistaEliminarExperimento: false
        });
        const response = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/establecimientos/${this.state.idEstablecimientoEliminar}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const codigo = response.status;

        if (codigo === 204) {
            this.setState(prev => ({
                ...prev,
                alertaExperimentos: {status: "OK", message: "Establecimiento eliminado correctamente!"}
            }))
            this.actualizarEstablecimientos();
        } else if (codigo === 401) {
            this.setState(prev => ({
                ...prev,
                alertaExperimentos: {
                    status: "Error",
                    message: "No puedes eliminar este establecimiento o bién porque no tienes permisos para ello o tiene experiencias asociadas a él!"
                }
            }))
        } else {
            this.setState(prev => ({
                ...prev,
                alertaExperimentos: {status: "Error", message: "Error eliminando experimento!"}
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
                    <Row>
                        <Col/>
                        <Col xs={8}>
                            <Card block className="cards" color="primary">
                                <CardHeader>
                                    <Input className="inputs" size={"sm"}
                                           placeholder="Buscar por Nombre de Establecimiento..."
                                           value={this.state.nombreEstablecimientoBuscar}
                                           onChange={this.onNombreEstablecimientoBuscarChange}/> </CardHeader>
                            </Card>
                        </Col>
                        <Col/>
                    </Row>
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
                    {this.state.mostrarVistaModificarExperimento === true &&
                    <VistaModificarEstablecimiento
                        nombreEstablecimientoModificar={this.state.nombreEstablecimientoModificar}
                        idEstablecimientoModificar={this.state.idEstablecimientoModificar}
                        tipoEstablecimientoModificar={this.state.tipoEstablecimientoModificar}
                        localizacionEstablecimientoModificar={this.state.localizacionEstablecimientoModificar}
                        auth={this.props.auth}
                        show={this.state.mostrarVistaModificarExperimento}
                        onHide={this.onCerrarVistaModificarExperimento}
                        onEstablecimientoModificadoCorrectamente={this.onEstablecimientoModificadoCorrectamente}
                    />
                    }

                    {(this.state.establecimientos.length === 0) ? (
                        <h2 style={{marginTop: '50px', textAlign: 'center'}}>!No existe ningún establecimiento con ese
                            nombre,
                            puedes crearlo aquí!</h2>
                    ) : (
                        this.state.establecimientos.map(
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
                                                            idEstablecimientoModificar: item.idEstablecimiento,
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
                    )}
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

            nombreEstablecimientoModificar: this.props.nombreEstablecimientoModificar,
            localizacionEstablecimientoModificar: this.props.localizacionEstablecimientoModificar,
            tipoEstablecimientoModificar: this.props.tipoEstablecimientoModificar,
            validated: false
        }
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

        fetch(`https://tec.citius.usc.es/choiceanalyst/backend/establecimientos/${this.props.idEstablecimientoModificar}`, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
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
                if (codigo === 200) {
                    this.setState(prev => ({
                        ...prev,
                        alertaExperimentos: {status: "OK", message: "Establecimiento modificado correctamente!"},
                        validated: false
                    }))
                    this.props.onEstablecimientoModificadoCorrectamente();
                } else if (codigo === 409) {
                    this.setState(prev => ({
                        ...prev,
                        alertaModificacion: {
                            status: "Error",
                            message: "Error modificando establecimiento, no puede haber dos establecimientos con el mismo nombre!"
                        }
                    }))
                } else if (codigo === 401) {
                    this.setState(prev => ({
                        ...prev,
                        alertaModificacion: {
                            status: "Error",
                            message: "No puedes eliminar este establecimiento o bién porque no tienes permisos para ello o tiene experiencias asociadas a él!\n"
                        }
                    }))
                } else {
                    this.setState(prev => ({
                        ...prev,
                        alertaModificacion: {status: "Error", message: "Error modificando establecimiento!"}
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