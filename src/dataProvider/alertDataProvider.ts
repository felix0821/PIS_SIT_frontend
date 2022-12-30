import { combineDataProviders, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { useHeaderWithToken } from '../custom-hooks';
import { Enviroment } from '../enviroment';
import axios from 'axios';

const apiUrl = Enviroment.URL_BASE;;
const httpClient = fetchUtils.fetchJson;





export const alertDataProvider = {

    getList: (resource: string, params: any) => {

        console.log(params.meta);
        resource = "requirement-alert/list"

        const { page, perPage } = params.pagination;
        console.log(page)
        
        let url = `${apiUrl}/${resource}?page=${page}&perPage=${perPage}`;

        if(params.meta.route != ""){
            url = url+"&"+"route="+params.meta.route;
        }


        const { headers } = useHeaderWithToken()
        return httpClient(url, { headers: headers }).then(({ json }) => {

            return {
                data: json.allItems,
                total: json.elements
            }
        });
    },
    notificationsChecked: (resource: string, params: any) => {


        resource = "notification/checked"

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, { headers: headers, method: 'PATCH' }).then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });
    },

    getNotifications: (resource: string, params: any) => {


        resource = "notification"

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, { headers: headers }).then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });
    },
    getOneAlert: (resource: string, params: any) => {


        resource = "requirement-alert"

        const url = `${apiUrl}/${resource}/${params.alertId}`;

        const { headers } = useHeaderWithToken()



        return httpClient(url, { 
            headers: headers 
        }).then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });

        /*let tokenString = localStorage.getItem('auth');
        if (!tokenString) tokenString = ""
        let token = JSON.parse(tokenString);

        let options: fetchUtils.Options = {}
        headers.set("Authorization", `Bearer ${token.token}`);

        let config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }

        axios.get(url, config)
            .then(response => {
                console.log(response)
                return {
                    
                }
            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })
*/


    },

    validateAlert: (resource: string, params: any) => {


        resource = "requirement-alert"

        const url = `${apiUrl}/${resource}/${params.id}/validate`;

        const { headers } = useHeaderWithToken()


        let data = {
            gizVehicleId: params.placa,
        }

        return httpClient(url, { headers: headers, method: 'PUT',
        body: JSON.stringify(data) }).then(({ json, status }) => {

            return {
                data: {
                    status: status,
                    message: json.content
                }
            }
        });
    },

    getOne: (resource: string, params: any) => {
        resource = "requirement-alert"

        const url = `${apiUrl}/${resource}/1668089606611443`;

        const { headers } = useHeaderWithToken()



        return httpClient(url, { 
            headers: headers 
        }).then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });
    },

    getMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl} / ${resource} ? ${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource: string, params: any) => {

        return httpClient('').then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/')?.pop()!!, 10),
        }));
    },

    create: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },

    update: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },

    deleteMany: (resource: string, params: any) => {
        return httpClient(``, {
        }).then(({ json }) => ({ data: json }));
    },
};