import { AuthProvider } from 'react-admin';
import axios from 'axios';
import userdefault from '../assets/user-default.png'
import { Enviroment } from './enviroment';

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(Enviroment.URL_LOGIN, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });

    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () => {

        let authString = localStorage.getItem('auth');
        if (!authString) authString = ""
        let auth = JSON.parse(authString);

        return Promise.resolve({
            id: 'user',
            fullName: auth.username || 'name',
            avatar:
                'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
        })
    },
};

export default authProvider;
