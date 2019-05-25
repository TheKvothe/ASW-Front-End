import { authHeader } from '../_helpers/auth-header';
import axios from "axios";


const URI = 'https://calm-scrubland-98205.herokuapp.com/';

const requestOptions = {
    headers: authHeader()
};

export const userService = {
    getAll,
    getByID
};


function getAll() {
    return axios.get(URI + '/users',requestOptions)
        .then(handleResponse);
};

function getByID(id){
    return axios.get(URI + '/users/' + id, requestOptions)
        .then(handleResponse);
}



function handleResponse(response) {
    const data = response.data;
    if (!(response.status===200 || response.status===201)) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            /*userService.logout();
            window.location.reload(true);*/
        }
        //ToDo data.message es indefinido (borrar?)
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}