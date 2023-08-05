<template>
  <div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
  @click="$emit('showMore',todo)">
    {{ todo.attributes.title }}
    <div class="text-grey-darker mt-2 ml-2 flex justify-between items-start">
      <span class="text-xs flex items-center">
        <svg class="h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path
            d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z">
          </path>
        </svg>
        3/5
      </span>
      <img :src="avatar" class="rounded-full w-10">
    </div>
  </div>
</template>

<script setup lang="ts">
import userRepository from '@/services/userRepository';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  todo: any
}>()

const emit = defineEmits<{
  showMore:[todo:any]
}>()


type TodoAuthor = {
  id: 1,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: Date,
  updatedAt: Date,
  avatar: Avatar,
  todos: any,
}

type Avatar = {
  id: 2,
  name: string,
  alternativeText?: string,
  caption?: string,
  width: number,
  height: number,
  formats: Formats,
  hash: string,
  ext: string,
  mime: "image/jpeg",
  size: number,
  url: string,
  previewUrl?: string,
  provider: string,
  provider_metadata?: string,
  createdAt: Date,
  updatedAt: Date
}

type ImageFormat = {
  name: string,
  hash: string,
  ext: string,
  mime: "image/jpeg",
  path?: string,
  width: number,
  height: number,
  size: number,
  url: string
}

type Formats = {
  thumbnail: ImageFormat,
  large: ImageFormat,
  medium: ImageFormat,
  small: ImageFormat,

}

const todoAuthor = ref<TodoAuthor>()


// const data = await userRepository.getUserById(props.todo.attributes.users_permissions_user.data.id);
// todoAuthor.value = data.data;


const avatar = computed(() => {
  if (todoAuthor.value)
    return new URL(todoAuthor.value.avatar.formats.thumbnail.url, import.meta.env.VITE_API_BASE_URL)
})


</script>
