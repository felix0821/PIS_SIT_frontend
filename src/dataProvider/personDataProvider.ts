import { combineDataProviders, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { useHeaderWithToken } from '../custom-hooks';
import { Enviroment } from '../enviroment';
import { JavascriptOutlined } from '@mui/icons-material';

const apiUrl = Enviroment.URL_BASE;
const httpClient = fetchUtils.fetchJson;

export const personDataProvider = {

    verifyEmail: (resource: string, email: any) => {
        resource = Enviroment.USER_VERIFY_EMAIL

        const url = `${apiUrl}/${resource}?username=${email}`;

        const { headers } = useHeaderWithToken()

        return httpClient(url, { headers: headers }).then(({ json, status }) => {
            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        });
    },
    verifyDocument: (resource: string, props: any) => {

        let documentId = props.documentId
        let value = props.value
        resource = Enviroment.USER_VERIFY_DOCUMENT

        const url = `${apiUrl}/${resource}?document=${documentId}&value=${value}`;
        console.log(url)

        const { headers } = useHeaderWithToken()

        return httpClient(url, { headers: headers }).then(({ json, status }) => {
            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        });
    },
    registerUser: (resource: string, params: any) => {

        resource = Enviroment.USER_REGISTER;

        const { headers } = useHeaderWithToken()

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: headers
        }).then(({ json, status }) => {
            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        });
    },

    registerUserInRole: (resource: string, params: any) => {

        interface InterfaceUserRole {
            personId: string;
            roleId: string
        }

        let data: InterfaceUserRole = {
            personId: params.data.userId,
            roleId: params.data.roleId
        }

        const { headers } = useHeaderWithToken()

        let url = `${apiUrl}/person/${data.personId}/role/${data.roleId}/register`

        return httpClient(url, {
            method: 'POST',
            //body: JSON.stringify(data),
            headers: headers
        }).then(({ json, status }) => {

            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        })
    },
    removeRoleFromUser: (resource: string, params: any) => {

        interface InterfaceUserRole {
            personId: string;
            roleId: string
        }

        let data: InterfaceUserRole = {
            personId: params.data.userId,
            roleId: params.data.roleId
        }

        const { headers } = useHeaderWithToken()

        let url = `${apiUrl}/person/${data.personId}/role/${data.roleId}/remove`

        return httpClient(url, {
            method: 'POST',
            //body: JSON.stringify(data),
            headers: headers
        }).then(({ json, status }) => {

            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        })
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

        const url = `${apiUrl}/${resource}?page=${page}&perPage=${perPage}`;

        const { headers } = useHeaderWithToken()

        return httpClient(url, { headers: headers }).then(({ json }) => {

            /*if (resource == "transport-company/dropdown") {
                for (let i = 0; i < json.length; ++i) {
                    json[i].id = json[i].value
                }
            }*/

            return {
                data: json.allItems,
                total: json.elements
            }
        });


    },

    getOne: (resource: string, params: any) => {
        if (resource == "users") resource = "person/update";

        const url = `${apiUrl}/${resource}?id=${params.id}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, { headers: headers }).then(({ json }) => ({
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

        //Dont use this method

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            //sheaders: headers
        }).then(({ json, status }) => {
            return {
                data: {
                }
            }
        });
    },

    update: (resource: string, params: any) => {

        if (resource == "users") resource = Enviroment.USER_UPDATE;

        const { headers } = useHeaderWithToken()

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: headers
        }).then(({ json }) => {
            json.id = 0
            return { data: json }
        })
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