import React, {PureComponent as Component} from 'react'
import {
    Col,
    Row,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Input,
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";


export class CrearMenu extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaCrearMenu auth={auth}/>
            }
        </Authentication>
    }
}


class VistaCrearMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreMenu: "",
            idAdministrador: this.props.auth.user.username,
            primerosPlatos: [
                {
                    nombrePlato: "",
                    precioPlato: "",
                    tipoPlato: "PrimerPlato",
                    ingredientes: [
                        {
                            textoIngrediente: ""
                        }
                    ]
                }
            ],
            segundosPlatos: [
                {
                    nombrePlato: "",
                    precioPlato: "",
                    tipoPlato: "SegundoPlato",
                    ingredientes: [
                        {
                            textoIngrediente: ""
                        }
                    ]
                }
            ],
            postres: [
                {
                    nombrePlato: "",
                    precioPlato: "",
                    tipoPlato: "Postre",
                    ingredientes: [
                        {
                            textoIngrediente: ""
                        }
                    ]
                }
            ]
        }
    }

    onNombreMenuChange = (event) => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreMenu: value}))
    }

    onAnadirPrimerPlato = () => {
        let {primerosPlatos} = this.state;
        let nuevosPrimerosPlatos = [
            ...primerosPlatos,
            {
                nombrePlato: "",
                precioPlato: "",
                tipoPlato: "PrimerPlato",
                ingredientes: [
                    {
                        textoIngrediente: ""
                    }
                ]
            }
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }

    onModificarNombrePrimerPlato = (nombre, identificador) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.nombrePlato = nombre;
                }
            })
        })
    }

    onModificarPrecioPrimerPlato = (precio, identificador) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.precioPlato = precio;
                }
            })
        })
    }

    onAnadirIngredientePrimerPlato = (identificadorPlato) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [...item.ingredientes, {textoIngrediente: "",}]
                }
            })
        })
    }

    onModificarIngredientesPrimerPlato = (textoIngrediente, identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes.map((item1, index1) => {
                        if (index1 === identificadorIngrediente) {
                            item1.textoIngrediente = textoIngrediente
                        }
                    })
                }
            })
        })
    }

    onEliminarIngredientePrimerPlato = (identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [
                        ...item.ingredientes.slice(0, identificadorIngrediente),
                        ...item.ingredientes.slice(identificadorIngrediente + 1),
                    ]
                }
            })
        })
    }

    onEliminarPrimerPlato = position => {
        let {primerosPlatos} = this.state;

        let nuevosPrimerosPlatos = [
            ...primerosPlatos.slice(0, position),
            ...primerosPlatos.slice(position + 1),
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }


    onAnadirSegundoPlato = () => {
        let {segundosPlatos} = this.state;
        let nuevosSeguntosPlatos = [
            ...segundosPlatos,
            {
                nombrePlato: "",
                precioPlato: "",
                tipoPlato: "SegundoPlato",
                ingredientes: [
                    {
                        textoIngrediente: ""
                    }
                ]
            }
        ]
        this.setState({segundosPlatos: nuevosSeguntosPlatos});
    }

    onModificarNombreSegundoPlato = (nombre, identificador) => {
        this.setState(state => {
            state.segundosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.nombrePlato = nombre;
                }
            })
        })
    }

    onModificarPrecioSegundoPlato = (precio, identificador) => {
        this.setState(state => {
            state.segundosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.precioPlato = precio;
                }
            })
        })
    }

    onAnadirIngredienteSegundoPlato = (identificadorPlato) => {
        this.setState(state => {
            state.segundosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [...item.ingredientes, {textoIngrediente: "",}]
                }
            })
        })
    }

    onModificarIngredientesSegundoPlato = (textoIngrediente, identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.segundosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes.map((item1, index1) => {
                        if (index1 === identificadorIngrediente) {
                            item1.textoIngrediente = textoIngrediente
                        }
                    })
                }
            })
        })
    }

    onEliminarIngredienteSegundoPlato = (identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.segundosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [
                        ...item.ingredientes.slice(0, identificadorIngrediente),
                        ...item.ingredientes.slice(identificadorIngrediente + 1),
                    ]
                }
            })
        })
    }

    onEliminarSegundoPlato = position => {
        let {segundosPlatos} = this.state;

        let nuevosSegundosPlatos = [
            ...segundosPlatos.slice(0, position),
            ...segundosPlatos.slice(position + 1),
        ]
        this.setState({segundosPlatos: nuevosSegundosPlatos});
    }


    onAnadirPostre = () => {
        let {postres} = this.state;
        let nuevosPostres = [
            ...postres,
            {
                nombrePlato: "",
                precioPlato: "",
                tipoPlato: "Postre",
                ingredientes: [
                    {
                        textoIngrediente: ""
                    }
                ]
            }
        ]
        this.setState({postres: nuevosPostres});
    }

    onModificarNombrePostre = (nombre, identificador) => {
        this.setState(state => {
            state.postres.map((item, index) => {
                if (index === identificador) {
                    item.nombrePlato = nombre;
                }
            })
        })
    }

    onModificarPrecioPostre = (precio, identificador) => {
        this.setState(state => {
            state.postres.map((item, index) => {
                if (index === identificador) {
                    item.precioPlato = precio;
                }
            })
        })
    }

    onAnadirIngredientePostre = (identificadorPlato) => {
        this.setState(state => {
            state.postres.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [...item.ingredientes, {textoIngrediente: "",}]
                }
            })
        })
    }

    onModificarIngredientesPostre = (textoIngrediente, identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.postres.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes.map((item1, index1) => {
                        if (index1 === identificadorIngrediente) {
                            item1.textoIngrediente = textoIngrediente
                        }
                    })
                }
            })
        })
    }

    onEliminarIngredientePostre = (identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.postres.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes = [
                        ...item.ingredientes.slice(0, identificadorIngrediente),
                        ...item.ingredientes.slice(identificadorIngrediente + 1),
                    ]
                }
            })
        })
    }

    onEliminarPostre = position => {
        let {postres} = this.state;

        let nuevosPostres = [
            ...postres.slice(0, position),
            ...postres.slice(position + 1),
        ]
        this.setState({postres: nuevosPostres});
    }


    onCrearMenu = () => {
        this.doCrearMenu(this.state.nombreMenu, this.state.primerosPlatos, this.state.segundosPlatos, this.state.postres, this.state.idAdministrador)
    }

    doCrearMenu = async (nombreMenu, primerosPlatos, segundosPlatos, postres, idAdministrador) => {
        let platos = primerosPlatos.concat(segundosPlatos)
        platos= platos.concat(postres)
        let idMenu = nombreMenu.replace(/ /g, "-");
        idMenu = idMenu.toLowerCase()
        idMenu = idMenu.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const response = await fetch(`http://localhost:9000/establecimientos/${idAdministrador}/menus`, {
            method: 'POST',
            headers: {
                //'Authorization': this.props.token,
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },

            body: JSON.stringify({
                idMenu: idMenu,
                nombreMenu: nombreMenu,
                platos: platos
            })
        })
        const codigo = response.status


        console.log(codigo)
        console.table(platos)
        console.table(this.props.auth)
        debugger

    }

    render() {
        return (
            <Container>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Nombre
                                Menu</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Card block className="cards" color="primary">
                                <CardBody>
                                    <Input size={"sm"} className="inputs" size={"sm"} placeholder="Nombre Menu"
                                           value={this.state.nombreMenu}
                                           onChange={this.onNombreMenuChange}/>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card className="cards" block color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Primeros Platos</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul className="lista">
                                {this.state.primerosPlatos.map(
                                    (item, index) =>
                                        <Plato plato={item} key={index} identificadorPlato={index}
                                               onEliminarPlato={() => this.onEliminarPrimerPlato(index)}
                                               onModificarNombrePlato={this.onModificarNombrePrimerPlato}
                                               onModificarPrecioPlato={this.onModificarPrecioPrimerPlato}
                                               onModificarIngredientesPlato={this.onModificarIngredientesPrimerPlato}
                                               onAnadirIngredientePlato={this.onAnadirIngredientePrimerPlato}
                                               onEliminarIngredientePlato={this.onEliminarIngredientePrimerPlato}
                                        />
                                )
                                }
                            </ul>
                            <div>
                                <Button size={"sm"} style={{marginBottom: '20px'}} block className={"botonSuccess"}
                                        onClick={this.onAnadirPrimerPlato}>
                                    Añadir Primer Plato
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Row>

                <Row>
                    <Card className="cards" block color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Segundos Platos</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul className="lista">
                                {this.state.segundosPlatos.map(
                                    (item, index) =>
                                        <Plato plato={item} key={index} identificadorPlato={index}
                                               onEliminarPlato={() => this.onEliminarSegundoPlato(index)}
                                               onModificarNombrePlato={this.onModificarNombreSegundoPlato}
                                               onModificarPrecioPlato={this.onModificarPrecioSegundoPlato}
                                               onModificarIngredientesPlato={this.onModificarIngredientesSegundoPlato}
                                               onAnadirIngredientePlato={this.onAnadirIngredienteSegundoPlato}
                                               onEliminarIngredientePlato={this.onEliminarIngredienteSegundoPlato}
                                        />
                                )
                                }
                            </ul>
                            <div>
                                <Button size={"sm"} style={{marginBottom: '20px'}} block className={"botonSuccess"}
                                        onClick={this.onAnadirSegundoPlato}>
                                    Añadir Segundo Plato
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Row>

                <Row>
                    <Card className="cards" block color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Postres</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul className="lista">
                                {this.state.postres.map(
                                    (item, index) =>
                                        <Plato plato={item} key={index} identificadorPlato={index}
                                               onEliminarPlato={() => this.onEliminarPostre(index)}
                                               onModificarNombrePlato={this.onModificarNombrePostre}
                                               onModificarPrecioPlato={this.onModificarPrecioPostre}
                                               onModificarIngredientesPlato={this.onModificarIngredientesPostre}
                                               onAnadirIngredientePlato={this.onAnadirIngredientePostre}
                                               onEliminarIngredientePlato={this.onEliminarIngredientePostre}
                                        />
                                )
                                }
                            </ul>
                            <div>
                                <Button size={"sm"} style={{marginBottom: '20px'}} block className={"botonSuccess"}
                                        onClick={this.onAnadirPostre}>
                                    Añadir Postre
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Row>

                <Row>
                    <Button size={"sm"} style={{marginBottom: '50px'}} block className={"botonSuccess"}
                            onClick={this.onCrearMenu}>Crear
                        Menú</Button>
                </Row>

            </Container>
        );
    }
}

