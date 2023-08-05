<script setup lang="ts">
import TodosList from './components/TodosList.vue'
</script>

<template>
  <main>
    <Suspense timeout="1000">
      <TodosList />
      <template #fallback>
        <div class="fix inset-0 flex items-center justify-center h-screen">
          Loading...
        </div>
      </template>
    </Suspense>
  </main>
</template>

