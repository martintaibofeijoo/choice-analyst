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


export class Experimentos extends Component {
    constructor() {
        super();
        this.state = {
            iniciarSesion: false,
            registrarse: false
        };
    }


    render() {
        return <Authentication>
            {
                auth => <VistaExperimentos auth={auth}/>
            }
        </Authentication>
    }
}

class VistaExperimentos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            experimentos: []
        }
    }

  /*  async componentDidMount() {
        const postRequest = await fetch(`http://localhost:9000/experimentos/${this.props.auth.user.username}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.table(postRequest)

        const postResponse = await postRequest.json()
        console.table(postResponse)
        this.setState(prev => ({
            ...prev,
            experimentos: postResponse.experimentos,
        }))
    }*/

    render() {
        return <h1>
            Experimentos
        </h1>
    }
}

