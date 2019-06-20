import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody, Button,
    Input, Alert
} from 'reactstrap';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Authentication} from "../authentication";
import {Link, Redirect, Route} from "react-router-dom";
import MultipleDatePicker from '../Datepicker'
import moment from "moment";
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import Modal from "react-bootstrap/Modal";


export class ModificarExperimento extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaModificarExperimento auth={auth} idExperimento={this.props.match.params.idExperimento}/>
            }
        </Authentication>
    }
}

class VistaModificarExperimento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                status: "",
                message: []
            },
            ok: false,
            eliminadoOk: false,
            listaEstablecimientos: [],
            idExperimento: "",
            listaEstablecimientosSeleccionados: [],
            idAdministrador: this.props.auth.user.username,
            idEstablecimiento: "",
            nombreExperimento: "",
            nombreExperimentoEliminar: "",
            idExperimentoEliminar: "",
            fechasExperimento:[],
            preguntas: [],
            objetivos: [],
            variables: ["Higiene", "Ruído", "Distancía", "Energía", "Compañía", "Atmósfera", "Calidad de Servicio", "Apariencia", "Temperatura", "Saludable", "Sabroso"]
        }
    }

    async componentDidMount() {
        const postRequestEstablecimientos = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/establecimientos?idAdministrador=${this.props.auth.user.username}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const postResponseEstablecimientos = await postRequestEstablecimientos.json()

        const postRequestExperimento = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/experimentos/verExperimento/${this.props.idExperimento}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const postResponseExperimento = await postRequestExperimento.json()
        let preguntas = postResponseExperimento.preguntas;
        let {variables} = this.state;

        for (let i = 0; i < preguntas.length; i++) {
            if (preguntas[i].variableAsociada === "Menú Seleccionado") {
                preguntas.splice(i, 1);
                i--;
            } else if (preguntas[i].variableAsociada === "Primer Plato") {
                preguntas.splice(i, 1);
                i--;
            } else if (preguntas[i].variableAsociada === "Segundo Plato") {
                preguntas.splice(i, 1);
                i--;
            } else if (preguntas[i].variableAsociada === "Postre") {
                preguntas.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < preguntas.length; i++) {
            for (let j = 0; j < variables.length; j++) {
                if (variables[j] === preguntas[i].variableAsociada) {
                    variables.splice(j, 1);
                }
            }
        }

        let fechas = [];
        let fechaSeparada = [];
        for (let i = 0; i < postResponseExperimento.fechasExperimento.length; i++) {
            fechaSeparada = postResponseExperimento.fechasExperimento[i].split("-");
            fechas.push(new Date(fechaSeparada[2], fechaSeparada[1] - 1, fechaSeparada[0]))
        }

        let establecimientosExperimento = postResponseExperimento.idsEstablecimientos;
        let posiblesEstablecimientos = postResponseEstablecimientos;
        let establecimientosSeleccionados = [];

        for (let i = 0; i < establecimientosExperimento.length; i++) {
            for (let j = 0; j < posiblesEstablecimientos.length; j++) {
                if (establecimientosExperimento[i] === posiblesEstablecimientos[j].idEstablecimiento) {
                    establecimientosSeleccionados = [...establecimientosSeleccionados, posiblesEstablecimientos[j]];
                }
            }
        }
        this.setState(prev => ({
            ...prev,
            idExperimento: postResponseExperimento.idExperimento,
            idAdministrador: postResponseExperimento.idAdministrador,
            idEstablecimiento: postResponseExperimento.idEstablecimiento,
            nombreExperimento: postResponseExperimento.nombreExperimento,
            fechaCreacion: postResponseExperimento.fechaCreacion,
            objetivos: postResponseExperimento.objetivos,
            preguntas: preguntas,
            fechasExperimento:fechas,
            listaEstablecimientos: postResponseEstablecimientos,
            listaEstablecimientosSeleccionados: establecimientosSeleccionados
        }))
    }


    onNombreExperimentoChange = (event) => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreExperimento: value}))
    }

    onAnadirObjetivo = () => {
        let {objetivos} = this.state;
        let nuevosObjetivos = [
            ...objetivos,
            {
                textoObjetivo: ""
            }
        ]
        this.setState({objetivos: nuevosObjetivos});
    }

    onModificarObjetivo = (textoObjetivo, identificadorObjetivo) => {
        this.setState(state => {
            state.objetivos.map((item, index) => {
                if (index === identificadorObjetivo) {
                    item.textoObjetivo = textoObjetivo;
                }
            })
        })
    }

    onEliminarObjetivo = identificadorObjetivo => {
        let {objetivos} = this.state;

        let nuevosObjetivos = [
            ...objetivos.slice(0, identificadorObjetivo),
            ...objetivos.slice(identificadorObjetivo + 1),
        ]
        this.setState({objetivos: nuevosObjetivos});
    }


    onAnadirPregunta = () => {
        let {preguntas} = this.state;
        let nuevasPreguntas = [
            ...preguntas,
            {
                textoPregunta: "",
                variableAsociada: "",
                opciones: [
                    {
                        textoOpcion: ""
                    }
                ]
            }
        ]
        this.setState({preguntas: nuevasPreguntas});
    }

    onModificarTextoPregunta = (textoPregunta, identificador) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificador) {
                    item.textoPregunta = textoPregunta;
                }
            })
        })
    }

    onModificarVariableAsociadaPregunta = (antiguaVariableAsociada, nuevaVariableAsociada, identificadorPregunta) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificadorPregunta) {
                    item.variableAsociada = nuevaVariableAsociada;
                    let posicion = 0;
                    this.state.variables.map((item, index) => {
                        if (item === nuevaVariableAsociada) {
                            posicion = index;
                        }
                    })
                    let {variables} = this.state;
                    let nuevasVariables = [
                        ...variables.slice(0, posicion),
                        ...variables.slice(posicion + 1),
                    ]
                    this.setState({variables: nuevasVariables});

                    if (antiguaVariableAsociada !== "") {
                        nuevasVariables = [
                            ...nuevasVariables, antiguaVariableAsociada
                        ]
                        this.setState({variables: nuevasVariables});
                    }
                }

            })
        })
    }

    onAnadirOpcionPregunta = (identificadorPregunta) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificadorPregunta) {
                    item.opciones = [...item.opciones, {textoOpcion: "",}]
                }
            })
        })
    }

    onModificarOpcionesPregunta = (textoOpcion, identificadorOpcion, identificadorPregunta) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificadorPregunta) {
                    item.opciones.map((item1, index1) => {
                        if (index1 === identificadorOpcion) {
                            item1.textoOpcion = textoOpcion
                        }
                    })
                }
            })
        })
    }

    onEliminarOpcionPregunta = (identificadorOpcion, identificadorPregunta) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificadorPregunta) {
                    item.opciones = [
                        ...item.opciones.slice(0, identificadorOpcion),
                        ...item.opciones.slice(identificadorOpcion + 1),
                    ]
                }
            })
        })
    }

    onEliminarPregunta = position => {
        let {preguntas} = this.state;

        let nuevasPreguntas = [
            ...preguntas.slice(0, position),
            ...preguntas.slice(position + 1),
        ]
        this.setState({preguntas: nuevasPreguntas});
    }

    onListaEstablecimientosChange = (value) => {
        this.setState({listaEstablecimientosSeleccionados: value});
    }

    onModificarExperimento = () => {
        this.doModificarExperimento(this.state.idAdministrador, this.state.idEstablecimiento, this.state.nombreExperimento, this.state.preguntas, this.state.objetivos, this.state.fechasExperimento, this.state.listaEstablecimientosSeleccionados)
    }

    doModificarExperimento = async (idAdministrador, idEstablecimiento, nombreExperimento, preguntas, objetivos, fechasExperimento, listaEstablecimientosSeleccionados) => {
        //Comprobación de los parametros
        let ejecutar = true;
        let mensajeCampoVacio = false;
        let mensaje = [];
        if (nombreExperimento === "") {
            ejecutar = false;
            mensajeCampoVacio = true;
        }
        if (objetivos.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El experimento debe tener como mínimo un objetivo!"];
        } else {
            for (let i = 0; i < objetivos.length; i++) {
                if (objetivos[i].textoObjetivo === "") {
                    mensajeCampoVacio = true;
                }
            }
        }
        if (fechasExperimento.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El experimento debe tener como mínimo una fecha asociada!"];
        }
        if (preguntas.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El experimento debe tener como mínimo una pregunta!"];
        } else {
            for (let i = 0; i < preguntas.length; i++) {
                if (preguntas[i].textoPregunta === "" || preguntas[i].variableAsociada === "") {
                    mensajeCampoVacio = true;
                }
                if (preguntas[i].opciones.length === 0) {
                    ejecutar = false;
                    mensaje = [...mensaje, "Todas las preguntas deben tener como mínimo una opción!"];
                } else {
                    for (let j = 0; j < preguntas[i].opciones.length; j++) {
                        if (preguntas[i].opciones[j].textoOpcion === "") {
                            mensajeCampoVacio = true;
                        }
                    }
                }
            }
        }
        if (mensajeCampoVacio === true) {
            ejecutar = false;
            mensaje = [...mensaje, "No puede haber ningún campo vacio!"];
        }

        if (ejecutar === true) {
            let idExperimento = nombreExperimento.replace(/ /g, "-");
            idExperimento = idExperimento.toLowerCase()
            idExperimento = idExperimento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let fechasCambiadas = []
            for (let i = 0; i < fechasExperimento.length; i++) {
                fechasCambiadas[i] = moment(fechasExperimento[i]).format('DD-MM-YYYY')
            }
            let establecimientosSeleccionados = [];
            for (let i = 0; i < listaEstablecimientosSeleccionados.length; i++) {
                establecimientosSeleccionados[i] = listaEstablecimientosSeleccionados[i].idEstablecimiento;
            }

            let preguntasExperimento = [
                ...preguntas,
                {
                    textoPregunta: "¿Que menú seleccionaste?",
                    variableAsociada: "Menú Seleccionado",
                    opciones: []
                },
                {
                    textoPregunta: "¿Que primer plato seleccionaste?",
                    variableAsociada: "Primer Plato",
                    opciones: []
                },
                {
                    textoPregunta: "¿Que segundo plato seleccionaste?",
                    variableAsociada: "Segundo Plato",
                    opciones: []
                },
                {
                    textoPregunta: "¿Que postre seleccionaste?",
                    variableAsociada: "Postre",
                    opciones: []
                }
            ];


            const response = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/experimentos/${this.props.idExperimento}`, {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Authorization': this.props.auth.token,
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },

                body: JSON.stringify({
                    idExperimento: idExperimento,
                    idAdministrador: idAdministrador,
                    nombreExperimento: nombreExperimento,
                    preguntas: preguntasExperimento,
                    objetivos: objetivos,
                    fechasExperimento: fechasCambiadas,
                    idsEstablecimientos: establecimientosSeleccionados
                })
            })
            const codigo = response.status

            if (codigo === 200) {
                this.setState(prev => ({
                    ...prev,
                    ok: true,
                    idExperimento: idExperimento
                }))
            } else if (codigo === 409) {
                mensaje = [...mensaje, "Error modificando el experimento, no puede haber dos experimentos con el mismo nombre!"];
                this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
            } else if (codigo === 401) {
                mensaje = [...mensaje, "No puedes modificar este experimento o bién porque no tienes permisos para ello o tiene experiencias asociadas a él!"];
                this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
            } else {
                mensaje = [...mensaje, "Error modificando experimento!"];
                this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
            }
        } else {
            this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
        }
    }

    doEliminarExperimento = async () => {
        this.setState({
            mostrarVistaConfirmacion: false
        });
        const response = await fetch(`https://tec.citius.usc.es/choiceanalyst/backend/experimentos/${this.state.idExperimentoEliminar}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const codigo = response.status;
        if (codigo === 204) {
            this.setState(prev => ({
                ...prev,
                eliminadoOk: true
            }))
        } else if (codigo===401){
            let mensaje = [];
            mensaje = [...mensaje, "No puedes eliminar este experimento o bién porque no tienes permisos para ello o tiene experiencias asociadas a él!"];
            this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
        } else{
            let mensaje = [];
            mensaje = [...mensaje, "Error eliminando el experimento!"];
            this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
        }
    }

    onCerrarVistaConfirmacion = () => {
        this.setState({
            mostrarVistaConfirmacion: false
        });
    }

    render() {
        if (this.state.ok)
            return <Redirect to={{
                pathname: `/experimentos/verExperimento/${this.state.idExperimento}`,
                state: {
                    message: "Experimento Modificado Correctamente",
                    status: "OK"
                }
            }}/>;
        else if (this.state.eliminadoOk) {
            return <Redirect to={{
                pathname: `/experimentos`,
                state: {
                    message: "Experimento Eliminado Correctamente",
                    status: "OK"
                }
            }}/>;
        } else
            return (
                <Container>
                    <VistaConfirmacion
                        nombreExperimentoEliminar={this.state.nombreExperimentoEliminar}
                        show={this.state.mostrarVistaConfirmacion}
                        onHide={this.onCerrarVistaConfirmacion}
                        eliminarExperimento={this.doEliminarExperimento}
                    />
                    <h1 style={{textAlign: 'center'}}>Crear Experimento</h1>
                    <Row>
                        <Col sm={8}
                             style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '5px'}}>
                            <Card block className="cards" color="primary">
                                <CardHeader style={{marginBottom: '-30px'}}>
                                    <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Nombre
                                        Experimento</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Card block className="cards" color="primary">
                                        <CardBody>
                                            <Input className="inputs" size={"sm"} placeholder="Nombre Experimento"
                                                   value={this.state.nombreExperimento}
                                                   onChange={this.onNombreExperimentoChange}
                                                   required/>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={4}
                             style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '5px', paddingRight: '0px'}}>
                            <Card block className="cards" color="primary">
                                <CardHeader style={{marginBottom: '-30px'}}>
                                    <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Fechas
                                        Experimento</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Card block className="cards" color="primary">
                                        <CardBody>
                                            <div style={{marginLeft: '15px'}}>
                                                <MultipleDatePicker className={'datepicker'}
                                                                    onSubmit={fechasExperimento => {
                                                                        this.setState(prev => ({
                                                                            ...prev,
                                                                            fechasExperimento: fechasExperimento
                                                                        }))
                                                                    }}
                                                                    selected={this.state.fechasExperimento}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Card block className="cards" color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Establecimientos</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Card block className="cards" color="primary">
                                    <CardBody>
                                        {(this.state.listaEstablecimientos.length === 0) ? (
                                            <div>
                                                <p style={{textAlign: 'center'}}>¡Aún no existe ningún establecimiento,
                                                    puedes crearlo aquí!</p>
                                                <Button size="sm" block className={"botonSuccess"} tag={Link}
                                                        to={`/establecimientos`}>Crear Establecimiento</Button>
                                            </div>
                                        ) : (
                                            <Picky
                                                value={this.state.listaEstablecimientosSeleccionados}
                                                options={this.state.listaEstablecimientos}
                                                onChange={this.onListaEstablecimientosChange}
                                                open={false}
                                                valueKey="idEstablecimiento"
                                                placeholder={"Ningún Establecimiento Seleccionado"}
                                                labelKey="nombreEstablecimiento"
                                                multiple={true}
                                                selectAllText={"Seleccionar Todos"}
                                                filterPlaceholder={"Buscar por Nombre..."}
                                                includeSelectAll={true}
                                                includeFilter={true}
                                                dropdownHeight={600}
                                                block
                                            />
                                        )}
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="cards" block color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Objetivos</CardTitle>
                            </CardHeader>
                            <CardBody style={{marginBottom: '-25px'}}>
                                <Card className="cards" color="primary">
                                    <CardBody style={{marginBottom: '-50px'}}>
                                        <ul className="lista">
                                            {this.state.objetivos.map(
                                                (item, index) =>
                                                    <Objetivo objetivo={item} key={index} identificadorObjetivo={index}
                                                              onEliminarObjetivo={() => this.onEliminarObjetivo(index)}
                                                              onModificarObjetivo={this.onModificarObjetivo}/>
                                            )
                                            }
                                        </ul>
                                    </CardBody>
                                    <CardFooter>
                                        <Button size={"sm"} block className={"botonSuccess"}
                                                onClick={this.onAnadirObjetivo}>
                                            Añadir Objetivo
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="cards" block color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Preguntas</CardTitle>
                            </CardHeader>
                            <CardBody style={{marginBottom: '-25px'}}>
                                <ul className="lista">
                                    {this.state.preguntas.map(
                                        (item, index) =>
                                            <Pregunta pregunta={item} key={index} identificadorPregunta={index}
                                                      variables={this.state.variables}
                                                      onEliminarPregunta={() => this.onEliminarPregunta(index)}
                                                      onModificarTextoPregunta={this.onModificarTextoPregunta}
                                                      onModificarVariableAsociadaPregunta={this.onModificarVariableAsociadaPregunta}
                                                      onModificarOpcionesPregunta={this.onModificarOpcionesPregunta}
                                                      onAnadirOpcionPregunta={this.onAnadirOpcionPregunta}
                                                      onEliminarOpcionPregunta={this.onEliminarOpcionPregunta}
                                            />
                                    )
                                    }
                                </ul>
                                <div>
                                    <Button size={"sm"} className={"botonSuccess"} style={{marginBottom: '20px'}} block
                                            onClick={this.onAnadirPregunta}>
                                        Añadir Pregunta
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                    <Alert
                        color={this.state.alert.status === "OK" ? "success" : "danger"}
                        isOpen={this.state.alert.status !== ""}
                        toggle={() => this.setState(prev => ({...prev, alert: {status: "", message: []}}))}
                    >

                        {this.state.alert.message.map(
                            (item, index) =>
                                <p>{item}</p>
                        )}
                    </Alert>

                    <Row>
                        <Col style={{paddingLeft: '1px'}}>
                            <Route>{
                                ({history}) =>
                                    <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                            onClick={() => history.goBack()}>Volver</Button>
                            }</Route>
                        </Col>
                        <Col style={{paddingLeft: '1px'}}>
                            <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonWarning"}
                                    onClick={this.onModificarExperimento}>Modificar Experimento</Button>
                        </Col>
                        <Col style={{padding: '0px'}}>
                            <Button Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonDanger"}
                                    onClick={() => this.setState({
                                        nombreExperimentoEliminar: this.state.nombreExperimento,
                                        idExperimentoEliminar: this.state.idExperimento,
                                        mostrarVistaConfirmacion: true
                                    })}>Eliminar Experimento</Button>
                        </Col>
                    </Row>
                </Container>
            );
    }
}

