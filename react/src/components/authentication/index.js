import React, {Component} from "react"
import PropTypes from 'prop-types'

const AuthContext = React.createContext()


export class AuthenticatedApp extends Component {
    constructor(props) {
        super(props)
        if(sessionStorage.getItem("authState")) {
            const stored = JSON.parse(sessionStorage.getItem("authState"))
            this.state = {
                ...stored,
                updateLogin: setInterval(this.login, 60*60*1000, stored.user.username, stored.user.password)
            }
        } else
            this.state = {
                authenticated: false,
                user: {},
                error: {},
                updateLogin: ''
            }
    }

    login = (user, pass) => {
        console.log("Login")
        fetch("http://localhost:9000/login", {method: 'POST', body: JSON.stringify({username: user, password: pass})})
            .then(response => {
                const codigo = response.status;

                if (codigo === 200) {
                    const token = response.headers.get("Authorization");
                    const decodeToken = JSON.parse(atob(token.split('.')[1]));
                    this.setState(prev => ({
                            ...prev,
                            authenticated: true,
                            user: {username: user, rol: decodeToken.rol, password: pass},
                            token: token,
                            error: {}
                        }),
                        () => {
                            if(this.state.updateLogin === ''){
                                const updateLogin = setInterval(this.login, 5*1000, this.state.user.username, this.state.user.password)
                                this.setState(prev => ({...prev, updateLogin}))
                            }
                            sessionStorage.setItem("authState", JSON.stringify(this.state))
                        }
                    )
                } else
                    this.setState(prev => ({
                        ...prev,
                        error: {code: "INVALID_LOGIN", message: "Usuario o Contraseña Invalido!"}
                    }))
            })
    }

    logout = () => {
        console.log(this.state)
        clearInterval(this.state.updateLogin)
        this.setState(prev => ({...prev, authenticated: false, user: {}, updateLogin: ''}), () => {
            sessionStorage.removeItem("authState")
        })
    }

    render() {
        const auth = {
            authenticated: this.state.authenticated,
            user: this.state.user,
            token: this.state.token,
            error: this.state.error,
            login: this.login,
            logout: this.logout
        }

        console.log(this.state.token)

        return <AuthContext.Provider value={auth}>
            {this.props.children}
        </AuthContext.Provider>
    }
}

export const Authentication = AuthContext.Consumer

export class AuthenticatedOnly extends Component {
    static propTypes = {
        requiredRole: PropTypes.arrayOf(PropTypes.string),
        children: PropTypes.element.isRequired
    }

    static defaultProps = {
        requiredRole: null
    }

    render() {
        return <Authentication>
            {
                auth => {
                    if (auth.authenticated && (this.props.requiredRole === null || this.props.requiredRole.includes(auth.user.rol)))
                        return this.props.children
                }
            }
        </Authentication>
    }
}

export class UnauthenticatedOnly extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    render() {
        return <Authentication>
            {
                auth => {
                    if (!auth.authenticated)
                        return this.props.children
                }
            }
        </Authentication>
    }
}