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


export default class NavigationBar extends Component {

    render() {
        return <Navbar sticky="top" expand dark color="primary">
            <AuthenticatedOnly>
                <NavbarBrand tag={Link} to="/">
                    <Image src={choiceanalyst_navbar}/>
                </NavbarBrand>
            </AuthenticatedOnly>
            <UnauthenticatedOnly>
                <NavbarBrand tag={Link} to="/inicio">
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
                    <NavItem>
                        <NavLink tag={Link} to="/verPerfil">Ver Perfil</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/logout">Cerrar Sesión</NavLink>
                    </NavItem>
                </AuthenticatedOnly>
            </Nav>
        </Navbar>
    }
}
