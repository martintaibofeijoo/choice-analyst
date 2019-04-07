import React, {PureComponent as Component} from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import {
    Button, Card, CardBody, CardFooter, CardHeader, CardTitle,
    Col,
    Row,
} from 'reactstrap';

import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {Authentication} from "../authentication";
import VistaIniciarSesion from "../iniciarSesion";
import VistaRegistro from "../registro";
import Container from "react-bootstrap/Container";


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
            experimentos: []
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

    render() {
        return <Container>
            <h1>Experimentos</h1>
            {this.state.experimentos.map(
                (item, index) =>
                    <Card block color="primary">
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
                                    <Button block color="success" tag={Link}
                                            to={`/experimentos/verExperimento/${item.idExperimento}`}>Ver</Button>
                                </Col>
                                <Col>
                                    <Button block color="warning" tag={Link}
                                            to={`/experimentos/modificarExperimento/${item.idExperimento}`}>Modificar</Button>
                                </Col>
                                <Col>
                                    <Button block color="danger" tag={Link}
                                            to={`experimentos/eliminarExperimento/${item.idExperimento}`}>Eliminar</Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
            )
            }
        </Container>
    }
}

