import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Input,
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import {Calendar} from "react-calendar";
import {Authentication} from "../authentication";
import moment from "moment";
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";

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
        console.table(moment(fechaSeleccionada).format('DD/MM/YYYY'))
        this.setState({fechaSeleccionada: fechaSeleccionada})
    }

    render() {
        return <Container>
            <Row>
                <Col xs={5}>
                    <Card className={"cards"} color={"primary"}>
                        <CardHeader>
                            <CardTitle>Seleccione una Fecha</CardTitle>
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
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={7}>

                </Col>
            </Row>
        </Container>

    }
}




