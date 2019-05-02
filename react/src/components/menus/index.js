import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    Button,
    CardHeader,
    CardTitle,
    CardBody,
} from 'reactstrap';

import {Calendar} from "react-calendar";
import {Authentication} from "../authentication";
import moment from "moment";
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";
import {Link} from 'react-router-dom';

export class Menus extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaMenus auth={auth}/>
            }
        </Authentication>
    }
}

class VistaMenus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            fechaSeleccionada: new Date()

        }
    }

    async componentDidMount() {
        let fechaSeleccionada = moment(this.state.fechaSeleccionada).format('DD-MM-YYYY')
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.auth.user.username}/menus/${fechaSeleccionada}`, {
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
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.auth.user.username}/menus/${fechaSeleccionada}`, {
            method: "GET",
            //'Authorization': this.props.auth.token,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const postResponse = await postRequest.json()
        console.table(postResponse)
        debugger
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

    render() {
        return <Container>
            <Row>
                <Col xs={5}>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Seleccione una Fecha</CardTitle>
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
                                    to={`/menus/crearMenu/`}>Crear Menú</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={7}>
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
                                                    to={`/experimentos/verExperimento/${item.idExperimento}`}>Ver en
                                                Detalle</Button>
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
                </Col>
            </Row>
        </Container>

    }
}




