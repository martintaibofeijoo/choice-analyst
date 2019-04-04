import React, {PureComponent as Component} from 'react'
import {
    Col,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Input, Label,
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Authentication} from "../authentication";

export class CrearExperimento extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaCrearExperimento auth={auth}/>
            }
        </Authentication>
    }
}

class VistaCrearExperimento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAdministrador: this.props.auth.user.username,
            idEstablecimiento: "",
            nombreExperimento: "",
            preguntas: [
                {
                    textoPregunta: "",
                    variableAsociada: "",
                    opciones: [
                        {
                            textoOpcion: ""
                        }
                    ]
                }
            ],
            objetivos: [
                {
                    textoObjetivo: ""
                }
            ],
            variablesAsignadas:[],
            variables: ["Higiene","Ruído", "Distancía", "Energía", "Compañía", "Atmosfera", "Calidad de Servicio", "Apariencia", "Temperatura", "Saludable" , "Sabroso", "Menu Seleccionado", "Primer Plato", "Segundo Plato", "Postre"]
        }
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

    onModificarVariableAsociadaPregunta = (variableAsociada, identificador) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificador) {
                    item.variableAsociada = variableAsociada;
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

    onCrearExperimento = () => {
        this.doCrearExperimento(this.state.preguntas, this.state.objetivos)
    }

    doCrearExperimento = async (idAdministrador, idEstablecimiento, nombreExperimento, preguntas, objetivos) => {
        let idExperimento = nombreExperimento.replace(/ /g, "-");
        idExperimento = idExperimento.toLowerCase()
        idExperimento = idExperimento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        const response = await fetch(`http://localhost:9000/experimentos/`, {
            method: 'POST',
            headers: {
                //'Authorization': this.props.token,
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },

            body: JSON.stringify({
                idExperimento: idExperimento,
                idAdministrador: idAdministrador,
                idEstablecimiento: idEstablecimiento,
                nombreExperimento: nombreExperimento,
                preguntas: preguntas,
                objetivos: objetivos,
            })
        })
        debugger
        const codigo = response.status
        console.log(codigo)

    }

    render() {
        return (
            <Container classname={"containerexperimento"} style={{marginLeft: '-200px'}}>
                <Row>
                    <Form>
                        <Form.Group>
                            <Label>Nombre Establecimiento</Label>
                            <Form.Control value={this.state.nombreExperimento}
                                          pattern="[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z0-9A-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-Z0-9À-ÿ\u00f1\u00d1]+"
                                          onChange={this.onNombreExperimentoChange} required/>
                            <Form.Control.Feedback type="invalid">
                                Introduce el nombre del establecimiento
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <h1>Preguntas</h1>
                        <ul className="lista">
                            {this.state.preguntas.map(
                                (item, index) =>
                                    <Pregunta pregunta={item} key={index} identificadorPregunta={index}
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
                            <Button style={{marginBottom: '20px'}} block variant="success"
                                    onClick={this.onAnadirPregunta}>
                                Añadir Pregunta
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <h1>Objetivos</h1>
                        <Card color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle>Objetivos</CardTitle>
                            </CardHeader>
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
                                <Button block variant="success" onClick={this.onAnadirObjetivo}>
                                    Añadir Objetivo
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Button style={{marginBottom: '50px'}} block color={"success"}
                            onClick={this.onCrearExperimento}>Crear
                        Experimento</Button>
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
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, variableAsociada: value}))
        this.props.onModificarVariableAsociadaPregunta(value, this.props.identificadorPregunta)
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
            <Card color="primary">
                <CardHeader style={{marginBottom: '-30px'}}>
                    <CardTitle>Pregunta {this.props.identificadorPregunta + 1} </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input className="inputs" placeholder="Texto Pregunta"
                                       value={this.props.pregunta.textoPregunta}
                                       onChange={this.onTextoPreguntaChange}/>
                            </Col>
                            <Col>
                                <Input className="inputs" placeholder="Nombre Variable"
                                       value={this.props.pregunta.variableAsociada}
                                       onChange={this.onVariableAsociadaChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
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
                    <CardFooter style={{marginBottom: '-30px'}}>
                        <Button block variant="success" onClick={this.onAnadirOpcion}>
                            Añadir Opcion
                        </Button>
                    </CardFooter>
                </CardBody>
                <CardFooter>
                    <Button block variant="danger" className="botonEliminarPlato" onClick={this.onEliminarPregunta}>
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
                            <Col>
                                <Input className="inputs" placeholder="Texto Opcion"
                                       value={this.props.opcion.textoOpcion}
                                       onChange={this.onTextoOpcionChange}/>
                            </Col>
                            <Col>
                                <Button block variant="danger" onClick={this.onEliminarOpcion}>
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
                            <Col>
                                <Input className="inputs" placeholder="Texto Objetivo"
                                       value={this.props.objetivo.textoObjetivo}
                                       onChange={this.onTextoObjetivoChange}/>
                            </Col>
                            <Col>
                                <Button block variant="danger" onClick={this.onEliminarObjetivo}>
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


