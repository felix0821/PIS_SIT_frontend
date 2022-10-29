import { combineDataProviders, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { useHeaderWithToken } from '../custom-hooks';
import { Enviroment } from '../enviroment';

const apiUrl =  Enviroment.URL_BASE;
const httpClient = fetchUtils.fetchJson;





export const routeDataProvider =  {
    searchVehicle: (resource: string, props: any) => {
        resource = "vehicle/search"

        const url = `${apiUrl}/${resource}?plate=${props.key}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json, status }) => {

            let newOBJ: any[] = []

            for(let i of json){
                newOBJ = [...newOBJ, {label: i.text, value: i.value}]
            }

            return {
                data: newOBJ,
                status: status
            }
        });
    },
    getVehicle: (resource: string, props: any) => {
        resource = "vehicle/dropdown"

        const url = `${apiUrl}/${resource}?transportCompany=${props.id}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json, status }) => {

            return {
                data: json,
                status: status
            }
        });
    },
    getTransportCompany: (resource: string) => {
        resource = "transport-company/dropdown"

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json, status }) => {

            /*for (let i = 0; i < json.length; ++i) {
                json[i].id = json[i].value
            }*/

            return {
                data: json,
                status: status
                //total: json.length
            }
        });
    },
    getConcesionary: (resource: string, props: any) => {
        resource = "concession/dropdown"

        const url = `${apiUrl}/${resource}?transportCompany=${props.id}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json, status }) => {

            return {
                data: json,
                status: status
            }
        });
    },
    registerUserInConcesionary: (resource: string, params: any) => {

        resource = 'concession/operator/register';

        const { headers } = useHeaderWithToken()

        return httpClient(`${ apiUrl }/${ resource }`, {
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
    registerUserInVehicle: (resource: string, params: any) => {

        resource = 'vehicle/driver/register';

        const { headers } = useHeaderWithToken()

        return httpClient(`${ apiUrl }/${ resource }`, {
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
    getList: (resource: string, params: any) => {
        resource = "vehicle/dropdown?transportCompany=3"

        const url = `${apiUrl}/${resource}`;

        const { headers } = useHeaderWithToken()


        return httpClient(url, {headers: headers}).then(({ json }) => {
            
            for(let i=0; i<json.length;++i){
                json[i].id = json[i].value
            }

            return {
                data: json,
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