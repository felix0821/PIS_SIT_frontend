import { fetchUtils } from "react-admin";


export const useHeaderWithToken = () => {
    let tokenString = localStorage.getItem('auth');
    if (!tokenString) tokenString = ""
    let token = JSON.parse(tokenString);

    let options: fetchUtils.Options = {}
    const headers = options?.headers ? new Headers(options.headers) : new Headers();
    headers.set("Authorization", `Bearer ${token.token}`);
    return {
        headers: headers
    }
}