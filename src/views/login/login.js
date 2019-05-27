import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from '../../config.json';
import axios from 'axios'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: "false",
            imagen: "",
            token: "",
            email : "",
            name: ""
        };
    }

    logout = () => {
        this.setState({logged: "",
            imagen: "",
            token: "",
            email : "",
            name: ""})
    };

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        axios.get("https://calm-scrubland-98205.herokuapp.com/users.json?token=" + response.googleId).then(res => {
            console.log(res)
            if(res.data.length !== 0){
                this.setState({imagen: response.profileObj.foto,
                                    name: response.profileObj.name,
                                    token: response.googleId,
                                    email: response.profileObj.email,
                                    logged: "true"

                                })
            }
        })
    };

    render() {
        return(
            <div>{this.conditionalLogin(this.state.logged)} </div>
        )
    }

    conditionalLogin = (boolean) => {
        if(boolean === "false"){
            return(
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.googleResponse}
                cookiePolicy={'single_host_origin'}
            />
            )
        }
        else{
            return(
                <GoogleLogout
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess = {this.logout}
                ></GoogleLogout>
            )
        }
    }
}

export default Login;
