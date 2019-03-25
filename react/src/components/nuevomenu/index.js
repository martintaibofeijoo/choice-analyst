import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Col,
    Row,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,

    Label,
    Input,
    Alert,
    NavbarBrand, FormGroup
} from 'reactstrap';

import Button from 'react-bootstrap/Button'

import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {ButtonToolbar, Container, Media} from "react-bootstrap";
import {Authentication} from "../authentication";
import Form from "react-bootstrap/Form";


export class NuevoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            precio: "",
            primerosPlatos: [
                {
                    nombrePlato: "",
                    precioPlato: "",
                    ingredientes: []
                }
            ]
        }
    }

    onEliminarPrimerPlato = position => {
        let {primerosPlatos} = this.state;

        let nuevosPrimerosPlatos = [
            ...primerosPlatos.slice(0, position),
            ...primerosPlatos.slice(position + 1),
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }

    onModificarNombrePrimerPlato = (nombre, identificador) => {
        this.setState(prev => ({...prev, nombre: nombre}))
        this.setState(prev => ({...prev, identificador: identificador}))
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.nombrePlato = nombre;
                    //console.table(this.state.primerosPlatos)
                }
            })
        })

    }

    onModificarPrecioPrimerPlato = (precio, identificador) => {
        this.setState(prev => ({...prev, precio: precio}))
        this.setState(prev => ({...prev, identificador: identificador}))
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificador) {
                    item.precioPlato = precio;
                    //console.table(this.state.primerosPlatos)
                }
            })
        })
    }

    onModificarIngredientesPrimerPlato = (ingredientes, identificador) => {
        this.setState(prev => ({...prev, ingredientes: ingredientes}))
        this.setState(prev => ({...prev, identificador: identificador}))
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificador) {
                    debugger
                    item.ingredientes = ingredientes;
                    //console.table(this.state.primerosPlatos)
                }
            })
        })
    }


    onAnadirPrimerPlato = () => {
        let {primerosPlatos} = this.state;
        let nuevosPrimerosPlatos = [
            ...primerosPlatos,
            {
                nombrePlato: "",
                precioPlato: "",
                ingredientes: []
            }
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }


    onEliminarIngredientePrimerPlato = position => {
        let {ingredientes} = this.state.primerosPlatos;
        let nuevosIngredientes = [
            ...ingredientes.slice(0, position),
            ...ingredientes.slice(position + 1),
        ]
        this.setState({ingredientes: nuevosIngredientes});
    }


    onModificarIngredientePrimerPlato = (nombreIngrediente, identificador) => {
        this.setState(state => {
            state.ingredientes.map((item, index) => {
                if (index === identificador) {
                    item.nombreIngrediente=nombreIngrediente;
                }
            })
        })
        this.props.onModificarIngredientesPlato(this.state.ingredientes, this.props.clave)

    }

    onAnadirIngredientePrimerPlato = () => {
        let {ingredientes} = this.state.primerosPlatos;
        let nuevosIngredientes = [
            ...ingredientes,
            {
                nombreIngrediente: ""
            }
        ]
        this.setState({ingredientes: nuevosIngredientes});
    }

    onCrearMenu = () => {
        this.doCrearMenu(this.state.primerosPlatos)
    }

    doCrearMenu = async (primerosPlatos) => {
        /*const response = await fetch(`http://localhost:9000/usuarios/`, {
            method: 'POST',
            headers: {
                //'Authorization': this.props.token,
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },

            body: JSON.stringify({

            })
        })
        const codigo = response.status
        console.log(codigo)*/
        console.table(primerosPlatos)
        debugger

    }

    render() {
        return (
            <div>
                <h1>{this.state.nombre}</h1>
                <h1>{this.state.precio}</h1>
                <h1>Primeros Platos</h1>
                <ul className="lista">
                    {this.state.primerosPlatos.map(
                        (item, index) =>
                            <Plato plato={item} key={index} clave={index}
                                   onEliminarPlato={() => this.onEliminarPrimerPlato(index)}
                                   onModificarNombrePlato={this.onModificarNombrePrimerPlato}
                                   onModificarPrecioPlato={this.onModificarPrecioPrimerPlato}
                                   onModificarIngredientePlato={this.onModificarIngredientePrimerPlato}
                                   onAnadirIngredientePlato={this.onAnadirIngredientePrimerPlato}
                                   onEliminarIngredientePlato={this.onEliminarIngredientePrimerPlato}
                            />
                    )
                    }
                </ul>
                <div>
                    <Button variant="success" onClick={this.onAnadirPrimerPlato}>
                        Añadir Primer Plato
                    </Button>
                </div>
                <div>
                    <Button style={{marginBottom: '50px'}} block color={"success"} onClick={this.onCrearMenu}>Crear
                        Menú</Button>
                </div>
            </div>
        );
    }
}

