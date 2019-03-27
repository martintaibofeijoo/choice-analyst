import React, { Component } from 'react'
import NavigationBar from "../navbar"
import { Container } from "reactstrap"
import Register from "../register"
import Login, {Inicio} from "../inicio"
import Logout from "../logout"
import { Switch, Route, Redirect } from "react-router-dom"
import {NuevoMenu} from "../nuevomenu";



export default class Layout extends Component {
    render(){
        return <>
            <NavigationBar/>
            <Container className = "pt-3" tag = "main">
                <Switch>
                    <Route path = "/inicio" component = { Inicio } />
                    <Route path = "/register" component = { Register } />
                    <Route path = "/logout" component = { Logout } />
                    <Route path = "/menu" component = { NuevoMenu } />

                    <Redirect from = "/" to = "/prueba"/>
                </Switch>
            </Container>
        </>
    }
}