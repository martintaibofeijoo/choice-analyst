import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Input
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Authentication} from "../authentication";
import {Redirect, Route} from "react-router-dom";


export class VerExperimento extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaVerExperimento auth={auth} idExperimento={this.props.match.params.idExperimento} mensaje={this.props.location.state}/>
            }
        </Authentication>
    }
}

class VistaVerExperimento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preguntas: [],
            objetivos: [],
            fechasExperimento: ""
        }
    }

    async componentDidMount() {
        const postRequest = await fetch(`http://localhost:9000/experimentos/verExperimento/${this.props.idExperimento}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Authorization': this.props.auth.token,
                "Content-Type": "application/json"
            }
        })
        const postResponse = await postRequest.json()
        let fechasExperimento = postResponse.fechasExperimento;
        let fechas = "";
        for (let j = 0; j < fechasExperimento.length; j++) {
            if (j === 0) {
                fechas = fechasExperimento[j];
            } else {
                fechas = fechas + ", " + fechasExperimento[j];
            }
        }
        this.setState(prev => ({
            ...prev,
            idExperimento: postResponse.idExperimento,
            idAdministrador: postResponse.idAdministrador,
            idEstablecimiento: postResponse.idEstablecimiento,
            nombreExperimento: postResponse.nombreExperimento,
            fechaCreacion: postResponse.fechaCreacion,
            objetivos: postResponse.objetivos,
            preguntas: postResponse.preguntas,
            fechasExperimento: fechas
        }))
    }


    render() {
        console.table(this.props)

        return (
            <Container>

                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{
                                fontSize: '20px',
                                textAlign: 'center'
                            }}>{this.state.nombreExperimento}</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-30px'}}>
                            <p style={{textAlign: 'center'}}>Creado el: {this.state.fechaCreacion}</p>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{
                                fontSize: '20px',
                                textAlign: 'center'
                            }}>Fechas Experimento</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-30px'}}>
                            <p style={{textAlign: 'center'}}>{this.state.fechasExperimento}</p>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Objetivos</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.objetivos.map(
                                    (item, index) =>
                                        <li type="square">{item.textoObjetivo}</li>
                                )
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Preguntas</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.preguntas.map(
                                    (item, index) =>
                                        <Card block style={{marginLeft: '-30px'}} className="cards" color="primary">
                                            <CardHeader style={{marginBottom: '-30px'}}>
                                                <CardTitle style={{
                                                    fontSize: '15px',
                                                }}>{item.textoPregunta}</CardTitle>
                                                <p style={{textAlign: 'center'}}>Variable
                                                    Asociada: {item.variableAsociada}</p>
                                            </CardHeader>
                                            <CardBody style={{marginBottom: '-30px'}}>
                                                <Card block className="cards" color="primary">
                                                    <CardHeader style={{marginBottom: '-30px'}}>
                                                        <CardTitle style={{
                                                            fontSize: '15px', textAlign: 'center'
                                                        }}>Opciones</CardTitle>
                                                    </CardHeader>
                                                    <CardBody style={{marginBottom: '-15px'}}>
                                                        {item.opciones.map(
                                                            (item1, index1) =>
                                                                <li type="square">{item1.textoOpcion}</li>
                                                        )}
                                                    </CardBody>
                                                </Card>
                                            </CardBody>
                                        </Card>
                                )
                                }
                            </ul>
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
            </Container>
        );
    }
}


