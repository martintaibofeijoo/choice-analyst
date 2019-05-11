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
            ok: false,
            idAdministrador: this.props.auth.user.username,
            idEstablecimiento: "",
            nombreExperimento: "",
            preguntas: [],
            objetivos: [],
            variablesAsignadas: [],
            variables: ["Higiene", "Ruído", "Distancía", "Energía", "Compañía", "Atmósfera", "Calidad de Servicio", "Apariencia", "Temperatura", "Saludable", "Sabroso", "Menu Seleccionado", "Primer Plato", "Segundo Plato", "Postre"]
        }
    }

    async componentDidMount() {
        const postRequest = await fetch(`http://localhost:9000/experimentos/verExperimento/${this.props.idExperimento}`, {
            method: "GET",
            //'Authorization': this.props.auth.token,
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            }
        })
        const postResponse = await postRequest.json()
        this.setState(prev => ({
            ...prev,
            idExperimento: postResponse.idExperimento,
            idAdministrador: postResponse.idAdministrador,
            idEstablecimiento: postResponse.idEstablecimiento,
            nombreExperimento: postResponse.nombreExperimento,
            fechaCreacion: postResponse.fechaCreacion,
            objetivos: postResponse.objetivos,
            preguntas: postResponse.preguntas
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

    onModificarVariableAsociadaPregunta = (variableAsociada, identificador) => {
        this.setState(state => {
            state.preguntas.map((item, index) => {
                if (index === identificador) {
                    item.variableAsociada = variableAsociada;
                    /* if (this.state.variables.includes(variableAsociada)) {
                         let posicion = 0;
                         this.state.variables.map((item, index) => {
                             if (item === variableAsociada) {
                                 posicion = index;
                             }
                         })
                         console.log(posicion)
                         let {variables} = this.state;

                         let nuevasVariables = [
                             ...variables.slice(0, posicion),
                             ...variables.slice(posicion + 1),
                         ]
                         this.setState({variables: nuevasVariables});

                     } else if (this.state.variables.includes(variableAsociada)) {
                         let {variables} = this.state;
                         let nuevasVariables = [
                             ...variables, variableAsociada
                         ]
                         this.setState({variables: nuevasVariables});
                     }*/
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

    onModificarExperimento = () => {
        this.doModificarExperimento(this.state.idAdministrador, this.state.idEstablecimiento, this.state.nombreExperimento, this.state.preguntas, this.state.objetivos)
    }

    doModificarExperimento = async (idAdministrador, idEstablecimiento, nombreExperimento, preguntas, objetivos) => {
        let idExperimento = nombreExperimento.replace(/ /g, "-");
        idExperimento = idExperimento.toLowerCase()
        idExperimento = idExperimento.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        const response = await fetch(`http://localhost:9000/experimentos/${this.props.idExperimento}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
            body: JSON.stringify({
                idExperimento: idExperimento,
                idAdministrador: idAdministrador,
                nombreExperimento: nombreExperimento,
                preguntas: preguntas,
                objetivos: objetivos,
            })
        })
        const codigo = response.status

        if (codigo === 200) {
            this.setState(prev => ({
                ...prev,
                idExperimento: idExperimento,
                ok: true
            }))
        }

    }

    render() {
        if (this.state.ok)
            return <Redirect to={{
                pathname: `/experimentos/verExperimento/${this.state.idExperimento}`,
                state: {
                    mensaje:"modificado",
                    status:"OK"
                }
            }}/>;
        else
            return (
                <Container>
                    <Row>
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
                                               onChange={this.onNombreExperimentoChange}/>
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
                            <CardBody>
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
                            <CardBody>
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
                            <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonDanger"}
                                    onClick={this.onModificarExperimento}>Eliminar Experimento</Button>
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
            <Card className="cards" className="cards" color="primary">
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


