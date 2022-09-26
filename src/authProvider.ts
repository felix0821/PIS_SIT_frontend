import { AuthProvider } from 'react-admin';
import axios from 'axios';
import userdefault from '../assets/user-default.png'

const authProvider: AuthProvider = {
    login: ({ username, password }) => {  
        //console.log(username, password)       
        return axios.post('https://sit-backend.herokuapp.com/auth/login', {
            username, password
        }).then((token)=> {
            console.log(token);
            localStorage.setItem('token', token.data.token);
            localStorage.setItem('username', username);
            return token.data
        })

    },
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: localStorage.getItem('username') || 'name',
            avatar:
                'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg',
        }),
};

export default authProvider;
