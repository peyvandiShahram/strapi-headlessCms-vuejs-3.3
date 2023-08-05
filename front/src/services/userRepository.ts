import type {  AxiosResponse } from "axios";
import ApiFactory from "./ApiFactory";

type TodoResponse = {
    data: any,
    meta: any
}


class UserRepository extends ApiFactory {
    constructor() {
        super('/users/')
    }

    getUsers(): Promise<AxiosResponse<TodoResponse>>{
        return this.http.get('', {
            params: {
                populate:'*'
            }
        });
    }

    getUserById(id:number) {
        return this.http.get(`${id}`,{
            params: {
                populate:'*'
            }
        })
    }
}

const userRepository = new UserRepository
export default userRepository



