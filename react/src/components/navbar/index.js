import React, {PureComponent as Component} from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

import {Link} from 'react-router-dom'
import {AuthenticatedOnly, UnauthenticatedOnly} from "../authentication";
import choiceanalyst_navbar from "../imagenes/choiceanalyst_navbar.png";
import {Image} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";


export default class NavigationBar extends Component {

    render() {
        return <Navbar sticky="top" expand dark color="primary">
            <AuthenticatedOnly>
                <NavbarBrand style={{marginLeft:'20px'}} tag={Link} to="/">
                    <Image src={choiceanalyst_navbar}/>
                </NavbarBrand>
            </AuthenticatedOnly>
            <UnauthenticatedOnly>
                <NavbarBrand style={{marginLeft:'20px'}} tag={Link} to="/inicio">
                    <Image src={choiceanalyst_navbar}/>
                </NavbarBrand>
            </UnauthenticatedOnly>
            <Nav className="ml-auto" navbar>
                <AuthenticatedOnly>
                    <NavItem>
                        <NavLink tag={Link} to="/crearExperimento">Crear Experimento</NavLink>
                    </NavItem>
                </AuthenticatedOnly>
                <AuthenticatedOnly>
                    <NavItem>
                        <NavLink tag={Link} to="/establecimientos">Establecimientos</NavLink>
                    </NavItem>
                </AuthenticatedOnly>
                <AuthenticatedOnly>
                    <NavDropdown title="Mi Perfil" id={"item"} style={{marginRight:'50px'}}>
                        <NavDropdown.Item href="/verPerfil">Ver Perfil</NavDropdown.Item>
                        <NavDropdown.Divider style={{borderColor: 'black', borderRadius: '4px'}}/>
                        <NavDropdown.Item href="/logout">Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                </AuthenticatedOnly>
            </Nav>
        </Navbar>
    }
}
