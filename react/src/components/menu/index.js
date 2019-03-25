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





export class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            primerosPlatos: []
        }
    }

    _eliminarPrimerPlato(position) {
        let {primerosPlatos} = this.state;

        let nuevosPrimerosPlatos = [
            ...primerosPlatos.slice(0, position),
            ...primerosPlatos.slice(position + 1),
        ]

        this.setState({primerosPlatos: nuevosPrimerosPlatos});

    }

    _anadirPrimerPlato = () => {
        let {primerosPlatos} = this.state;
        let nuevosPrimerosPlatos = [
            ...primerosPlatos,
            {
                name: "Papas a la francesa",
                portion: "140g",
                price: Math.floor(Math.random() * 20)
            }
        ]
        this.setState({primerosPlatos: nuevosPrimerosPlatos});
    }

    onAddPlato = plato => {
        this.setState(prev => ({...prev, primerosPlatos: [...prev.primerosPlatos, plato]}), () => console.log(this.state))
    }

    render() {
        return (
            <div className="app">
                <h1>Primeros Platos</h1>
                <FormPlato onAddPlato = { this.onAddPlato }/>
                <ul className="todo-list">
                    {this.state.primerosPlatos.map(plato => <li>{plato.nombre}</li>
                        // (item, index) =>
                        //     <Plato data={item} key={index} onRemove={() => this._eliminarPrimerPlato(index)} />
                    )
                    }
                </ul>
                {/*<div className="footer">*/}
                    {/*<BotonPlato*/}
                        {/*onClick={this._anadirPrimerPlato}*/}
                        {/*name="Añadir Primer Plato"*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>
        );
    }
}

class FormPlato extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            precio: ""
        }
    }

    onNombrePlatoChange = evt => {
        let value = evt.target !== null ? evt.target.value : ""
        this.setState(prev => ({...prev, nombre: value}))
    }
    onPrecioPlatoChange = evt => {
        let value = evt.target !== null ? evt.target.value : ""
        this.setState(prev => ({...prev, precio: value}))
    }
    onAddPlato = () => {
        this.props.onAddPlato(this.state)
    }

       render() {
           return <Form onSubmit = {this.onAddPlato}>
               <Form.Row>
                   <Col>
                       <Input placeholder="Nombre del Plato" value={this.state.nombre} onChange={this.onNombrePlatoChange}/>
                   </Col>
                   <Col>
                       <Input placeholder="Precio del Plato" value={this.state.precio} onChange={this.onPrecioPlatoChange}/>
                   </Col>
               </Form.Row>
               <Form.Row>
                   <Col>
                       <button className="add-button" onClick={this.onAddPlato}>
                           Guardar plato
                       </button>
                   </Col>
               </Form.Row>
           </Form>
       }
}

export class Plato extends Component {
    constructor(props){
        super(props)

        this.state={
            nombreIngrediente: "",
            precioPlato: "",
            ingredientes: [
                {
                    nombreIngrediente: ""
                }
            ]
        }
    }

    onNombrePlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreIngrediente: value}))
    }

    onPrecioPlatoChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, precioPlato: value}))
    }

    _eliminarIngrediente(position) {
        let {ingredientes} = this.state;

        let nuevosIngredientes = [
            ...ingredientes.slice(0, position),
            ...ingredientes.slice(position + 1),
        ]
        this.setState({ingredientes: nuevosIngredientes});

    }

    _anadirIngrediente() {
        let {primerosPlatos: ingredientes} = this.state;
        let nuevosIngredientes = [
            ...ingredientes,
            {
                name: "Papas a la francesa"
            }
        ]
        this.setState({ingredientes: nuevosIngredientes});
    }

    _eliminarPlato() {
        if (this.props.onRemove)
            this.props.onRemove();
    }

    render() {
        return (
            <li>
                <div className="name">
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input placeholder="Nombre del Plato" value={this.state.nombreIngrediente} onChange={this.onNombrePlatoChange}/>
                            </Col>
                            <Col>
                                <Input placeholder="Precio del Plato" value={this.state.precioPlato} onChange={this.onPrecioPlatoChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                <button className="remove" onClick={this._eliminarPlato.bind(this)}>
                    <i className="material-icons">Eliminar</i>
                </button>
            </li>
        )
    }
}

class Ingrediente extends Component {
    constructor(props){
        super(props)

        this.state={
            nombreIngrediente: ""
        }
    }

    onNombreIngredienteChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreIngrediente: value}))
    }

    _eliminarIngrediente() {
        if (this.props.onRemove)
            this.props.onRemove();
    }

    render() {
        return (
            <li>
                <div className="name">
                    <Form>
                        <Form.Row>
                            <Col>
                                <Input placeholder="Nombre del Ingrediente" value={this.state.nombreIngrediente} onChange={this.onNombreIngredienteChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
                <button className="remove" onClick={this._eliminarIngrediente.bind(this)}>
                    <i className="material-icons">Eliminar</i>
                </button>
            </li>
        )
    }
}

class BotonPlato extends Component {

    _anadirPlato() {
        if (this.props.onClick)
            this.props.onClick();
    }

    render() {
        return (
            <button className="add-button" onClick={this._anadirPlato.bind(this)}>
                {this.props.name}
            </button>
        )
    }
}

