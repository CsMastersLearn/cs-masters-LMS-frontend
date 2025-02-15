<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="w-screen h-screen flex items-center justify-center">
    <section class="flex flex-col p-4 justify-center items-center">
      <h1 class="text-3xl">Welcome to our platform</h1>
      <h2 class="mb-2">Hope you are logged in</h2>
      <div class="flex gap-4">
        <Button label="Login" @click="router.push('/login')" />
        <Button label="Register" @click="router.push('/register')" />
      </div>
    </section>
  </main>
</template>
