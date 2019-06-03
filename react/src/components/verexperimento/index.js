import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    Input, Alert
} from 'reactstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Authentication} from "../authentication";
import {Link, Route} from "react-router-dom";


export class VerExperimento extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaVerExperimento auth={auth} idExperimento={this.props.match.params.idExperimento}
                                             mensaje={this.props.location.state}/>
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
            nombresEstablecimientos: ""
        }
    }

    async componentDidMount() {
        const postRequest = await fetch(`http://localhost:9000/experimentos/verExperimento/${this.props.idExperimento}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
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
            nombreExperimento: postResponse.nombreExperimento,
            fechaCreacion: postResponse.fechaCreacion,
            objetivos: postResponse.objetivos,
            preguntas: postResponse.preguntas,
            fechasExperimento: fechas
        }))

        const establecimientosRequest = await fetch(`http://localhost:9000/establecimientos?idAdministrador=${this.props.auth.user.username}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const establecimientosResponse = await establecimientosRequest.json()
        let nombresEstablecimientos = [];

        for (let i = 0; i < establecimientosResponse.length; i++) {
            for (let j = 0; j < postResponse.idsEstablecimientos.length; j++) {
                if (establecimientosResponse[i].idEstablecimiento === postResponse.idsEstablecimientos[j]) {
                    nombresEstablecimientos = [...nombresEstablecimientos, establecimientosResponse[i].nombreEstablecimiento];
                }
            }
        }
        let textoNombresEstablecimiento = "";
        for (let j = 0; j < nombresEstablecimientos.length; j++) {
            if (j === 0) {
                textoNombresEstablecimiento = nombresEstablecimientos[j];
            } else {
                textoNombresEstablecimiento = textoNombresEstablecimiento + ", " + nombresEstablecimientos[j];
            }
        }
        this.setState(prev => ({
            ...prev,
            nombresEstablecimientos: textoNombresEstablecimiento
        }))

    }


    render() {
        console.table(this.state)
        return (
            <Container>
                <h1 style={{textAlign: 'center'}}>Ver Experimento</h1>
                {this.props.mensaje !== undefined &&
                <Alert
                    color={this.props.mensaje.status === "OK" ? "success" : "danger"}
                    isOpen={this.props.mensaje.status !== ""}
                >
                    {this.props.mensaje.message}
                </Alert>
                }
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
                            <CardTitle style={{
                                fontSize: '20px',
                                textAlign: 'center'
                            }}>Establecimientos</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-30px'}}>
                            {this.state.nombresEstablecimientos !== "" ? (
                                <p style={{textAlign: 'center'}}>{this.state.nombresEstablecimientos}</p>
                            ) : (
                                <p style={{textAlign: 'center'}}>Esta experimento no tiene asociado ningún experimento,
                                    por lo tanto no se pueden ver las experiencias asociadas a él!</p>
                            )}
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
                                                        {(item.opciones.length === 0) ? (
                                                            <p style={{textAlign: 'center'}}>Esta pregunta no tiene
                                                                opciones, se autogeneran a partir de los menús del
                                                                día.</p>
                                                        ) : (
                                                            item.opciones.map(
                                                                (item1, index1) =>
                                                                    <li type="square">{item1.textoOpcion}</li>
                                                            )
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
                    <Col style={{paddingLeft: '1px'}}>
                        <Route>{
                            ({history}) =>
                                <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                        onClick={() => history.goBack()}>Volver</Button>
                        }</Route>
                    </Col>
                    {this.state.nombresEstablecimientos !== "" &&
                    <Col style={{paddingLeft: '1px'}}>
                        <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonSuccess"}
                                tag={Link}
                                to={`/experimentos/verResultadosExperimento/${this.state.idExperimento}`}>Ver Resultados
                            Experimento</Button>
                    </Col>
                    }
                </Row>
            </Container>
        );
    }
}



