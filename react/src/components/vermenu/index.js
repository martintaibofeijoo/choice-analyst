import React, {PureComponent as Component} from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody, Alert,
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Authentication} from "../authentication";
import {Route} from "react-router-dom";


export class VerMenu extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaVerMenu auth={auth} idEstablecimiento={this.props.match.params.idEstablecimiento}
                                      idMenu={this.props.match.params.idMenu} mensaje={this.props.location.state}/>
            }
        </Authentication>
    }
}

class VistaVerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMenu: "",
            nombreMenu: "",
            fechasMenu: "",
            precioMenu: "",
            primerosPlatos: [],
            segundosPlatos: [],
            postres: [],
            objetivos: [],
            preguntas: []
        }
    }

    async componentDidMount() {
        const postRequest = await fetch(`http://localhost:9000/establecimientos/${this.props.idEstablecimiento}/menus/${this.props.idMenu}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.props.auth.token
            },
        })
        const postResponse = await postRequest.json()
        let platos = postResponse.platos;
        let primerosPlatos = [];
        let segundosPlatos = [];
        let postres = [];
        for (let i = 0; i < platos.length; i++) {
            if (platos[i].tipoPlato === "PrimerPlato") {
                primerosPlatos = [...primerosPlatos, platos[i]];
            } else if (platos[i].tipoPlato === "SegundoPlato") {
                segundosPlatos = [...segundosPlatos, platos[i]];
            } else if (platos[i].tipoPlato === "Postre") {
                postres = [...postres, platos[i]];
            }
        }

        let fechasMenu = postResponse.fechasMenu;
        let fechas = "";
        for (let j = 0; j < fechasMenu.length; j++) {
            if (j === 0) {
                fechas = fechasMenu[j];
            } else {
                fechas = fechas + ", " + fechasMenu[j];
            }
        }

        this.setState(prev => ({
            ...prev,
            idMenu: postResponse.idMenu,
            nombreMenu: postResponse.nombreMenu,
            fechasMenu: fechas,
            precioMenu: postResponse.precioMenu,
            primerosPlatos: primerosPlatos,
            segundosPlatos: segundosPlatos,
            postres: postres
        }))
    }


    render() {
        return (
            <Container>
                <h1 style={{textAlign: 'center'}}>Ver Menú</h1>
                {this.props.mensaje !== undefined &&
                <Alert
                    color={this.props.mensaje.status === "OK" ? "success" : "danger"}
                    isOpen={this.props.mensaje.status !== ""}
                >
                    {this.props.mensaje.message}
                </Alert>
                }
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{
                                fontSize: '20px',
                                textAlign: 'center'
                            }}>{this.state.nombreMenu}</CardTitle>
                        </CardHeader>
                        <CardBody style={{marginBottom: '-30px'}}>
                            <p style={{textAlign: 'center'}}>Fechas Menú</p>
                            <p style={{textAlign: 'center'}}>{this.state.fechasMenu}</p>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Primeros Platos</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.primerosPlatos.map(
                                    (item, index) =>
                                        <Card block style={{marginLeft: '-30px'}} className="cards" color="primary">
                                            <CardHeader style={{marginBottom: '-30px'}}>
                                                <CardTitle style={{
                                                    fontSize: '15px',
                                                }}>{item.nombrePlato}</CardTitle>
                                                <p style={{textAlign: 'center'}}>Precio Plato: {item.precioPlato} €</p>
                                            </CardHeader>
                                            <CardBody style={{marginBottom: '-30px'}}>
                                                <Card block className="cards" color="primary">
                                                    <CardHeader style={{marginBottom: '-30px'}}>
                                                        <CardTitle style={{
                                                            fontSize: '15px', textAlign: 'center'
                                                        }}>Ingredientes</CardTitle>
                                                    </CardHeader>
                                                    <CardBody style={{marginBottom: '-15px'}}>
                                                        {item.ingredientes.map(
                                                            (item1, index1) =>
                                                                <li type="square">{item1.textoIngrediente}</li>
                                                        )}
                                                    </CardBody>
                                                </Card>
                                            </CardBody>
                                        </Card>
                                )
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Segundos Platos</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.segundosPlatos.map(
                                    (item, index) =>
                                        <Card block style={{marginLeft: '-30px'}} className="cards" color="primary">
                                            <CardHeader style={{marginBottom: '-30px'}}>
                                                <CardTitle style={{
                                                    fontSize: '15px',
                                                }}>{item.nombrePlato}</CardTitle>
                                                <p style={{textAlign: 'center'}}>Precio Plato: {item.precioPlato} €</p>
                                            </CardHeader>
                                            <CardBody style={{marginBottom: '-30px'}}>
                                                <Card block className="cards" color="primary">
                                                    <CardHeader style={{marginBottom: '-30px'}}>
                                                        <CardTitle style={{
                                                            fontSize: '15px', textAlign: 'center'
                                                        }}>Ingredientes</CardTitle>
                                                    </CardHeader>
                                                    <CardBody style={{marginBottom: '-15px'}}>
                                                        {item.ingredientes.map(
                                                            (item1, index1) =>
                                                                <li type="square">{item1.textoIngrediente}</li>
                                                        )}
                                                    </CardBody>
                                                </Card>
                                            </CardBody>
                                        </Card>
                                )
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card block className="cards" color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Postres</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.postres.map(
                                    (item, index) =>
                                        <Card block style={{marginLeft: '-30px'}} className="cards" color="primary">
                                            <CardHeader style={{marginBottom: '-30px'}}>
                                                <CardTitle style={{
                                                    fontSize: '15px',
                                                }}>{item.nombrePlato}</CardTitle>
                                                <p style={{textAlign: 'center'}}>Precio Plato: {item.precioPlato} €</p>
                                            </CardHeader>
                                            <CardBody style={{marginBottom: '-30px'}}>
                                                <Card block className="cards" color="primary">
                                                    <CardHeader style={{marginBottom: '-30px'}}>
                                                        <CardTitle style={{
                                                            fontSize: '15px', textAlign: 'center'
                                                        }}>Ingredientes</CardTitle>
                                                    </CardHeader>
                                                    <CardBody style={{marginBottom: '-15px'}}>
                                                        {item.ingredientes.map(
                                                            (item1, index1) =>
                                                                <li type="square">{item1.textoIngrediente}</li>
                                                        )}
                                                    </CardBody>
                                                </Card>
                                            </CardBody>
                                        </Card>
                                )
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Route>{
                        ({history}) =>
                            <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                    onClick={() => history.goBack()}>Volver</Button>
                    }</Route>
                </Row>
            </Container>
        );
    }
}



