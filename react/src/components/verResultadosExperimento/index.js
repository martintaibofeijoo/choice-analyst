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
import {Bar, Doughnut} from "react-chartjs-2";


export class VerResultadosExperimento extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaVerResultadosExperimento auth={auth}
                                                       idExperimento={this.props.match.params.idExperimento}/>
            }
        </Authentication>
    }
}

class VistaVerResultadosExperimento extends Component {
    constructor(props) {
        super(props)
        this.state = {
            establecimientoSeleccionado: "",
            variableSeleccionada: "",
            nombresEstablecimientos: [],
            variablesPreguntas: [],
            datosGraficas: {
                labels: [],
                datasets: [
                    {
                        legend: {
                            position: 'right'
                        },
                        label: "My First dataset",
                        backgroundColor: "rgb(0,0,0)",
                        data: []
                    }
                ]
            }
        }
    }

    async componentDidMount() {
        this.actualizarExperimentos();
    }


    async actualizarExperimentos() {
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

        let variablesPreguntas = [];

        for (let i = 0; i < postResponse.preguntas.length; i++) {
            variablesPreguntas = [...variablesPreguntas, postResponse.preguntas[i].variableAsociada];
        }

        this.setState(prev => ({
            ...prev,
            idExperimento: postResponse.idExperimento,
            idAdministrador: postResponse.idAdministrador,
            nombreExperimento: postResponse.nombreExperimento,
            fechaCreacion: postResponse.fechaCreacion,
            objetivos: postResponse.objetivos,
            preguntas: postResponse.preguntas,
            fechasExperimento: postResponse.fechasExperimento,
            idsEstablecimientos: postResponse.idsEstablecimientos,
            variablesPreguntas: variablesPreguntas
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

        this.setState(prev => ({
            ...prev,
            nombresEstablecimientos: nombresEstablecimientos
        }))
    }

    onEstablecimientoSeleccionadoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({
            ...prev,
            establecimientoSeleccionado: value
        }), () => this.doActualizarDatos(this.state.establecimientoSeleccionado, this.state.variableSeleccionada))
    }

    onVariableSeleccionadaChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({
            ...prev,
            variableSeleccionada: value
        }), () => this.doActualizarDatos(this.state.establecimientoSeleccionado, this.state.variableSeleccionada))
    }


    async doActualizarDatos(nombreEstablecimiento, nombreVariable) {
        let idEstablecimiento = nombreEstablecimiento.replace(/ /g, "-");
        idEstablecimiento = idEstablecimiento.toLowerCase()
        idEstablecimiento = idEstablecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let idVariable = nombreVariable.replace(/ /g, "-");
        idVariable = idVariable.toLowerCase()
        idVariable = idVariable.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        idVariable = "higiene";
        const postRequest = await fetch(`http://localhost:9000/experiencias/${this.props.idExperimento}/${idEstablecimiento}/${idVariable}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponse = await postRequest.json()
        console.table(postResponse)
        this.setState(prev => ({
            ...prev,
            datosGraficas: {
                labels: postResponse.opciones, datasets: [{
                    data: postResponse.valores
                }]
            }
        }))


    }

    render() {
        console.table(this.state.datosGraficas)
        return <Container>
            <h1 style={{textAlign: 'center'}}>Resultados Experimento</h1>
            <Row style={{marginTop:'50px'}}>
                <Col>
                    <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                           value={this.state.establecimientoSeleccionado}
                           onChange={this.onEstablecimientoSeleccionadoChange}>
                        <option selected>Seleccionar Establecimiento</option>
                        {this.state.nombresEstablecimientos.map(
                            (item, index) =>
                                <option>{item}</option>
                        )
                        }
                    </Input>
                </Col>
                <Col>
                    <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                           value={this.state.variableSeleccionada}
                           onChange={this.onVariableSeleccionadaChange}>
                        <option value="" disabled>Seleccionar Variable</option>
                        {this.state.variablesPreguntas.map(
                            (item, index) =>
                                <option>{item}</option>
                        )
                        }
                    </Input>
                </Col>
            </Row>
            <Row style={{marginTop:'50px'}}>
                <Col>
                    <h2 style={{textAlign: 'center'}}>Gráfico de Barras</h2>
                </Col>
                <Col>
                    <h2 style={{textAlign: 'center'}}>Gráfico de Sectores</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Bar
                        type={'horizontalBar'}
                        data={this.state.datosGraficas}
                        legend={{position: 'bottom'}}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                </Col>
                <Col>
                    <Doughnut
                        data={this.state.datosGraficas}
                        legend={{position: 'bottom'}}
                        options={{maintainAspectRatio: false}}
                    />
                </Col>
            </Row>

        </Container>
    }
}
