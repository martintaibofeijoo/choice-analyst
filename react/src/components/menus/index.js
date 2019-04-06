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
import {Authentication} from "../authentication";
import Modal from "../iniciarSesion";


export class Menus extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaMenus auth={auth}/>
            }
        </Authentication>
    }
}

class VistaMenus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            experimentos: []
        }
    }

    render() {
        return <h1>hola</h1>
    }
}
