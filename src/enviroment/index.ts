export const Enviroment = {
    /**
     * Url de api
     */
    //URL_BASE: 'https://sit-backend.herokuapp.com',

    URL_BASE: 'http://47.242.179.181:8080/controller',

    /**
     * Url de api
     */
    //URL_LOGIN: 'https://sit-backend.herokuapp.com/auth/login',
    URL_LOGIN: 'http://47.242.179.181:8080/controller/auth/login',


    USERS: 'person',
    USER_REGISTER: 'person/register-web',
    USER_REGISTER_ROL: 'person/role/register',
    USER_DELETE: 'person/delete',
    USER_UPDATE: 'person/update',
    USER_VERIFY_EMAIL: 'person/query/verify-email/',
    USER_VERIFY_DOCUMENT: 'person/query/verify-identification/',

    REVIEWS: 'service-rating',

    ROUTES_FROM_COMPANY: 'route/dropdown',
    ROUTE_USER_REGISTER: 'route/operator/register',
    ROUTES: 'route',
    OPERATOR: 'operator',

};