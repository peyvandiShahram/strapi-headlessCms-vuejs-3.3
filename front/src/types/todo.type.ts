
export type TodoItemAttribute = {
    title: string,
    description: string,
    periority: TodoPeriority,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
}

export type TodoPeriority = "low" | "normal" | "extrem"

export type TodoItem = {
    attributes: TodoItemAttribute,
    id: number

}

export type TodoList<T> = {
    data: T,
    meta: any
}

export type TodoResponseList = TodoList<TodoItem[]>
export type TodoResponseItem = TodoList<TodoItem>

