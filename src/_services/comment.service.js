import { authHeader } from '../_helpers/auth-header';
import axios from "axios";


const URI = 'https://calm-scrubland-98205.herokuapp.com/';

const requestOptions = {
    headers: authHeader()
};

export const commentService = {
    getAll,
    getByID,
    getIssueComments,
    destroy,
    update,
    post,
};


function getAll() {
    return axios.get(URI + '/comments',requestOptions)
        .then(handleResponse);
};

function getByID(id){
    return axios.get(URI + '/comments/' + id, requestOptions)
        .then(handleResponse);
}

function getIssueComments(issue_id){
    return axios.get(URI + '/issues/' + issue_id + '/comments', requestOptions)
        .then(handleResponse);
}

function destroy(id){
    return axios.delete(URI + "/comments/" + id, requestOptions)
        .then(handleResponse);
}

function update(id, text){
    return axios.put(URI + "/comments/" + id, {
        "text": text,
    }, requestOptions).then(handleResponse);
}

function post(issue_id, comment_text) {
    return axios.post(URI + "/issues/" + issue_id + '/comments', {
        "text": comment_text}, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    const data = response.data;
    if (!(response.status===200 || response.status===201 || response.status===204)) {
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