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


export class NuevoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primerosPlatos: [
                {
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

    onAnadirPrimerPlato = () => {
        let {primerosPlatos} = this.state;
        let nuevosPrimerosPlatos = [
            ...primerosPlatos,
            {
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
                    item.ingredientes = [...item.ingredientes, {nombreIngrediente: "",}]
                }
            })
        })
    }

    onModificarIngredientesPrimerPlato = (nombreIngrediente, identificadorIngrediente, identificadorPlato) => {
        this.setState(state => {
            state.primerosPlatos.map((item, index) => {
                if (index === identificadorPlato) {
                    item.ingredientes.map((item1, index1) => {
                        if (index1 === identificadorIngrediente) {
                            item1.nombreIngrediente = nombreIngrediente
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

    }

    render() {
        return (
            <div>
                <div>
                    <h1>Primeros Platos</h1>
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
                        <Button style={{marginBottom: '20px'}} block variant="success" onClick={this.onAnadirPrimerPlato}>
                            Añadir Primer Plato
                        </Button>
                    </div>
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
            nombrePlato: "",
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
                nombreIngrediente: ""
            }
        ]
        this.setState({ingredientes: nuevosIngredientes});
        this.props.onAnadirIngredientePlato(this.props.identificadorPlato)
    }

    onModificarIngrediente = (nombreIngrediente, identificadorIngrediente) => {
        this.setState(state => {
            state.ingredientes.map((item, index) => {
                if (index === identificadorIngrediente) {
                    item.nombreIngrediente = nombreIngrediente;
                }
            })
        })
        this.props.onModificarIngredientesPlato(nombreIngrediente, identificadorIngrediente, this.props.identificadorPlato)
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
            <Card color="primary">
                <CardHeader style={{marginBottom: '-30px'}}>
                    <CardTitle>Plato {this.props.identificadorPlato + 1} </CardTitle>
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
                            {this.props.plato.ingredientes.map(
                                (item, index) =>
                                    <Ingrediente ingrediente={item} key={index} identificadorIngrediente={index}
                                                 onEliminarIngrediente={() => this.onEliminarIngrediente(index)}
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
                    <Button block variant="danger" className="botonEliminarPlato" onClick={this.onEliminarPlato}>
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
            nombreIngrediente: ""
        }
    }

    onNombreIngredienteChange = event => {
        let value = event.target !== null ? event.target.value : ""
        this.setState(prev => ({...prev, nombreIngrediente: value}))
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
                            <Col>
                                <Input className="inputs" placeholder="Nombre del Ingrediente"
                                       value={this.props.ingrediente.nombreIngrediente}
                                       onChange={this.onNombreIngredienteChange}/>
                            </Col>
                            <Col>
                                <Button block variant="danger" onClick={this.onEliminarIngrediente}>
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


