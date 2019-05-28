//import {userService} from "./user.service";
import { authHeader } from '../_helpers/auth-header';
import axios from "axios";


const URI = 'https://calm-scrubland-98205.herokuapp.com/';

const requestOptions = {
    headers: authHeader()
};

export const issueService = {
    getAll,
    getByID,
    post,
    update,
    updateStatus,
    destroy,
    vote,
    unvote,
    watch,
    unwatch
};

// POST issues/:id/vote
function vote(id) {
    return axios.post(URI + '/issues/' + id + '/vote', {}, requestOptions)
        .then(handleResponse);
}

// POST issues/:id/unvote
function unvote(id) {
    return axios.post(URI + '/issues/' + id + '/unvote', {}, requestOptions)
        .then(handleResponse);
}

// POST /issues/:id/watch
function watch(id) {
    return axios.post(URI + '/issues/' + id + '/watch', {}, requestOptions)
        .then(handleResponse);
}

// POST /issues/:id/watch
function unwatch(id) {
    return axios.post(URI + '/issues/' + id + '/unwatch', {}, requestOptions)
        .then(handleResponse);
}


function getAll() {
    return axios.get(URI + '/issues',requestOptions)
        .then(handleResponse);
};

function getByID(id){
    return axios.get(URI + '/issues/' + id, requestOptions)
        .then(handleResponse);
}

function post(title, desc, type, priority, assignee) {
    return axios.post(URI + "/issues", {
        "text": title,
        "details": desc,
        "type": type,
        "Priority": priority,
        "Assignee": assignee}, requestOptions).then(handleResponse);
}

function update(id, title, desc, type, priority, assignee, status){
    console.log(id + ' ' + title + ' ' + desc + ' ' + type + ' ' + priority + ' ' + assignee);
    return axios.put(URI + "/issues/" + id, {
        "title": title,
        "details": desc,
        "type": type,
        "Priority": priority,
        "Assignee": 0,
        "Status": status,
    }, requestOptions).then(handleResponse);
}


function updateStatus(id,newStatus){
    return axios.put(URI + "/issues/" + id + "/status", {
        "status": newStatus,
        }, requestOptions).then(handleResponse);
}

function destroy(id){
    return axios.delete(URI + "/issues/" + id, requestOptions)
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
