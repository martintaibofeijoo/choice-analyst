import React, { Component } from 'react'
import NavigationBar from "../navbar"
import { Container } from "reactstrap"
import {Inicio} from "../inicio"
import Logout from "../logout"
import { Switch, Route, Redirect } from "react-router-dom"
import {NuevoMenu} from "../nuevomenu";
import {Experimentos} from "../experimentos";
import {CrearExperimento} from "../crearexperimento";



export default class Layout extends Component {
    render(){
        return <>
            <NavigationBar/>
            <Container className = "pt-3" tag = "main">
                <Switch>
                    <Route path = "/experimentos" component = { Experimentos } />
                    <Route path = "/inicio" component = { Inicio } />
                    <Route path = "/logout" component = { Logout } />
                    <Route path = "/menu" component = { NuevoMenu } />
                    <Route path = "/crearExperimento" component = { CrearExperimento } />

                    <Redirect from = "/" to = "/inicio"/>
                </Switch>
            </Container>
        </>
    }
}