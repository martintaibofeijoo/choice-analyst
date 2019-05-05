import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    Button,
    CardHeader,
    CardTitle,
    CardBody, Alert,
} from 'reactstrap';

import {Calendar} from "react-calendar";
import {Authentication} from "../authentication";
import moment from "moment";
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";
import {Link, Route} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";


export class Menus extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaMenus auth={auth} idEstablecimiento={this.props.match.params.idEstablecimiento}/>
            }
        </Authentication>
    }
}

class VistaMenus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            fechaSeleccionada: new Date(),
            mostrarVistaEliminarMenu: false,
            nombreMenuEliminar: "",
            idMenuEliminar: "",
            alertaMenus: {
                status: ""
            }

        }
    }

    async componentDidMount() {
        let fechaSeleccionada = moment(this.state.fechaSeleccionada).format('DD-MM-YYYY')
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.idEstablecimiento}/menus?fechaSeleccionada=${fechaSeleccionada}`, {
            method: "GET",
            mode: "cors",
            headers: {
                //'Authorization': this.props.auth.token,
                "Content-Type": "application/json"
            }
        })
        const postResponse = await postRequest.json()

        this.setState(prev => ({
            ...prev,
            menus: postResponse
        }))

    }

    async doBuscarMenus(fechaSeleccionada) {
        fechaSeleccionada = moment(this.state.fechaSeleccionada).format('DD-MM-YYYY')
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.idEstablecimiento}/menus?fechaSeleccionada=${fechaSeleccionada}`, {
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
            menus: postResponse
        }))
    }

    onCambiarFechaSeleccionada = fechaSeleccionada => {
        console.table(moment(fechaSeleccionada).format('DD-MM-YYYY'))
        this.setState({fechaSeleccionada: fechaSeleccionada})
        this.doBuscarMenus(this.state.fechaSeleccionada)
    }

    onCerrarVistaEliminarMenu = () => {
        this.setState({
            mostrarVistaEliminarMenu: false
        });
    }

    doEliminarMenu = async () => {
        this.setState({
            mostrarVistaEliminarMenu: false
        });
        const response = await fetch(`http://localhost:9000/establecimientos/${this.props.idEstablecimiento}/menus/${this.state.idMenuEliminar}`, {
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
                alertaMenus: {status: "OK", message: "Menú Eliminado Correctamente"}
            }))
            this.doBuscarMenus(this.state.fechaSeleccionada)
        } else {
            this.setState(prev => ({
                ...prev,
                alertaMenus: {status: "Error", message: "Error Eliminando Menú"}
            }))
        }
    }

    render() {
        return <Container>
            <Row>
                <Col xs={5}>
                    <Row>
                        <Card block className="cards" color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Seleccione una
                                    Fecha</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Card className={"cards"} color={"primary"}>
                                    <CardBody>
                                        <Calendar
                                            onChange={this.onCambiarFechaSeleccionada}
                                            value={this.state.fechaSeleccionada}
                                        />
                                    </CardBody>
                                </Card>
                                <Button size="sm" block className={"botonSuccess"} tag={Link}
                                        to={`/establecimientos/${this.props.idEstablecimiento}/menus/crearMenu`}>Crear
                                    Menú</Button>
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
                </Col>
                <Col xs={7}>
                    <h1 style={{textAlign: 'center'}}>Menus Establecimiento</h1>
                    <h2 style={{textAlign: 'center'}}>{moment(this.state.fechaSeleccionada).format('DD-MM-YYYY')}</h2>
                    <Alert
                        color={this.state.alertaMenus.status === "OK" ? "success" : "danger"}
                        isOpen={this.state.alertaMenus.status !== ""}
                        toggle={() => this.setState(prev => ({...prev, alertaMenus: {status: ""}}))}
                    >
                        {this.state.alertaMenus.message}
                    </Alert>
                    <VistaEliminarMenu
                        nombreMenuEliminar={this.state.nombreMenuEliminar}
                        show={this.state.mostrarVistaEliminarMenu}
                        onHide={this.onCerrarVistaEliminarMenu}
                        eliminarMenu={this.doEliminarMenu}
                    />
                    {this.state.menus.map(
                        (item, index) =>
                            <Card className={"cards"} block color="primary">
                                <CardHeader style={{marginBottom: '-30px'}}>
                                    <CardTitle
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'center'
                                        }}>{item.nombreMenu}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Row>
                                        <Col>
                                            <Button size="sm" block className={"botonSuccess"} tag={Link}
                                                    to={`/establecimientos/${this.props.idEstablecimiento}/menus/verMenu/${item.idMenu}`}>Ver en
                                                Detalle</Button>
                                        </Col>
                                        <Col>
                                            <Button size="sm" block className={"botonWarning"} tag={Link}
                                                    to={`/experimentos/modificarExperimento/${item.idExperimento}`}>Modificar</Button>
                                        </Col>
                                        <Col>
                                            <Button size={"sm"} block className={"botonDanger"}
                                                    onClick={() => this.setState({
                                                        mostrarVistaEliminarMenu: true,
                                                        nombreMenuEliminar: item.nombreMenu,
                                                        idMenuEliminar: item.idMenu
                                                    })}>Eliminar</Button>
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


class VistaEliminarMenu extends Component {
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
                    Eliminar Menú
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
                            }}> ¿Desea eliminar {this.props.nombreMenuEliminar}?
                        </p>
                    </CardBody>
                    <CardFooter style={{marginTop: "-30px"}}>
                        <Button size={"sm"} block className={"botonDanger"}
                                onClick={this.props.eliminarMenu}>
                            Eliminar Menú
                        </Button>
                    </CardFooter>
                </Card>
            </Modal.Body>
        </Modal>
    }
}




