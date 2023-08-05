import axios, { type AxiosInstance } from 'axios'
import qs from 'qs'

// console.log(qs.stringify({
//     populate: {
//         users_permissions_user: {
//             populate: ['avatar']
//         }
//     }
// }, { encodeValuesOnly: true }));
// populate[users_permissions_user][populate][0]=avatar

class ApiFactory {
    protected http: AxiosInstance;
    protected baseurl: string;
    private api: string;

    constructor(api: string, baseurl = import.meta.env.VITE_API_BASE_URL) {

        this.baseurl = baseurl;
        this.api = api;
        this.baseurl += api;

        this.http = axios.create({
            baseURL: this.baseurl,
            params: (param: any) => {
                return qs.stringify(param, { encodeValuesOnly: true })
            }
        })

        this.http.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
        this.http.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

    }

}


export default ApiFactory;