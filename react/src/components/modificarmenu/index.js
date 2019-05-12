import React, {PureComponent as Component} from 'react'
import {
    Col,
    Row,
    CardFooter,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Input, Alert,
} from 'reactstrap';
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import {Authentication} from "../authentication";
import Container from "react-bootstrap/Container";
import MultipleDatePicker from 'react-multiple-datepicker'
import moment from "moment";
import {Redirect, Route} from "react-router-dom";


export class ModificarMenu extends Component {
    render() {
        return <Authentication>
            {
                auth => <VistaModificarMenu auth={auth} idEstablecimiento={this.props.match.params.idEstablecimiento}
                                            idMenu={this.props.match.params.idMenu}/>
            }
        </Authentication>
    }
}

class VistaModificarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                status: "",
                message: []
            },
            ok: false,
            idMenu: "",
            nombreMenu: "",
            idEstablecimiento: this.props.idEstablecimiento,
            fechasMenu: [],
            primerosPlatos: [],
            segundosPlatos: [],
            postres: [],
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
        console.table(postResponse)


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
        let formato = "T22:00:00.000Z";
        let fechas = [];
        let fechaSeparada = [];
        for (let i = 0; i < postResponse.fechasMenu.length; i++) {
            fechaSeparada = postResponse.fechasMenu[i].split("-");
            fechas[i] = fechaSeparada[2] + "-" + fechaSeparada[1] + "-" + fechaSeparada[0] + formato;
        }
        console.table(fechas)
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

    onModificarMenu = () => {
        this.doModificarMenu(this.state.nombreMenu, this.state.primerosPlatos, this.state.segundosPlatos, this.state.postres, this.state.idEstablecimiento, this.state.fechasMenu)
    }

    doModificarMenu = async (nombreMenu, primerosPlatos, segundosPlatos, postres, idEstablecimiento, fechasMenu) => {
        let ejecutar = true;
        let mensajeCampoVacio = false;
        let mensajeNoNumero = false;
        let mensajeIngredientes = false;
        let mensaje = [];

        if (nombreMenu === "") {
            ejecutar = false;
            mensajeCampoVacio = true;
        }
        if (fechasMenu.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "Un menú debe tener como mínimo una fecha asociada."];
        }
        if (primerosPlatos.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El menú debe tener como mínimo un primer plato."];
        } else {
            for (let i = 0; i < primerosPlatos.length; i++) {
                if (primerosPlatos[i].nombrePlato === "" || primerosPlatos[i].precioPlato === "") {
                    mensajeCampoVacio = true;
                }
                if (isNaN(primerosPlatos[i].precioPlato)) {
                    ejecutar = false;
                    mensajeNoNumero = false;
                }
                if (primerosPlatos[i].ingredientes.length === 0) {
                    ejecutar = false;
                    mensajeIngredientes = true;
                } else {
                    for (let j = 0; j < primerosPlatos[i].ingredientes.length; j++) {
                        if (primerosPlatos[i].ingredientes[j].textoIngrediente === "") {
                            mensajeCampoVacio = true;
                        }
                    }
                }
            }
        }
        if (segundosPlatos.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El menú debe tener como mínimo un segundo plato."];
        } else {
            for (let i = 0; i < segundosPlatos.length; i++) {
                if (segundosPlatos[i].nombrePlato === "" || segundosPlatos[i].precioPlato === "") {
                    mensajeCampoVacio = true;
                }
                if (isNaN(segundosPlatos[i].precioPlato)) {
                    ejecutar = false;
                    mensajeNoNumero = false;
                }
                if (segundosPlatos[i].ingredientes.length === 0) {
                    ejecutar = false;
                    mensajeIngredientes = true;
                } else {
                    for (let j = 0; j < segundosPlatos[i].ingredientes.length; j++) {
                        if (segundosPlatos[i].ingredientes[j].textoIngrediente === "") {
                            mensajeCampoVacio = true;
                        }
                    }
                }
            }
        }

        if (postres.length === 0) {
            ejecutar = false;
            mensaje = [...mensaje, "El menú debe tener como mínimo un postre."];
        } else {
            for (let i = 0; i < postres.length; i++) {
                if (postres[i].nombrePlato === "" || postres[i].precioPlato === "") {
                    mensajeCampoVacio = true;
                }
                if (isNaN(postres[i].precioPlato)) {
                    ejecutar = false;
                    mensajeNoNumero = false;
                }
                if (postres[i].ingredientes.length === 0) {
                    ejecutar = false;
                    mensajeIngredientes = true;
                } else {
                    for (let j = 0; j < postres[i].ingredientes.length; j++) {
                        if (postres[i].ingredientes[j].textoIngrediente === "") {
                            mensajeCampoVacio = true;
                        }
                    }
                }
            }
        }
        if (mensajeNoNumero === true) {
            ejecutar = false;
            mensaje = [...mensaje, "El precio del plato deben ser de tipo númerico.."];
        }
        if (mensajeIngredientes === true) {
            ejecutar = false;
            mensaje = [...mensaje, "Todos los platos deben tener como mínimo un ingrediente."];
        }
        if (mensajeCampoVacio === true) {
            ejecutar = false;
            mensaje = [...mensaje, "No puede haber ningún campo vacio."];
        }

        if (ejecutar === true) {
            let fechasCambiadas = []
            for (let i = 0; i < fechasMenu.length; i++) {
                fechasCambiadas[i] = moment(fechasMenu[i]).format('DD-MM-YYYY')
            }

            console.table(fechasMenu)
            debugger
            let platos = primerosPlatos.concat(segundosPlatos)
            platos = platos.concat(postres)
            let idMenu = nombreMenu.replace(/ /g, "-");
            idMenu = idMenu.toLowerCase()
            idMenu = idMenu.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const response = await fetch(`http://localhost:9000/establecimientos/${idEstablecimiento}/menus`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': this.props.auth.token
                },
                body: JSON.stringify({
                    idMenu: idMenu,
                    nombreMenu: nombreMenu,
                    fechasMenu: fechasCambiadas,
                    platos: platos
                })
            })
            const codigo = response.status

            if (codigo === 200) {
                this.setState(prev => ({
                    ...prev,
                    ok: true,
                    idMenu: idMenu
                }))
            } else if (codigo === 409) {
                mensaje = [...mensaje, "Error creando menú, no puede haber dos menús con el mismo nombre."];
                this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
            }
        } else {
            this.setState(prev => ({...prev, alert: {status: "Error", message: mensaje}}))
        }
    }

    render() {
        if (this.state.ok)
            return <Redirect to={{
                pathname: `/establecimientos/${this.props.idEstablecimiento}/menus/verMenu/${this.state.idMenu}`,
                state: {
                    message: "Menú Modificado Correctamente",
                    status: "OK"
                }
            }}/>;
        else
            return (
                <Container>
                    <h1 style={{textAlign: 'center'}}>Modificar Menú</h1>
                    <Row>
                        <Col sm={8}
                             style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '5px'}}>
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
                        </Col>
                        <Col sm={4}
                             style={{paddingTop: '0px', paddingBottom: '0px', paddingLeft: '5px', paddingRight: '0px'}}>
                            <Card block className="cards" color="primary">
                                <CardHeader style={{marginBottom: '-30px'}}>
                                    <CardTitle style={{fontSize: '20px', textAlign: 'center'}}> Fechas Menu</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Card block className="cards" color="primary">
                                        <CardBody>
                                            <div style={{marginLeft: '15px'}}>
                                                <MultipleDatePicker className={'datepicker'}
                                                                    size={'lg'}
                                                                    regional={'es'}

                                                                    onSubmit={fechasMenu => this.setState(prev => ({
                                                                        ...prev,
                                                                        fechasMenu: fechasMenu
                                                                    }))
                                                                    }
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="cards" block color="primary">
                            <CardHeader style={{marginBottom: '-30px'}}>
                                <CardTitle style={{fontSize: '20px', textAlign: 'center'}}>Primeros Platos</CardTitle>
                            </CardHeader>
                            <CardBody style={{marginBottom: '-25px'}}>
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
                            <CardBody style={{marginBottom: '-25px'}}>
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
                            <CardBody style={{marginBottom: '-25px'}}>
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
                    <Alert
                        color={this.state.alert.status === "OK" ? "success" : "danger"}
                        isOpen={this.state.alert.status !== ""}
                        toggle={() => this.setState(prev => ({...prev, alert: {status: "", message: []}}))}
                    >
                        {this.state.alert.message.map(
                            (item, index) =>
                                <p>{item}</p>
                        )}
                    </Alert>
                    <Row>
                        <Col style={{paddingLeft: '1px'}}>
                            <Route>{
                                ({history}) =>
                                    <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonPrimary"}
                                            onClick={() => history.goBack()}>Volver</Button>
                            }</Route>
                        </Col>
                        <Col style={{paddingLeft: '1px'}}>
                            <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonWarning"}
                                    onClick={this.onModificarMenu}>Modificar Menu</Button>
                        </Col>
                        <Col style={{padding: '0px'}}>
                            <Button size={"lg"} style={{marginBottom: '50px'}} block className={"botonDanger"}
                                    onClick={this.onModificarMenu}>Eliminar Menu</Button>
                        </Col>
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
                                       value={this.props.plato.nombrePlato}
                                       onChange={this.onNombrePlatoChange}/>
                            </Col>
                            <Col>
                                <Input size={"sm"} className="inputs" placeholder="Precio del Plato (€)"
                                       value={this.props.plato.precioPlato}
                                       onChange={this.onPrecioPlatoChange}/>
                            </Col>
                        </Form.Row>
                    </Form>
                    <Card className="cards" style={{marginTop: '20px', marginBottom: '-10px'}} color="primary">
                        <CardHeader style={{marginBottom: '-30px'}}>
                            <CardTitle style={{textAlign: 'center'}}>Ingredientes</CardTitle>
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