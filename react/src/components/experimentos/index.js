import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {
    Alert,
    Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
    Col, Input,
    Row,
} from 'reactstrap';

import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";


export class Experimentos extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaExperimentos auth={auth} mensaje={this.props.location.state}/>
            }
        </Authentication>
    }
}

class VistaExperimentos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombreExperimentoBuscar: "",
            experimentos: [],
            mostrarVistaConfirmacion: false,
            nombreExperimentoEliminar: "",
            idExperimentoEliminar: "",
            alert: {
                status: ""
            }
        }
    }

    async componentDidMount() {
        this.actualizarExperimentos();
    }

    onNombreExperimentoBuscarChange = (event) => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreExperimentoBuscar: value}), () => this.actualizarExperimentos())
    }

    async actualizarExperimentos() {
        let consulta = "";
        if (this.state.nombreExperimentoBuscar === "") {
            consulta = `http://localhost:9000/experimentos?idAdministrador=${this.props.auth.user.username}`;
        } else {
            consulta = `http://localhost:9000/experimentos?idAdministrador=${this.props.auth.user.username}&nombreExperimento=${this.state.nombreExperimentoBuscar}`;

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
            experimentos: postResponse || []
        }))

    }

    onCerrarVistaConfirmacion = () => {
        this.setState({
            mostrarVistaConfirmacion: false
        });
    }


    doEliminarExperimento = async () => {
        this.setState({
            mostrarVistaConfirmacion: false
        });
        const response = await fetch(`http://localhost:9000/experimentos/${this.state.idExperimentoEliminar}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const codigo = response.status;
        if (codigo === 204) {
            this.setState(prev => ({...prev, alert: {status: "OK", message: "Experimento Eliminado Correctamente"}}))
            this.actualizarExperimentos()
        } else {
            this.setState(prev => ({...prev, alert: {status: "Error", message: "Error Eliminando Experimento"}}))
        }
    }

    render() {
        return <Container>
            <h1 style={{textAlign: 'center'}}>Experimentos</h1>
            <Row>
                <Col/>
                <Col xs={8}>
                    <Card block className="cards" color="primary">
                        <CardHeader>
                            <Input className="inputs" size={"sm"} placeholder="Buscar por Nombre de Experimento..."
                                   value={this.state.nombreExperimentoBuscar}
                                   onChange={this.onNombreExperimentoBuscarChange}/> </CardHeader>
                    </Card>
                </Col>
                <Col/>
            </Row>
            <Alert
                color={this.state.alert.status === "OK" ? "success" : "danger"}
                isOpen={this.state.alert.status !== ""}
                toggle={() => this.setState(prev => ({...prev, alert: {status: ""}}))}
            >
                {this.state.alert.message}
            </Alert>
            {this.props.mensaje !== undefined &&
            <Alert
                color={this.props.mensaje.status === "OK" ? "success" : "danger"}
                isOpen={this.props.mensaje.status !== ""}
            >
                {this.props.mensaje.message}
            </Alert>
            }
            <VistaConfirmacion
                nombreExperimentoEliminar={this.state.nombreExperimentoEliminar}
                show={this.state.mostrarVistaConfirmacion}
                onHide={this.onCerrarVistaConfirmacion}
                eliminarExperimento={this.doEliminarExperimento}
            />

            {(this.state.experimentos.length === 0) ? (
                <div style={{marginTop: "-100px"}}>
                    <h1 style={{textAlign: 'center', marginTop: '150px'}}>Ups no existen experimentos con este
                        nombre...</h1>
                    <h2 style={{textAlign: 'center', marginBottom: '50px'}}>Si deseas puedes crear uno pulsando el
                        siguiente botón.</h2>
                    <Row>
                        <Col/>
                        <Col>
                            <Button className={"botonPrimary"} block size={"lg"} tag={Link}
                                    to={`/crearExperimento`}>Crear Experimento</Button>
                        </Col>
                        <Col/>
                    </Row>
                </div>
            ) : (
                this.state.experimentos.map(
                    (item, index) =>
                        <Card className={"cards"} block color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle
                                    style={{
                                        fontSize: '20px',
                                        textAlign: 'center'
                                    }}>{item.nombreExperimento}</CardTitle>
                            </CardHeader>
                            <CardBody style={{marginBottom: '-30px'}}>
                                <p style={{textAlign: 'center'}}>Creado el: {item.fechaCreacion}</p>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col>
                                        <Button size="sm" block className={"botonSuccess"} tag={Link}
                                                to={`/experimentos/verExperimento/${item.idExperimento}`}>Ver</Button>
                                    </Col>
                                    <Col>
                                        <Button size="sm" block className={"botonWarning"} tag={Link}
                                                to={`/experimentos/modificarExperimento/${item.idExperimento}`}>Modificar</Button>
                                    </Col>
                                    <Col>
                                        <Button size={"sm"} block className={"botonDanger"}
                                                onClick={() => this.setState({
                                                    mostrarVistaConfirmacion: true,
                                                    nombreExperimentoEliminar: item.nombreExperimento,
                                                    idExperimentoEliminar: item.idExperimento
                                                })}>Eliminar</Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                )
            )}
        </Container>
    }
}

class VistaConfirmacion extends Component {
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
                    Eliminar Experimento
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
                            }}> ¿Desea eliminar {this.props.nombreExperimentoEliminar}?
                        </p>
                    </CardBody>
                    <CardFooter style={{marginTop: "-30px"}}>
                        <Button size={"sm"} block className={"botonDanger"} onClick={this.props.eliminarExperimento}>
                            Eliminar Experimento
                        </Button>
                    </CardFooter>
                </Card>
            </Modal.Body>
        </Modal>
    }
}