class Plato extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredientes: [
                {
                    nombreIngrediente: ""
                }
            ]
        }
    }

    onNombrePlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.props.onModificarNombrePlato(value, this.props.clave)
    }

    onPrecioPlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.props.onModificarPrecioPlato(value, this.props.clave)
    }


    eliminarPlato = () => {
        if (this.props.onEliminarPlato)
            this.props.onEliminarPlato();
    }

    onEliminarIngrediente = position => {
        let {ingredientes} = this.state;
        let nuevosIngredientes = [
            ...ingredientes.slice(0, position),
            ...ingredientes.slice(position + 1),
        ]
        this.setState({ingredientes: nuevosIngredientes});
    }


    onModificarIngrediente = (nombreIngrediente, identificador) => {
        this.setState(state => {
            state.ingredientes.map((item, index) => {
                if (index === identificador) {
                    item.nombreIngrediente=nombreIngrediente;
                }
            })
        })
        this.props.onModificarIngredientesPlato(this.state.ingredientes, this.props.clave)

    }

    onAnadirIngrediente = () => {
        let {ingredientes} = this.state;
        let nuevosIngredientes = [
            ...ingredientes,
            {
                nombreIngrediente: "",
            }
        ]
        this.setState({ingredientes: nuevosIngredientes});
    }

    render() {
        return (
            <Card color="primary">
                <CardHeader style={{marginBottom: '-30px'}}>
                    <CardTitle>Plato {this.props.clave + 1} </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input className="inputs" placeholder="Nombre del Plato"
                                       value={this.props.plato.nombre}
                                       onChange={this.onNombrePlatoChange}/>
                            </Col>
                            <Col>
                                <Input className="inputs" placeholder="Precio del Plato"
                                       value={this.props.plato.precio}
                                       onChange={this.onPrecioPlatoChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                    <CardHeader style={{marginBottom: '-30px'}}>
                        <CardTitle>Ingredientes</CardTitle>
                    </CardHeader>
                    <CardBody style={{marginBottom: '-50px'}}>
                        <ul className="lista">
                            {this.state.ingredientes.map(
                                (item, index) =>
                                    <Ingrediente ingrediente={item} key={index} clave={index}
                                                 onRemoveIngrediente={() => this.onEliminarIngrediente(index)}
                                                 onModificarIngrediente={this.onModificarIngrediente}/>
                            )
                            }
                        </ul>
                    </CardBody>
                    <CardFooter style={{marginBottom: '-30px'}}>
                        <Button block variant="success" onClick={this.onAnadirIngrediente}>
                            Añadir Ingrediente
                        </Button>
                    </CardFooter>
                </CardBody>
                <CardFooter>
                    <Button block variant="danger" className="botonEliminarPlato" onClick={this.eliminarPlato}>
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
        this.state = {}
    }

    onNombreIngredienteChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.props.onModificarIngrediente(value ,this.props.clave)
    }

    eliminarIngrediente = () => {
        if (this.props.onRemoveIngrediente)
            this.props.onRemoveIngrediente();
    }

    render() {
        return (
            <li className="lista">
                <div>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input className="inputs" placeholder="Nombre del Ingrediente"
                                       value={this.props.ingrediente.nombreIngrediente}
                                       onChange={this.onNombreIngredienteChange}/>
                            </Col>
                            <Col>
                                <Button block variant="danger" onClick={this.eliminarIngrediente}>
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


