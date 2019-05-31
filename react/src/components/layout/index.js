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
import {CrearMenu} from "../crearmenu";
import {VerExperimento} from "../verexperimento";
import {ModificarExperimento} from "../modificarexperimento";
import {Establecimientos} from "../establecimientos";
import {VerMenu} from "../vermenu";
import {ModificarMenu} from "../modificarmenu";
import {VerResultadosExperimento} from "../verResultadosExperimento";

export default class Layout extends Component {
    render() {
        return <>
            <NavigationBar/>
            <Container className="pt-3" tag="main">
                <Switch>
                    <Route path="/establecimientos/:idEstablecimiento/menus/modificarMenu/:idMenu" component={ModificarMenu}/>
                    <Route path="/establecimientos/:idEstablecimiento/menus/verMenu/:idMenu" component={VerMenu}/>
                    <Route path="/establecimientos/:idEstablecimiento/menus/crearMenu" component={CrearMenu}/>
                    <Route path="/establecimientos/:idEstablecimiento/menus" component={Menus}/>
                    <Route path="/establecimientos" component={Establecimientos}/>
                    <Route path="/experimentos/verExperimento/:idExperimento" component={VerExperimento}/>
                    <Route path="/experimentos/verResultadosExperimento/:idExperimento" component={VerResultadosExperimento}/>
                    <Route path="/experimentos/modificarExperimento/:idExperimento" component={ModificarExperimento}/>
                    <Route path="/experimentos" component={Experimentos}/>
                    <Route path="/inicio" component={Inicio}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/verPerfil" component={VerPerfil}/>

                    <Route path="/crearExperimento" component={CrearExperimento}/>


                    <Redirect from="/" to="/inicio"/>
                </Switch>
            </Container>
        </>
    }
}