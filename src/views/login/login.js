import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import config from '../../config.json';
import axios from 'axios'
import {userService} from "../../_services/user.service";
import {Redirect} from "react-router-dom";

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
        console.log('esto: ' + JSON.stringify(response.profileObj));
        axios.get("https://calm-scrubland-98205.herokuapp.com/users.json?token=" + response.googleId).then(res => {
            if(res.data.length !== 0){
                this.setState({
                    logged: "true",
                    imagen: response.profileObj.foto,
                    name: response.profileObj.name,
                    token: response.googleId,
                    email: response.profileObj.email,
                });
                localStorage.setItem('user', response.googleId);
                localStorage.setItem('foto', response.profileObj.imageUrl);
                localStorage.setItem('name', response.profileObj.name);
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
            <div>Logueate para ver el contenido!</div>
            )
        }
        else{
            return(
                <Redirect to={'/'}/>
            )
        }
    }
}

export default Login;
