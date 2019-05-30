import React from "react";
import {withRouter} from "react-router-dom";
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import config from '../../config.json';
import {userService} from "../../_services/user.service";
import axios from "axios";


const AuthButton = withRouter(({ history }) => (
    localStorage.getItem('user') ? (
            <GoogleLogout
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess = { () => {
                    userService.logout();
                    history.push('/login');
                }}
            />
    ) : (
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={ (response) => {
                axios.get("https://calm-scrubland-98205.herokuapp.com/users.json?token=" + response.googleId).then(res => {
                    if(res.data.length !== 0){
                        localStorage.setItem('user', response.googleId);
                        localStorage.setItem('foto', response.profileObj.imageUrl);
                        localStorage.setItem('name', response.profileObj.name);
                        history.push('/');
                    }
                })
            }}
            cookiePolicy={'single_host_origin'}
        />
    )
));

export default AuthButton;

/*

 */