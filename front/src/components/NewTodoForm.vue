<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Edit Task
              </DialogTitle>
              <div class="mt-2">
                <div class="w-full ">
                  <form class=" rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Title
                      </label>
                      <input
                        class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Title" :value="todo?.attributes.title">
                    </div>

                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Description
                      </label>
                      <textarea
                        class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Title">
                      {{ todo?.attributes.description }}
                      </textarea>
                    </div>
                  </form>
                </div>
              </div>

              <Combobox>
                <ComboboxInput  />
                <ComboboxOptions>
                  <ComboboxOption v-for="periority in periorities" :key="periority" :value="periority">
                    {{ periority }}
                  </ComboboxOption>
                </ComboboxOptions>
              </Combobox>
              <div class="mt-4">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal">
                  Edit Task
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'
import todoRepository from '@/services/todoRepository';
import type { TodoItem, TodoPeriority } from '@/types/todo.type';
const props = withDefaults(defineProps<{
  modelValue: boolean
  todo?: TodoItem
}>(), {
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [open: boolean]
}>()

const todoDetails = ref<TodoItem>()
const isOpen = ref(props.modelValue)

function closeModal() {
  isOpen.value = false
  emit('update:modelValue', isOpen.value)

}

const periorities: Record<string, TodoPeriority> = {
  low: "low",
  normal: "normal",
  extrem: "extrem",
}

watch(() => props.modelValue, () => {
  isOpen.value = props.modelValue
})


onMounted(async () => {
  if (props.todo) {
    const data = await todoRepository.getTodoById(props.todo?.id);
    todoDetails.value = data.data.data
  }
})

</script>
