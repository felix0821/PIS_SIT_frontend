import { combineDataProviders, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { useHeaderWithToken } from '../custom-hooks';
import { Enviroment } from '../enviroment';

const apiUrl = Enviroment.URL_BASE;
const httpClient = fetchUtils.fetchJson;

export const personDataProvider = {
    
    verifyEmail: (resource: string, email: any) => {
        resource = Enviroment.USER_VERIFY_EMAIL

        const url = `${apiUrl}/${resource}?username=${email}`;

        const { headers } = useHeaderWithToken()

        return httpClient(url,{headers: headers}).then(({ json }) => {
            return {
                data: json,
            }
        });
    },

    registerUserWithRole: (resource: string, data: any) => {

        let values = data

        interface InterfaceUserRole {
            personId: string;
            roleId: string
        }
        
        const { headers } = useHeaderWithToken()
    
        return httpClient(`${apiUrl}/${Enviroment.USER_REGISTER}`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: headers
        })
            .then(valor => {
                let val = valor.body
                let uno = val.indexOf(":")
                let val1 = val.substring(uno + 2, val.length - 2)
                let objeto: InterfaceUserRole = {
                    personId: val1,
                    roleId: values['rol']
                }
                return objeto
            })
            .then(valor => httpClient(`${apiUrl}/${Enviroment.USER_REGISTER_ROL}`, {
                method: 'POST',
                body: JSON.stringify(valor),
                headers: headers
            })).then( res => (
                {
                    data: [true]
                }
            )).catch(error => (
                {
                    data: [false]
                }
            ))
    },

    getList: (resource: string, params: any) => {

        resource = Enviroment.USERS

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()

        return httpClient(url,{headers: headers}).then(({ json }) => {

            if (resource == "transport-company/dropdown") {
                for (let i = 0; i < json.length; ++i) {
                    json[i].id = json[i].value
                }
            }

            return {
                data: json,
                total: json.length
            }
        });


    },

    getOne: (resource: string, params: any) => {
        if (resource == "users") resource = "person/update";

        const url = `${apiUrl}/${resource}?id=${params.id}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json }) => ({
            data: json,
        }))
    },

    getMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl} / ${resource} ? ${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl} / ${resource} ? ${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/')?.pop()!!, 10),
        }));
    },

    create: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },

    update: (resource: string, params: any) => {

        if (resource == "users") resource = Enviroment.USER_UPDATE;

        const { headers } = useHeaderWithToken()

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: headers
        }).then(({ json }) => ({ data: json }))
    },



    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl} / ${resource} ? ${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource: string, params: any) => {


        if (resource == "users") resource = Enviroment.USER_DELETE;

        const { headers } = useHeaderWithToken()

        return httpClient(`${apiUrl}/${resource}?id=${params.id}`, {
            method: 'DELETE',
            headers: headers
        }).then(({ json }) => ({ data: json }))
    },

    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl} / ${resource} ? ${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};