class Pregunta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textoPregunta: "",
            variableAsociada: "",
            opciones: [
                {
                    textoOpcion: ""
                }
            ]
        }
    }

    onTextoPreguntaChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, textoPregunta: value}))
        this.props.onModificarTextoPregunta(value, this.props.identificadorPregunta)
    }

    onVariableAsociadaChange = event => {
        let antiguaVariableAsociada = this.state.variableAsociada;
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, variableAsociada: value}))
        this.props.onModificarVariableAsociadaPregunta(antiguaVariableAsociada, value, this.props.identificadorPregunta)
    }

    onEliminarPregunta = () => {
        this.props.onEliminarPregunta();
    }

    onAnadirOpcion = () => {
        let {opciones} = this.state;
        let nuevasOpciones = [
            ...opciones,
            {
                textoOpcion: ""
            }
        ]
        this.setState({opciones: nuevasOpciones});
        this.props.onAnadirOpcionPregunta(this.props.identificadorPregunta)
    }

    onModificarOpcion = (textoOpcion, identificadorOpcion) => {
        this.setState(state => {
            state.opciones.map((item, index) => {
                if (index === identificadorOpcion) {
                    item.textoOpcion = textoOpcion;
                }
            })
        })
        this.props.onModificarOpcionesPregunta(textoOpcion, identificadorOpcion, this.props.identificadorPregunta)
    }

    onEliminarOpcion = identificadorOpcion => {
        let {opciones} = this.state;

        let nuevasOpciones = [
            ...opciones.slice(0, identificadorOpcion),
            ...opciones.slice(identificadorOpcion + 1),
        ]
        this.setState({opciones: nuevasOpciones});
        this.props.onEliminarOpcionPregunta(identificadorOpcion, this.props.identificadorPregunta)
    }

    render() {
        return (
            <Card className="cards" color="primary">
                <CardHeader style={{marginBottom: '-30px'}}>
                    <CardTitle>Pregunta {this.props.identificadorPregunta + 1} </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Form.Row>
                            <Col sm={9}>
                                <Input className="inputs" size={"sm"} placeholder="Texto Pregunta"
                                       value={this.props.pregunta.textoPregunta}
                                       onChange={this.onTextoPreguntaChange}/>
                            </Col>
                            <Col sm={3}>
                                <Input className="inputs" size={"sm"} type={"select"} placeholder="Añadir Variable"
                                       value={this.props.pregunta.variableAsociada}
                                       onChange={this.onVariableAsociadaChange}>
                                    <option value="" disabled>Seleccionar Variable</option>
                                    {this.props.variables.map(
                                        (item, index) =>
                                            <option>{item}</option>
                                    )
                                    }
                                    {!this.props.variables.includes(this.props.pregunta.variableAsociada) && this.props.pregunta.variableAsociada !== "" &&
                                    <option>{this.props.pregunta.variableAsociada}</option>
                                    }
                                </Input>
                            </Col>
                        </Form.Row>
                    </Form>
                    <Card className="cards" style={{marginTop: '20px', marginBottom: '-10px'}} color="primary">

                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle>Opciones</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-50px'}}>
                            <ul className="lista">
                                {this.props.pregunta.opciones.map(
                                    (item, index) =>
                                        <Opcion opcion={item} key={index} identificadorOpcion={index}
                                                onEliminarOpcion={() => this.onEliminarOpcion(index)}
                                                onModificarOpcion={this.onModificarOpcion}/>
                                )
                                }
                            </ul>
                        </CardBody>
                        <CardFooter>
                            <Button size={"sm"} block className={"botonSuccess"} onClick={this.onAnadirOpcion}>
                                Añadir Opcion
                            </Button>
                        </CardFooter>
                    </Card>
                </CardBody>
                <CardFooter>
                    <Button size={"sm"} block className="botonDanger" onClick={this.onEliminarPregunta}>
                        Eliminar Pregunta
                    </Button>
                </CardFooter>
            </Card>
        )
    }
}

