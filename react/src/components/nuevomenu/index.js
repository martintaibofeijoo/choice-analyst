import React, {PureComponent as Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {
    Button,
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


import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {ButtonToolbar, Container, Media} from "react-bootstrap";
import {Authentication} from "../authentication";
import Form from "react-bootstrap/Form";


export class NuevoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primerosPlatos: [
                {
                    identificador: "",
                    nombrePlato: "",
                    precioPlato: "",
                    ingredientes: [
                        {
                            nombreIngrediente: ""
                        }
                    ]
                }
            ]
        }
    }

    eliminarPrimerPlato = position => {
        let {primerosPlatos} = this.state;

        let nuevosPrimerosPlatos = [
            ...primerosPlatos.slice(0, position),
            ...primerosPlatos.slice(position + 1),
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});

    }

    onModificarPlato = plato => {
        let {primerosPlatos} = this.state;
        for (let i=0; i< primerosPlatos.length;i++){
            debugger
        }
        console.log(primerosPlatos.get(plato.identificador))
    }


    anadirPrimerPlato = () => {
        let {primerosPlatos} = this.state;
        let nuevosPrimerosPlatos = [
            ...primerosPlatos,
            {
                identificador: "",
                nombrePlato: "",
                precioPlato: "",
                ingredientes: [
                    {
                        nombreIngrediente: ""
                    }
                ]
            }
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }


    render() {
        return (
            <div className="app">
                <h1>Ejemplo de listas</h1>
                <ul className="todo-list">
                    {this.state.primerosPlatos.map(
                        (item, index) =>
                            <Plato data={item} key={index} clave={index}
                                   onRemove={() => this.eliminarPrimerPlato(index)}
                                   onModificarPlato={this.onModificarPlato}/>
                    )
                    }
                </ul>
                <div className="footer">
                    <Boton
                        onClick={this.anadirPrimerPlato}
                        name="Añadir producto"
                    />
                </div>
            </div>
        );
    }
}

class Plato extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            precio: "",
            identificador: 0
        }
    }

    onNombrePlatoChange = evt => {
        let value = evt.target !== null ? evt.target.value : ""
        this.setState(prev => ({...prev, nombre: value}))
        this.setState({identificador: this.props.clave});
        this.props.onModificarPlato(this.state)

    }
    onPrecioPlatoChange = evt => {
        let value = evt.target !== null ? evt.target.value : ""
        this.setState(prev => ({...prev, precio: value}))
        this.setState({identificador: this.props.clave});
        this.props.onModificarPlato(this.state)
    }

    eliminarPlato = () => {
        if (this.props.onRemove)
            this.props.onRemove();
    }

    render() {
        return (
            <li>
                <div>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input placeholder="Nombre del Plato" value={this.state.nombre}
                                       onChange={this.onNombrePlatoChange}/>
                            </Col>
                            <Col>
                                <Input placeholder="Precio del Plato" value={this.state.precio}
                                       onChange={this.onPrecioPlatoChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                <button className="remove" onClick={this.eliminarPlato}>
                    <i className="material-icons">Eliminar</i>
                </button>
            </li>
        )
    }
}

class Boton extends Component {

    _add = () => {
        if (this.props.onClick)
            this.props.onClick();
    }

    render() {
        return (
            <button className="add-button" onClick={this._add}>
                {this.props.name}
            </button>
        )
    }
}