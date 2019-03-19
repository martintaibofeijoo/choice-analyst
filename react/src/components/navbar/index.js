import React, { PureComponent as Component } from 'react'
import {FiSearch as SearchIcon} from "react-icons/fi"
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from 'reactstrap'

import { Link } from 'react-router-dom'
import { AuthenticatedOnly, UnauthenticatedOnly } from "../authentication";
import choiceanalyst_navbar from "../imagenes/choiceanalyst_navbar.png";
import {Container, Image} from "react-bootstrap";


export default class NavigationBar extends Component {
    onSearchButtonClick = () => {}

    render(){
        return <Navbar sticky = "top" expand dark color = "primary">
            <NavbarBrand tag={Link} to="/">
                <Image src={choiceanalyst_navbar}  />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>

                <UnauthenticatedOnly>
                    <NavItem>
                        <NavLink tag={Link} to="/inicio">Iniciar Sesión</NavLink>
                    </NavItem>
                </UnauthenticatedOnly>
                <UnauthenticatedOnly>
                    <NavItem>
                        <NavLink tag={Link} to="/register">Register</NavLink>
                    </NavItem>
                </UnauthenticatedOnly>
                <AuthenticatedOnly>
                    <NavItem>
                        <NavLink tag={Link} to="/logout">Logout</NavLink>
                    </NavItem>
                </AuthenticatedOnly>
            </Nav>
            <Form inline>
                <FormGroup>
                    <InputGroup size = "sm">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <SearchIcon/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type = "text" placeholder="Search..." />
                        <InputGroupAddon addonType="append">
                            <Button onClick={this.onSearchButtonClick}>Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
        </Navbar>
    }
}
