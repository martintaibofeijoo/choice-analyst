import React, { Component } from 'react'
import NavigationBar from "../navbar"
import { Container } from "reactstrap"
import Register from "../register"
import Login, {IniciarSesion} from "../login"
import Logout from "../logout"
import { Switch, Route, Redirect } from "react-router-dom"


export default class Layout extends Component {
    render(){
        return <>
            <NavigationBar/>
            <Container className = "pt-3" tag = "main">
                <Switch>
                    <Route path = "/inicio" component = { IniciarSesion } />
                    <Route path = "/register" component = { Register } />
                    <Route path = "/logout" component = { Logout } />

                    <Redirect from = "/" to = "/prueba"/>
                </Switch>
            </Container>
        </>
    }
}