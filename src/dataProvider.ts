import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://sit-backend.herokuapp.com';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };

        if (resource == "users") resource = "person"
        if (resource == "reviews") resource = "service-rating"
        const url = `${apiUrl}/${resource}`;


        //read and send token
        let token = localStorage.getItem('token');
        if (!token) token = ""

        let options: fetchUtils.Options = {}
        const headers = options?.headers ? new Headers(options.headers) : new Headers();
        headers.set("Authorization", `Bearer ${token}`);
        options.headers = headers
        //END read and send token


        return httpClient(url, options).then(({ json }) => {

            if(resource == "transport-company/dropdown"){
                for(let i=0;i<json.length;++i){
                    json[i].id = json[i].value
                }
            }

            return {
                data: json,
                //total: parseInt(headers.get('content-range')?.split('/')?.pop()!!, 10),
                //total: parseInt(headers.get('content-range')!!, 10),
                total: json.length
            }
        });


    },

    getOne: (resource: string, params: any) => {
        if (resource == "users") resource = "person/update";

        const url = `${ apiUrl }/${ resource }?id=${ params.id }`;

        //read and send token
        let token = localStorage.getItem('token');
        if (!token) token = ""

        let options: fetchUtils.Options = {}
        const headers = options?.headers ? new Headers(options.headers) : new Headers();
        headers.set("Authorization", `Bearer ${token}`);
        options.headers = headers
        //END read and send token


        return httpClient(url, options).then(({ json }) => ({
            data: json,
        }))
    },

    getMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${ apiUrl } / ${ resource } ? ${ stringify(query) }`;
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
        const url = `${ apiUrl } / ${ resource } ? ${ stringify(query) }`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/')?.pop()!!, 10),
        }));
    },

    create: (resource: string, params: any) => {

        if (resource == "users") resource = "person/register";
        console.log(params.data);

        //read and send token
        let token = localStorage.getItem('token');
        if (!token) token = ""

        let options: fetchUtils.Options = {}
        const headers = options?.headers ? new Headers(options.headers) : new Headers();
        headers.set("Authorization", `Bearer ${token}`);
        //END read and send token



        return httpClient(`${ apiUrl }/${ resource }`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: headers
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

    update: (resource: string, params: any) => {

        if (resource == "users") resource = "person/update";

         //read and send token
         let token = localStorage.getItem('token');
         if (!token) token = ""
 
         let options: fetchUtils.Options = {}
         const headers = options?.headers ? new Headers(options.headers) : new Headers();
         headers.set("Authorization", `Bearer ${token}`);
         options.headers = headers
         //END read and send token

        return httpClient(`${ apiUrl }/${ resource }`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: headers
        }).then(({ json }) => ({ data: json }))        
    },



    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${ apiUrl } / ${ resource } ? ${ stringify(query) }`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource: string, params: any) => {


        if (resource == "users") resource = "person/delete";

        //read and send token
        let token = localStorage.getItem('token');
        if (!token) token = ""

        let options: fetchUtils.Options = {}
        const headers = options?.headers ? new Headers(options.headers) : new Headers();
        headers.set("Authorization", `Bearer ${token}`);
        //END read and send token



        return httpClient(`${ apiUrl }/${ resource }?id=${ params.id }`, {
            method: 'DELETE',
            headers: headers
        }).then(({ json }) => ({ data: json }))
    },

    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${ apiUrl } / ${ resource } ? ${ stringify(query) }`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};