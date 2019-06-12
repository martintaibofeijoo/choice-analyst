import React, {PureComponent as Component} from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import {
    Button,
    Col, Input,
    Row,
} from 'reactstrap';

import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import {Bar, Doughnut} from "react-chartjs-2";
import Table from "react-bootstrap/Table";


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
            verResultados: true,
            establecimientoSeleccionado: "",
            variableSeleccionada: "",
            nombresEstablecimientos: [],
            variablesPreguntas: [],
            opciones: [],
            valoresOpciones: [],
            nombresMenus: [],
            menuSeleccionado: "",
            datosGraficas: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },


            valoresOpcionesPrimerosPlatos: [],
            opcionesPrimerosPlatos: [],
            datosGraficasPrimerosPlatos: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
            valoresOpcionesSegundosPlatos: [],
            opcionesSegundosPlatos: [],
            datosGraficasSegundosPlatos: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
            valoresOpcionesPostres: [],
            opcionesPostres: [],
            datosGraficasPostres: {
                labels: [],
                datasets: [
                    {
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
            if (postResponse.preguntas[i].variableAsociada !== "Primer Plato" && postResponse.preguntas[i].variableAsociada !== "Segundo Plato" && postResponse.preguntas[i].variableAsociada !== "Postre") {
                variablesPreguntas = [...variablesPreguntas, postResponse.preguntas[i].variableAsociada];
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
            nombresEstablecimientos: nombresEstablecimientos,
            variableSeleccionada: variablesPreguntas[0],
            establecimientoSeleccionado: nombresEstablecimientos[0]
        }), () => this.doActualizarDatos(this.state.establecimientoSeleccionado, this.state.menuSeleccionado, this.state.variableSeleccionada))

    }

    onEstablecimientoSeleccionadoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({
            ...prev,
            establecimientoSeleccionado: value
        }), () => this.doActualizarDatos(this.state.establecimientoSeleccionado, this.state.menuSeleccionado, this.state.variableSeleccionada))
    }

    onVariableSeleccionadaChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({
            ...prev,
            variableSeleccionada: value
        }), () => this.doActualizarDatos(this.state.establecimientoSeleccionado, this.state.menuSeleccionado, this.state.variableSeleccionada))
    }

    onMenuSeleccionadoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({
            ...prev,
            menuSeleccionado: value
        }), () => this.doActualizarPlatosMenu(this.state.establecimientoSeleccionado, this.state.menuSeleccionado))
    }

    async doActualizarPlatosMenu(nombreEstablecimiento, nombreMenu) {
        let idEstablecimiento = nombreEstablecimiento.replace(/ /g, "-");
        idEstablecimiento = idEstablecimiento.toLowerCase()
        idEstablecimiento = idEstablecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let idMenu = nombreMenu.replace(/ /g, "-");
        idMenu = idMenu.toLowerCase()
        idMenu = idMenu.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let color = ""


        let idVariable = "primer-plato";
        const postRequestPrimerosPlatos = await fetch(`http://localhost:9000/experiencias/${this.props.idExperimento}/${idEstablecimiento}/menus/${idMenu}/${idVariable}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponsePrimerosPlatos = await postRequestPrimerosPlatos.json()
        let opcionesPrimerosPlatos = []
        let backgroundColorPrimerosPlatos = []
        for (let i = 0; i < postResponsePrimerosPlatos.valores.length; i++) {
            color = 'rgba(' + 30 * i + ' ,99, 132, 0.6)';
            backgroundColorPrimerosPlatos = [...backgroundColorPrimerosPlatos, color];
            opcionesPrimerosPlatos = [...opcionesPrimerosPlatos, "Opción " + (i + 1)];
        }

        this.setState(prev => ({
            ...prev,
            datosGraficasPrimerosPlatos: {
                labels: opcionesPrimerosPlatos, datasets: [{
                    data: postResponsePrimerosPlatos.valores,
                    backgroundColor: backgroundColorPrimerosPlatos
                }]
            },
            valoresOpcionesPrimerosPlatos: postResponsePrimerosPlatos.opciones,
            opcionesPrimerosPlatos: opcionesPrimerosPlatos
        }))

        idVariable = "segundo-plato";
        const postRequestSegundosPlatos = await fetch(`http://localhost:9000/experiencias/${this.props.idExperimento}/${idEstablecimiento}/menus/${idMenu}/${idVariable}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponseSegundosPlatos = await postRequestSegundosPlatos.json()
        let opcionesSegundosPlatos = []
        let backgroundColorSegundosPlatos = []
        for (let i = 0; i < postResponseSegundosPlatos.valores.length; i++) {
            color = 'rgba(' + 30 * i + ' ,99, 132, 0.6)';
            backgroundColorSegundosPlatos = [...backgroundColorSegundosPlatos, color];
            opcionesSegundosPlatos = [...opcionesSegundosPlatos, "Opción " + (i + 1)];
        }

        this.setState(prev => ({
            ...prev,
            datosGraficasSegundosPlatos: {
                labels: opcionesSegundosPlatos, datasets: [{
                    data: postResponseSegundosPlatos.valores,
                    backgroundColor: backgroundColorSegundosPlatos
                }]
            },
            valoresOpcionesSegundosPlatos: postResponseSegundosPlatos.opciones,
            opcionesSegundosPlatos: opcionesSegundosPlatos
        }))


        idVariable = "postre";
        const postRequestPostres = await fetch(`http://localhost:9000/experiencias/${this.props.idExperimento}/${idEstablecimiento}/menus/${idMenu}/${idVariable}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponsePostres = await postRequestPostres.json()
        let opcionesPostres = []
        let backgroundColorPostres = []
        for (let i = 0; i < postResponsePostres.valores.length; i++) {
            color = 'rgba(' + 30 * i + ' ,99, 132, 0.6)';
            backgroundColorPostres = [...backgroundColorPostres, color];
            opcionesPostres = [...opcionesPostres, "Opción " + (i + 1)];
        }

        this.setState(prev => ({
            ...prev,
            datosGraficasPostres: {
                labels: opcionesPostres, datasets: [{
                    data: postResponsePostres.valores,
                    backgroundColor: backgroundColorPostres
                }]
            },
            valoresOpcionesPostres: postResponsePostres.opciones,
            opcionesPostres: opcionesPostres
        }))

    }


    async doActualizarDatos(nombreEstablecimiento, nombreMenuSeleccionado, nombreVariable) {
        let idEstablecimiento = nombreEstablecimiento.replace(/ /g, "-");
        idEstablecimiento = idEstablecimiento.toLowerCase()
        idEstablecimiento = idEstablecimiento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let idVariable = nombreVariable.replace(/ /g, "-");
        idVariable = idVariable.toLowerCase()
        idVariable = idVariable.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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
        let backgroundColor = []
        let color = ""
        let opciones = []
        let sumatorio = 0;
        for (let i = 0; i < postResponse.valores.length; i++) {
            color = 'rgba(' + 30 * i + ' ,99, 132, 0.6)';
            backgroundColor = [...backgroundColor, color];
            opciones = [...opciones, "Opción " + (i + 1)];
            sumatorio = sumatorio + postResponse.valores[i];
        }

        if (sumatorio === 0) {
            this.setState(prev => ({
                ...prev,
                verResultados: false
            }))
        } else {
            this.setState(prev => ({
                ...prev,
                datosGraficas: {
                    labels: opciones, datasets: [{
                        data: postResponse.valores,
                        backgroundColor: backgroundColor
                    }]
                },
                valoresOpciones: postResponse.opciones,
                opciones: opciones
            }))

            if (idVariable === "menu-seleccionado") {
                this.setState(prev => ({
                        ...prev,
                        nombresMenus: postResponse.opciones,
                        menuSeleccionado: postResponse.opciones[0]
                    }), () => this.doActualizarPlatosMenu(nombreEstablecimiento, postResponse.opciones[0])
                )
            }
        }
    }

    render() {
        return <Container>
            <h1 style={{textAlign: 'center'}}>Resultados Experimento</h1>
            {(this.state.verResultados === false) ? (
                <h2 style={{marginTop: '50px', textAlign: 'center'}}>!Aún no existen experiencias asociadas a este experimento!</h2>
            ) : (
                <Container>
                    <Row style={{marginTop: '50px'}}>
                        <Col>
                            <p style={{textAlign: 'center'}}>Establecimiento a Analizar</p>
                            <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                                   value={this.state.establecimientoSeleccionado}
                                   onChange={this.onEstablecimientoSeleccionadoChange}>
                                {this.state.nombresEstablecimientos.map(
                                    (item, index) => {
                                        if (index === 0) {
                                            return <option selected>{item}</option>
                                        } else {
                                            return <option>{item}</option>
                                        }
                                    }
                                )
                                }
                            </Input>
                        </Col>
                        <Col>
                            <p style={{textAlign: 'center'}}>Variable a Analizar</p>
                            <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                                   value={this.state.variableSeleccionada}
                                   onChange={this.onVariableSeleccionadaChange}>
                                {this.state.variablesPreguntas.map(
                                    (item, index) => {
                                        if (index === 0) {
                                            return <option selected>{item}</option>
                                        } else {
                                            return <option>{item}</option>
                                        }
                                    }
                                )
                                }
                            </Input>
                        </Col>
                    </Row>
                    <Graficas datosGraficas={this.state.datosGraficas}
                              opciones={this.state.opciones}
                              valoresOpciones={this.state.valoresOpciones}
                    />

                    {this.state.variableSeleccionada === "Menú Seleccionado" &&
                    <Container>
                        <Row style={{marginTop: '20px'}}>
                            <Col>
                                <p style={{textAlign: 'center'}}>Menú a Analizar</p>
                                <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                                       value={this.state.menuSeleccionado}
                                       onChange={this.onMenuSeleccionadoChange}>
                                    {this.state.nombresMenus.map(
                                        (item, index) => {
                                            if (index === 0) {
                                                return <option selected>{item}</option>
                                            } else {
                                                return <option>{item}</option>
                                            }
                                        }
                                    )
                                    }
                                </Input>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col>
                                <h2 style={{textAlign: 'center'}}>Primeros Platos</h2>
                                <Graficas datosGraficas={this.state.datosGraficasPrimerosPlatos}
                                          opciones={this.state.opcionesPrimerosPlatos}
                                          valoresOpciones={this.state.valoresOpcionesPrimerosPlatos}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col>
                                <h2 style={{textAlign: 'center'}}>Segundos Platos</h2>
                                <Graficas datosGraficas={this.state.datosGraficasSegundosPlatos}
                                          opciones={this.state.opcionesSegundosPlatos}
                                          valoresOpciones={this.state.valoresOpcionesSegundosPlatos}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col>
                                <h2 style={{textAlign: 'center'}}>Postres</h2>
                                <Graficas datosGraficas={this.state.datosGraficasPostres}
                                          opciones={this.state.opcionesPostres}
                                          valoresOpciones={this.state.valoresOpcionesPostres}
                                />
                            </Col>
                        </Row>
                    </Container>

                    }
                    <Row>
                        <Route>{
                            ({history}) =>
                                <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                        onClick={() => history.goBack()}>Volver</Button>
                        }</Route>
                    </Row>
                </Container>
            )}
        </Container>
    }
}

class Graficas extends Component {
    render() {
        return <Container>
            <Row style={{marginTop: '50px'}}>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Gráfico de Barras</h4>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Gráfico de Sectores</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Bar
                        type={'horizontalBar'}
                        data={this.props.datosGraficas}
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
                        data={this.props.datosGraficas}
                        legend={{position: 'bottom'}}
                        options={{maintainAspectRatio: false}}
                    />
                </Col>
            </Row>
            <Row style={{marginTop: '30px'}}>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Opciones</h4>
                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Opción</th>
                            <th style={{textAlign: 'center'}}>Texto Opción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.opciones.map(
                            (item, index) =>
                                <tr>
                                    <td style={{textAlign: 'center'}}>{this.props.opciones[index]}</td>
                                    <td style={{textAlign: 'center'}}>{this.props.valoresOpciones[index]}</td>
                                </tr>)
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    }
}
