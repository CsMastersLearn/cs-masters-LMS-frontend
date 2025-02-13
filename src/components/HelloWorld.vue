<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">{{ msg }}</h1>
  </div>
</template>
