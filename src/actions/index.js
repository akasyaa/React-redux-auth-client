import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

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

export function signOutUser() {
    // Remove JWT Token
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