class Plato extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombrePlato: "",
            precioPlato: "",
            ingredientes: [
                {
                    textoIngrediente: ""
                }
            ]
        }
    }

    onNombrePlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombrePlato: value}))
        this.props.onModificarNombrePlato(value, this.props.identificadorPlato)
    }

    onPrecioPlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, precioPlato: value}))
        this.props.onModificarPrecioPlato(value, this.props.identificadorPlato)
    }

    onEliminarPlato = () => {
        this.props.onEliminarPlato();
    }

    onAnadirIngrediente = () => {
        let {ingredientes} = this.state;
        let nuevosIngredientes = [
            ...ingredientes,
            {
                textoIngrediente: ""
            }
        ]
        this.setState({ingredientes: nuevosIngredientes});
        this.props.onAnadirIngredientePlato(this.props.identificadorPlato)
    }

    onModificarIngrediente = (textoIngrediente, identificadorIngrediente) => {
        this.setState(state => {
            state.ingredientes.map((item, index) => {
                if (index === identificadorIngrediente) {
                    item.textoIngrediente = textoIngrediente;
                }
            })
        })
        this.props.onModificarIngredientesPlato(textoIngrediente, identificadorIngrediente, this.props.identificadorPlato)
    }

    onEliminarIngrediente = identificadorIngrediente => {
        let {ingredientes} = this.state;

        let nuevosIngredientes = [
            ...ingredientes.slice(0, identificadorIngrediente),
            ...ingredientes.slice(identificadorIngrediente + 1),
        ]
        this.setState({ingredientes: nuevosIngredientes});
        this.props.onEliminarIngredientePlato(identificadorIngrediente, this.props.identificadorPlato)
    }

    render() {
        return (
            <Card className="cards" className="cards" color="primary">
                <CardHeader style={{marginBottom: '-30px'}}>
                    <CardTitle>Plato {this.props.identificadorPlato + 1} </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input size={"sm"} className="inputs" placeholder="Nombre del Plato"
                                       value={this.props.plato.nombre}
                                       onChange={this.onNombrePlatoChange}/>
                            </Col>
                            <Col>
                                <Input size={"sm"} className="inputs" placeholder="Precio del Plato"
                                       value={this.props.plato.precio}
                                       onChange={this.onPrecioPlatoChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                    <Card className="cards" style={{marginTop: '20px', marginBottom: '-10px'}} className="cards"
                          color="primary">

                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle>Ingredientes</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-50px'}}>
                            <ul className="lista">
                                {this.props.plato.ingredientes.map(
                                    (item, index) =>
                                        <Ingrediente ingrediente={item} key={index} identificadorIngrediente={index}
                                                     onEliminarIngrediente={() => this.onEliminarIngrediente(index)}
                                                     onModificarIngrediente={this.onModificarIngrediente}/>
                                )
                                }
                            </ul>
                        </CardBody>
                        <CardFooter>
                            <Button size={"sm"} block className={"botonSuccess"} onClick={this.onAnadirIngrediente}>
                                Añadir Ingrediente
                            </Button>
                        </CardFooter>
                    </Card>
                </CardBody>
                <CardFooter>
                    <Button size={"sm"} block className={"botonDanger"} onClick={this.onEliminarPlato}>
                        Eliminar Plato
                    </Button>
                </CardFooter>
            </Card>
        )
    }
}

class Ingrediente extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textoIngrediente: ""
        }
    }

    onTextoIngredienteChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, textoIngrediente: value}))
        this.props.onModificarIngrediente(value, this.props.identificadorIngrediente)
    }

    onEliminarIngrediente = () => {
        this.props.onEliminarIngrediente();
    }

    render() {
        return (
            <li className="lista">
                <div>
                    <Form>
                        <Form.Row>
                            <Col sm={9}>
                                <Input size={"sm"} className="inputs" placeholder="Nombre del Ingrediente"
                                       value={this.props.ingrediente.textoIngrediente}
                                       onChange={this.onTextoIngredienteChange}/>
                            </Col>
                            <Col sm={3}>
                                <Button size={"sm"} block className={"botonDanger"}
                                        onClick={this.onEliminarIngrediente}>
                                    Eliminar Ingrediente
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </li>
        )
    }
}


