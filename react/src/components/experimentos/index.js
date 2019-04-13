import React, {PureComponent as Component} from 'react'
import {Link} from 'react-router-dom'
import {
    Alert,
    Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
    Col,
    Row,
} from 'reactstrap';

import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";


export class Experimentos extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaExperimentos auth={auth}/>
            }
        </Authentication>
    }
}

class VistaExperimentos extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const postRequest = await fetch(`http://localhost:9000/experimentos/${this.props.auth.user.username}`, {
            method: "GET",
            //'Authorization': this.props.auth.token,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const postResponse = await postRequest.json()

        this.setState(prev => ({
            ...prev,
            experimentos: postResponse
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
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        const codigo = response.status;

        if (codigo === 204) {
            this.setState(prev => ({...prev, alert: {status: "OK", message: "Experimento Eliminado Correctamente"}}))
            const postRequest = await fetch(`http://localhost:9000/experimentos/${this.props.auth.user.username}`, {
                method: "GET",
                //'Authorization': this.props.auth.token,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const postResponse = await postRequest.json()

            this.setState(prev => ({
                ...prev,
                experimentos: postResponse
            }))
        } else {
            this.setState(prev => ({...prev, alert: {status: "Error", message: "Error Eliminando Experimento"}}))
        }
    }

    render() {
        return <Container>
            <h1>Experimentos</h1>
            <Alert
                color={this.state.alert.status === "OK" ? "success" : "danger"}
                isOpen={this.state.alert.status !== ""}
                toggle={() => this.setState(prev => ({...prev, alert: {status: ""}}))}
            >
                {this.state.alert.message}
            </Alert>
            <VistaConfirmacion
                nombreExperimentoEliminar={this.state.nombreExperimentoEliminar}
                show={this.state.mostrarVistaConfirmacion}
                onHide={this.onCerrarVistaConfirmacion}
                eliminarExperimento={this.doEliminarExperimento}
            />
            {this.state.experimentos.map(
                (item, index) =>
                    <Card className={"cards"} block color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'center'
                                }}>EXPERIMIENTO {item.nombreExperimento}</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-30px'}}>
                            <p>Creado el: {item.fechaCreacion}</p>
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
            }
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