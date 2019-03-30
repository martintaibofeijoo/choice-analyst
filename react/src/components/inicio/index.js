import React, {PureComponent as Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {
    Button,
    Col,
    Row,
} from 'reactstrap';

import choiceanalyst_inicio from '../imagenes/choiceanalyst_inicio.png'
import Image from 'react-bootstrap/Image'
import {Authentication} from "../authentication";
import VistaIniciarSesion from "../iniciarSesion";
import VistaRegistro from "../registro";


export class Inicio extends Component {
    constructor() {
        super();
        this.state = {
            iniciarSesion: false,
            registrarse: false
        };
    }

    onCerrarVistaIniciarSesion = () => {
        this.setState({
            iniciarSesion: false
        });
    }
    onCerrarVistaRegistro = () => {
        this.setState({
            registrarse: false
        });
    }

    render() {
        return <Authentication>
            {auth => {
                if (auth.authenticated)
                    return <Redirect to="/experimentos"/>;
                else
                    return <article>
                        <Row>
                            <Col sm>
                                <Image className="imagenInicio" src={choiceanalyst_inicio}/>
                            </Col>
                        </Row>
                        <Row>
                            <h2 style={{textAlign: 'center', marginTop: '50px'}}>Somos una plataforma mediante la cúal
                                podrás crear experimentos asociados a tu establecimiento para analizar los platos y
                                menús elegidos por tus clientes en función de sus respuestas </h2>
                        </Row>
                        <Row style={{marginTop: '50px'}}>
                            <Col>
                                <Button block size={"lg"}
                                        color={"primary"}
                                        onClick={() => this.setState({
                                            iniciarSesion: true
                                        })}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Col>
                            <Col>
                                <Button block size={"lg"}
                                        color={"primary"}
                                        onClick={() => this.setState({
                                            registrarse: true
                                        })}
                                >
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm={{size: 6, offset: 3}}>
                                <VistaIniciarSesion
                                    onLogin={auth.login}
                                    show={this.state.iniciarSesion}
                                    onHide={this.onCerrarVistaIniciarSesion}
                                    error={auth.error}
                                />
                            </Col>
                            <Col>
                                <VistaRegistro
                                    login={auth.login}
                                    show={this.state.registrarse}
                                    onHide={this.onCerrarVistaRegistro}
                                />
                            </Col>
                        </Row>

                    </article>
            }}
        </Authentication>
    }
}

