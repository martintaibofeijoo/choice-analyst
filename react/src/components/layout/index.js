import React, {Component} from 'react'
import NavigationBar from "../navbar"
import {Col, Container} from "reactstrap"
import {Inicio} from "../inicio"
import Logout from "../logout"
import {Switch, Route, Redirect} from "react-router-dom"
import {Menus} from "../menus";
import {Experimentos} from "../experimentos";
import {CrearExperimento} from "../crearexperimento";
import VerPerfil from "../verPerfil";

export default class Layout extends Component {
    render() {
        return <>
            <NavigationBar/>
            <Container className="pt-3" tag="main">
                <Switch>
                    <Route path="/experimentos" component={Experimentos}/>
                    <Route path="/inicio" component={Inicio}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/verPerfil" component={VerPerfil}/>
                    <Route path="/menus" component={Menus}/>
                    <Route path="/crearExperimento" component={CrearExperimento}/>

                    <Redirect from="/" to="/inicio"/>
                </Switch>
            </Container>
        </>
    }
}