import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import config from '../../config.json';
import axios from 'axios'
import {userService} from "../../_services/user.service";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: localStorage.getItem('user') ? "true" : "false",
            imagen: "",
            token: "",
            email : "",
            name: ""
        };
    }

    logout = () => {
        this.setState({logged: "false",
            imagen: "",
            token: "",
            email : "",
            name: ""});
        userService.logout();
        this.props.history.push("/login");
    };

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        axios.get("https://calm-scrubland-98205.herokuapp.com/users.json?token=" + response.googleId).then(res => {
            if(res.data.length !== 0){
                this.setState({
                    logged: "true",
                    imagen: response.profileObj.foto,
                    name: response.profileObj.name,
                    token: response.googleId,
                    email: response.profileObj.email,
                });
                localStorage.setItem('user', JSON.stringify(response.googleId));
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
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
                onFailure={this.onFailure}
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
                />
            )
        }
    }
}


export default Login;
