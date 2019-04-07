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
import {Calendar} from "react-calendar";
import {Authentication} from "../authentication";
import moment from "moment";


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
            experimentos: [],
            fechaSeleccionada: new Date()
        }
    }

    onCambiarFechaSeleccionada = fechaSeleccionada => {

        console.table(moment(fechaSeleccionada).format('DD/MM/YYYY'))
        this.setState({fechaSeleccionada: fechaSeleccionada})
    }

    render() {
        return <div>
            {console.log(this.state.fechaSeleccionada)}
            <h1>hola</h1>
            <Calendar
                onChange={this.onCambiarFechaSeleccionada}
                value={this.state.fechaSeleccionada}
            />
        </div>

    }
}




