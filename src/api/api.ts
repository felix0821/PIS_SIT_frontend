import { fetchUtils } from "react-admin";

const httpClient = fetchUtils.fetchJson;


export default async function getRoutes(num: string) {
        
    const url = `https://sit-backend.herokuapp.com/concession/dropdown?transportCompany=${num}`;

    //read and send token
    let token = localStorage.getItem('token');
    if (!token) token = ""

    let options: fetchUtils.Options = {}
    const headers = options?.headers ? new Headers(options.headers) : new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    options.headers = headers

    return await httpClient(url, options).then(({ json }) => {
        
        console.log(json)
        return {
            data: json,
            total: json.length
        }
    });
};

