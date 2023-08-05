<template>
  <div>
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="rounded bg-slate-200 flex-no-shrink w-64 p-2 mr-3">
        <div class="flex justify-between py-1">
          <h3 class="text-sm">List Name</h3>

        </div>
        <div class="text-sm mt-2">
          <TodosListItem v-for="todo, index in todos" :key="index" :todo="todo" @showMore="openModal(todo)" />
          <p class="mt-3 text-grey-dark">Add a card...</p>
        </div>
      </div>
    </div>

    <NewTodoForm v-if="open" v-model="open" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import todoRepository from '@/services/todoRepository'
import type { TodoItem } from '@/types/todo.type';
const NewTodoForm = defineAsyncComponent(() => import('@/components/NewTodoForm.vue'))
const TodosListItem = defineAsyncComponent(() => import('@/components/TodosListItem.vue'))

const todos = ref()
const todo = ref()
const open = ref(false)


const openModal: (todo: TodoItem) => void = function (_todo) {
  open.value = true
  todo.value = _todo
}

const data = await todoRepository.getTodos()
todos.value = data.data.data


</script>