class Opcion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textoOpcion: ""
        }
    }

    onTextoOpcionChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, textoOpcion: value}))
        this.props.onModificarOpcion(value, this.props.identificadorOpcion)
    }

    onEliminarOpcion = () => {
        this.props.onEliminarOpcion();
    }

    render() {
        return (
            <li className="lista">
                <div>
                    <Form>
                        <Form.Row>
                            <Col sm={9}>
                                <Input className="inputs" size={"sm"} placeholder="Texto Opcion"
                                       value={this.props.opcion.textoOpcion}
                                       onChange={this.onTextoOpcionChange}/>
                            </Col>
                            <Col sm={3}>
                                <Button size={"sm"} block className={"botonDanger"} onClick={this.onEliminarOpcion}>
                                    Eliminar Opcion
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </li>
        )
    }
}

class Objetivo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textoObjetivo: ""
        }
    }

    onTextoObjetivoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, textoObjetivo: value}))
        this.props.onModificarObjetivo(value, this.props.identificadorObjetivo)
    }

    onEliminarObjetivo = () => {
        this.props.onEliminarObjetivo();
    }

    render() {
        return (
            <li className="lista">
                <div>
                    <Form>
                        <Form.Row>
                            <Col sm={9}>
                                <Input size={"sm"} placeholder="Texto Objetivo"
                                       value={this.props.objetivo.textoObjetivo}
                                       onChange={this.onTextoObjetivoChange}/>
                            </Col>
                            <Col sm={3}>
                                <Button block size={"sm"} style={{height: "29px"}} className={"botonDanger"}
                                        onClick={this.onEliminarObjetivo}>
                                    Eliminar Objetivo
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </li>
        )
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



