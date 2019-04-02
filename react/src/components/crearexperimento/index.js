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
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


export class CrearExperimento extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            filtros: [
                {
                    textoFiltro: ""
                }
            ],
            objetivos: [
                {
                    textoObjetivo: ""
                }
            ]
        }
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


    onAnadirFiltro = () => {
        let {filtros} = this.state;
        let nuevosFiltros = [
            ...filtros,
            {
                textoFiltro: ""
            }
        ]
        this.setState({filtros: nuevosFiltros});
    }

    onModificarFiltro = (textoFiltro, identificadorFiltro) => {
        this.setState(state => {
            state.filtros.map((item, index) => {
                if (index === identificadorFiltro) {
                    item.textoFiltro = textoFiltro;
                }
            })
        })
    }

    onEliminarFiltro = identificadorFiltro => {
        let {filtros} = this.state;

        let nuevosFiltros = [
            ...filtros.slice(0, identificadorFiltro),
            ...filtros.slice(identificadorFiltro + 1),
        ]
        this.setState({filtros: nuevosFiltros});
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
        this.doCrearExperimento(this.state.preguntas, this.state.filtros, this.state.objetivos)
    }

    doCrearExperimento = async (preguntas, filtros, objetivos) => {
        const response = await fetch(`http://localhost:9000/experimentos/`, {
            method: 'POST',
            headers: {
                //'Authorization': this.props.token,
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },

            body: JSON.stringify({
                preguntas: preguntas,
                filtros: filtros,
                objetivos: objetivos
            })
        })

        const codigo = response.status
        console.log(codigo)

    }

    render() {
        return (
            <Container classname={"containerexperimento"} style={{marginLeft: '-200px'}}>
                <Row >
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
                        <h1>Filtros</h1>
                        <Card color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle>Filtros</CardTitle>
                            </CardHeader>
                            <CardBody style={{marginBottom: '-50px'}}>
                                <ul className="lista">
                                    {this.state.filtros.map(
                                        (item, index) =>
                                            <Filtro filtro={item} key={index} identificadorFiltro={index}
                                                    onEliminarFiltro={() => this.onEliminarFiltro(index)}
                                                    onModificarFiltro={this.onModificarFiltro}/>
                                    )
                                    }
                                </ul>
                            </CardBody>
                            <CardFooter>
                                <Button block variant="success" onClick={this.onAnadirFiltro}>
                                    Añadir Filtro
                                </Button>
                            </CardFooter>
                        </Card>


                        <h1>Objetivos</h1>
                        <Card color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle>Filtros</CardTitle>
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

class Filtro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textoFiltro: ""
        }
    }

    onTextoFiltroChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, textoFiltro: value}))
        this.props.onModificarFiltro(value, this.props.identificadorFiltro)
    }

    onEliminarFiltro = () => {
        this.props.onEliminarFiltro();
    }

    render() {
        return (
            <li className="lista">
                <div>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input className="inputs" placeholder="Texto Filtro"
                                       value={this.props.filtro.textoFiltro}
                                       onChange={this.onTextoFiltroChange}/>
                            </Col>
                            <Col>
                                <Button block variant="danger" onClick={this.onEliminarFiltro}>
                                    Eliminar Filtro
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
                                       value={this.props.objetivo.textoObjetivon}
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


