import { combineDataProviders, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { useHeaderWithToken } from '../custom-hooks';
import { Enviroment } from '../enviroment';

const apiUrl =  Enviroment.URL_BASE;;
const httpClient = fetchUtils.fetchJson;



export const documentDataProvider =  {
    getAll: (resource: string) => {
        resource = "identification-document/dropdown"

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });
    },
    getList: (resource: string, params: any) => {
        
        return httpClient('').then(({ json }) => {

            return {
                data: json,
                total: json.length
            }
        });
    },

    getOne: (resource: string, params: any) => {
        return httpClient('').then(({ json }) => ({
            data: json,
        }))
    },

    getMany: (resource: string, params: any) => {
        return httpClient('').then(({ json }) => ({ data: json }));
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