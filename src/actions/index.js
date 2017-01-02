import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, RESET_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
        // If good
            // Update state to authenticated
            dispatch({ type: AUTH_USER });
            // Save JWT token
            localStorage.setItem('token', response.data.token);
            // Redirect user to /feature
            browserHistory.push('/feature');
        })
        .catch(() => {
            // If bad, error
            dispatch(authError('Bad Login Information'));
        });
    }
}

export function signUpUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })
        .catch(error => {
            dispatch(authError(error.response.data.error));
        });
    }
}

export function signOutUser() {
    // Remove JWT Token
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
        });
    }
}

export function resetError() {
    return { type: RESET_ERROR };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
