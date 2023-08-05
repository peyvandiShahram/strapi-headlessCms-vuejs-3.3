import type { AxiosResponse } from "axios";
import ApiFactory from "./ApiFactory";
import type {TodoResponseItem,TodoResponseList} from '@/types/todo.type'


class TodoRepository extends ApiFactory {
    constructor() {
        super('/todos')
    }

    getTodos(): Promise<AxiosResponse<TodoResponseList>> {
        const params = {
            populate: {
                users_permissions_user: {
                    populate: ['avatar']
                }
            }
        }
        return this.http.get('', { params });
    }

    getTodoById(id:number): Promise<AxiosResponse<TodoResponseItem>> {
        const params = {
            'populate': {
                users_permissions_user: {
                    populate: ['avatar']
                },
                images: {
                    populate: ['file']
                }
            },
           
        }
        return this.http.get(`${id}`, { params });
    }

}

const todoRepository = new TodoRepository
export default todoRepository



